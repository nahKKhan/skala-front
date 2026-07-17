(function (global) {
    "use strict";

    let canvas = null;
    let context = null;
    let currentStroke = "rgb(0, 0, 0)";
    let currentWeight = 1;
    let currentCap = "butt";
    let currentJoin = "miter";

    global.ROUND = "round";
    global.width = 0;
    global.height = 0;
    global.mouseX = 0;
    global.mouseY = 0;
    global.pmouseX = 0;
    global.pmouseY = 0;
    global.mouseIsPressed = false;

    function cssColor(value) {
        if (typeof value === "number") {
            const channel = Math.max(0, Math.min(255, value));
            return `rgb(${channel}, ${channel}, ${channel})`;
        }
        return String(value);
    }

    function updatePointer(event, resetPrevious) {
        const rectangle = canvas.getBoundingClientRect();
        const x = (event.clientX - rectangle.left) * global.width / rectangle.width;
        const y = (event.clientY - rectangle.top) * global.height / rectangle.height;

        global.pmouseX = resetPrevious ? x : global.mouseX;
        global.pmouseY = resetPrevious ? y : global.mouseY;
        global.mouseX = x;
        global.mouseY = y;
    }

    function attachPointerEvents() {
        canvas.style.touchAction = "none";

        canvas.addEventListener("pointerdown", function (event) {
            updatePointer(event, true);
            global.mouseIsPressed = true;
            canvas.setPointerCapture(event.pointerId);
            event.preventDefault();
        });

        canvas.addEventListener("pointermove", function (event) {
            if (!global.mouseIsPressed) return;
            updatePointer(event, false);
            if (typeof global.draw === "function") global.draw();
            event.preventDefault();
        });

        function stopDrawing(event) {
            if (!global.mouseIsPressed) return;
            updatePointer(event, false);
            if (typeof global.draw === "function") global.draw();
            global.mouseIsPressed = false;
            event.preventDefault();
        }

        canvas.addEventListener("pointerup", stopDrawing);
        canvas.addEventListener("pointercancel", function () {
            global.mouseIsPressed = false;
        });
        canvas.addEventListener("contextmenu", function (event) {
            event.preventDefault();
        });
    }

    global.createCanvas = function (canvasWidth, canvasHeight) {
        canvas = document.createElement("canvas");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.width = `${canvasWidth}px`;
        canvas.style.height = `${canvasHeight}px`;
        context = canvas.getContext("2d");
        global.width = canvasWidth;
        global.height = canvasHeight;
        attachPointerEvents();

        return {
            elt: canvas,
            parent(target) {
                const parent = typeof target === "string"
                    ? document.getElementById(target)
                    : target;
                if (!parent) throw new Error("캔버스 부모 요소를 찾을 수 없습니다.");
                parent.appendChild(canvas);
            }
        };
    };

    global.background = function (value) {
        context.save();
        context.fillStyle = cssColor(value);
        context.fillRect(0, 0, global.width, global.height);
        context.restore();
    };

    global.stroke = function (value) {
        currentStroke = cssColor(value);
    };

    global.strokeWeight = function (value) {
        currentWeight = Number(value);
    };

    global.strokeCap = function (value) {
        currentCap = value;
    };

    global.strokeJoin = function (value) {
        currentJoin = value;
    };

    global.line = function (x1, y1, x2, y2) {
        context.beginPath();
        context.strokeStyle = currentStroke;
        context.lineWidth = currentWeight;
        context.lineCap = currentCap;
        context.lineJoin = currentJoin;
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
    };

    function start() {
        if (typeof global.setup !== "function") {
            console.error("drawingAI.js의 setup 함수를 찾을 수 없습니다.");
            return;
        }
        global.setup();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", start, { once: true });
    } else {
        setTimeout(start, 0);
    }
})(window);
