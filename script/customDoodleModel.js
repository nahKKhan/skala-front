(function (global) {
    "use strict";

    const script = document.currentScript;
    const modelUrl = new URL("model/skala-doodle-model.json", script.src).href;

    function softmax(values) {
        const max = Math.max(...values);
        const exps = values.map((v) => Math.exp(v - max));
        const sum = exps.reduce((a, b) => a + b, 0);
        return exps.map((v) => v / sum);
    }

    function preprocess(source, gridSize) {
        const input = document.createElement("canvas");
        input.width = source.width; input.height = source.height;
        const ctx = input.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(source, 0, 0);
        const pixels = ctx.getImageData(0, 0, input.width, input.height).data;
        let left=input.width, top=input.height, right=-1, bottom=-1;
        for (let y=0;y<input.height;y++) for (let x=0;x<input.width;x++) {
            const i=(y*input.width+x)*4;
            const ink=1-(pixels[i]+pixels[i+1]+pixels[i+2])/765;
            if (ink>.12) { left=Math.min(left,x); right=Math.max(right,x); top=Math.min(top,y); bottom=Math.max(bottom,y); }
        }
        if (right<left) return new Array(gridSize*gridSize).fill(0);
        const pad=Math.max(4,Math.round(Math.max(right-left,bottom-top)*.08));
        left=Math.max(0,left-pad); top=Math.max(0,top-pad); right=Math.min(input.width-1,right+pad); bottom=Math.min(input.height-1,bottom+pad);
        const side=Math.max(right-left+1,bottom-top+1);
        const normalized=document.createElement("canvas"); normalized.width=gridSize; normalized.height=gridSize;
        const nctx=normalized.getContext("2d",{willReadFrequently:true}); nctx.fillStyle="#fff"; nctx.fillRect(0,0,gridSize,gridSize);
        const scale=gridSize/side, dw=(right-left+1)*scale, dh=(bottom-top+1)*scale;
        nctx.drawImage(input,left,top,right-left+1,bottom-top+1,(gridSize-dw)/2,(gridSize-dh)/2,dw,dh);
        const data=nctx.getImageData(0,0,gridSize,gridSize).data; const v=[];
        for(let i=0;i<data.length;i+=4) v.push(1-(data[i]+data[i+1]+data[i+2])/765);
        const norm=Math.hypot(...v)||1; return v.map((x)=>x/norm);
    }

    async function loadClassifier(onReady) {
        const response=await fetch(modelUrl);
        if(!response.ok) throw new Error(`로컬 모델을 불러올 수 없습니다: ${response.status}`);
        const model=await response.json();
        const classifier={
            classify(source, callback) {
                try {
                    const v=preprocess(source,model.gridSize);
                    const scores=model.classes.map((c)=>Math.max(...c.prototypes.map((p)=>p.reduce((sum,x,i)=>sum+x*v[i],0))));
                    const probabilities=softmax(scores.map((s)=>s*model.temperature));
                    const results=model.classes.map((c,i)=>({label:c.label,confidence:probabilities[i]})).sort((a,b)=>b.confidence-a.confidence);
                    setTimeout(()=>callback(null,results),0);
                } catch(error) { setTimeout(()=>callback(error),0); }
            }
        };
        if(onReady) onReady(); return classifier;
    }

    // ml5의 사용 지점만 호환해 기존 drawingAI.js를 수정하지 않아도 됩니다.
    global.ml5={ imageClassifier(_name,onReady) {
        let loaded=null, failure=null, queue=[];
        loadClassifier(onReady).then((c)=>{loaded=c; queue.splice(0).forEach(([s,cb])=>c.classify(s,cb));}).catch((e)=>{failure=e; queue.splice(0).forEach(([,cb])=>cb(e)); console.error(e);});
        return {classify(source,callback){if(failure) callback(failure); else if(loaded) loaded.classify(source,callback); else queue.push([source,callback]);}};
    }};
})(window);
