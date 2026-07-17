const modelStatus = document.querySelector("#modelStatus");

const guessButton = document.querySelector("#guessButton");
const clearButton = document.querySelector("#clearButton");
const newMissionButton =
    document.querySelector("#newMissionButton");

const brushSizeInput =
    document.querySelector("#brushSize");

const missionText = document.querySelector("#missionText");
const missionResult =
    document.querySelector("#missionResult");

const predictionList =
    document.querySelector("#predictionList");

const emptyPrediction =
    document.querySelector("#emptyPrediction");

const loadingPrediction =
    document.querySelector("#loadingPrediction");

const bestStreakElement =
    document.querySelector("#bestStreak");

const playAgainButton =
    document.querySelector("#playAgainButton");


const missions = [
    {
        label: "apple",
        text: "🍎 사과를 그려보세요."
    },
    {
        label: "banana",
        text: "🍌 바나나를 그려보세요."
    },
    {
        label: "cat",
        text: "🐱 고양이를 그려보세요."
    },
    {
        label: "dog",
        text: "🐶 강아지를 그려보세요."
    },
    {
        label: "fish",
        text: "🐟 물고기를 그려보세요."
    },
    {
        label: "flower",
        text: "🌼 꽃을 그려보세요."
    },
    {
        label: "house",
        text: "🏠 집을 그려보세요."
    },
    {
        label: "tree",
        text: "🌳 나무를 그려보세요."
    },
    {
        label: "sun",
        text: "☀️ 태양을 그려보세요."
    },
    {
        label: "star",
        text: "⭐ 별을 그려보세요."
    },
    {
        label: "car",
        text: "🚗 자동차를 그려보세요."
    },
    {
        label: "umbrella",
        text: "☂️ 우산을 그려보세요."
    },
    {
        label: "moon",
        text: "🌙 달을 그려보세요."
    },
    {
        label: "cloud",
        text: "☁️ 구름을 그려보세요."
    },
    {
        label: "rainbow",
        text: "🌈 무지개를 그려보세요."
    },
    {
        label: "snowman",
        text: "⛄ 눈사람을 그려보세요."
    }
];


const koreanLabels = {
    airplane: "비행기",
    alarm_clock: "알람시계",
    ambulance: "구급차",
    angel: "천사",
    ant: "개미",
    apple: "사과",
    axe: "도끼",
    banana: "바나나",
    basket: "바구니",
    bear: "곰",
    bee: "벌",
    bicycle: "자전거",
    bird: "새",
    book: "책",
    butterfly: "나비",
    cake: "케이크",
    camera: "카메라",
    car: "자동차",
    cat: "고양이",
    chair: "의자",
    cloud: "구름",
    coffee_cup: "커피잔",
    computer: "컴퓨터",
    cookie: "쿠키",
    cow: "소",
    crab: "게",
    crocodile: "악어",
    cup: "컵",
    dog: "강아지",
    dolphin: "돌고래",
    donut: "도넛",
    door: "문",
    duck: "오리",
    elephant: "코끼리",
    eye: "눈",
    face: "얼굴",
    fan: "선풍기",
    fish: "물고기",
    flower: "꽃",
    frog: "개구리",
    guitar: "기타",
    hamburger: "햄버거",
    hand: "손",
    hat: "모자",
    helicopter: "헬리콥터",
    horse: "말",
    house: "집",
    ice_cream: "아이스크림",
    key: "열쇠",
    keyboard: "키보드",
    laptop: "노트북",
    leaf: "나뭇잎",
    lion: "사자",
    moon: "달",
    mountain: "산",
    mouse: "쥐",
    mushroom: "버섯",
    octopus: "문어",
    owl: "부엉이",
    panda: "판다",
    pencil: "연필",
    penguin: "펭귄",
    pizza: "피자",
    rabbit: "토끼",
    rainbow: "무지개",
    shark: "상어",
    sheep: "양",
    shoe: "신발",
    snake: "뱀",
    snowman: "눈사람",
    spider: "거미",
    star: "별",
    strawberry: "딸기",
    sun: "태양",
    table: "테이블",
    telephone: "전화기",
    tiger: "호랑이",
    train: "기차",
    tree: "나무",
    truck: "트럭",
    umbrella: "우산",
    watermelon: "수박",
    whale: "고래",
    zebra: "얼룩말"
};

let classifier = null;
let drawingCanvas = null;

let modelReady = false;
let hasDrawing = false;
let isAnalyzing = false;

let currentMission = null;
let previousMissionIndex = -1;

let currentStreak = 0;
let bestStreak = Number(
    localStorage.getItem("drawingBestStreak") || 0
);

function setup() {
    const container =
        document.querySelector("#canvasContainer");

    const containerWidth = container.clientWidth;


    const canvasSize = Math.min(
        Math.max(containerWidth, 260),
        480
    );

    drawingCanvas = createCanvas(
        canvasSize,
        canvasSize
    );

    drawingCanvas.parent("canvasContainer");

    background(255);

    stroke(20);
    strokeWeight(Number(brushSizeInput.value));
    strokeCap(ROUND);
    strokeJoin(ROUND);

    bestStreakElement.textContent =
        String(bestStreak);

    createNewMission();
    loadDoodleModel();
}


function draw() {
    if (
        mouseIsPressed &&
        isPointerInsideCanvas()
    ) {
        drawLine();
    }
}


function touchMoved() {
    if (isPointerInsideCanvas()) {
        drawLine();

        return false;
    }

    return true;
}

function drawLine() {
    stroke(20);
    strokeWeight(Number(brushSizeInput.value));

    line(
        pmouseX,
        pmouseY,
        mouseX,
        mouseY
    );

    hasDrawing = true;

    updateGuessButton();
}

function isPointerInsideCanvas() {
    return (
        mouseX >= 0 &&
        mouseX <= width &&
        mouseY >= 0 &&
        mouseY <= height
    );
}


function loadDoodleModel() {
    modelStatus.textContent = "AI 불러오는 중";

    try {
        classifier = ml5.imageClassifier(
            "DoodleNet",
            function () {
                modelReady = true;

                modelStatus.textContent = "AI 준비 완료";
                modelStatus.classList.add("ready");

                updateGuessButton();
            }
        );
    } catch (error) {
        console.error(error);

        modelStatus.textContent = "AI 로드 실패";
        modelStatus.classList.add("error");
    }
}


function createNewMission() {
    let randomIndex;


    do {
        randomIndex = Math.floor(
            Math.random() * missions.length
        );
    } while (
        missions.length > 1 &&
        randomIndex === previousMissionIndex
    );

    previousMissionIndex = randomIndex;
    currentMission = missions[randomIndex];

    missionText.textContent = currentMission.text;

    resetMissionResult();
    clearDrawing();
}


function clearDrawing() {
    background(255);

    hasDrawing = false;
    isAnalyzing = false;

    predictionList.innerHTML = "";

    emptyPrediction.hidden = false;
    loadingPrediction.hidden = true;

    guessButton.textContent = "Ask the AI";

    updateGuessButton();
}


function resetMissionResult() {
    missionResult.hidden = true;
    missionResult.textContent = "";

    missionResult.classList.remove(
        "success",
        "fail"
    );
}

function updateGuessButton() {
    guessButton.disabled =
        !modelReady ||
        !hasDrawing ||
        isAnalyzing;
}

function guessDrawing() {
    if (
        !modelReady ||
        !hasDrawing ||
        isAnalyzing
    ) {
        return;
    }

    isAnalyzing = true;

    guessButton.disabled = true;
    guessButton.textContent = "Thinking...";

    emptyPrediction.hidden = true;
    loadingPrediction.hidden = false;

    predictionList.innerHTML = "";
    resetMissionResult();

    classifier.classify(
        drawingCanvas.elt,
        function (error, results) {
            isAnalyzing = false;

            loadingPrediction.hidden = true;

            guessButton.textContent = "Ask Again";
            updateGuessButton();

            if (error) {
                console.error(error);

                emptyPrediction.hidden = false;

                emptyPrediction.innerHTML = `
                    <span class="prediction-icon">!</span>
                    <p>그림을 분석하지 못했습니다.</p>
                `;

                return;
            }

            if (!results || results.length === 0) {
                emptyPrediction.hidden = false;

                emptyPrediction.innerHTML = `
                    <span class="prediction-icon">?</span>
                    <p>AI가 결과를 찾지 못했습니다.</p>
                `;

                return;
            }

            displayPredictions(results);
            checkMission(results[0]);
        }
    );
}


function displayPredictions(results) {
    predictionList.innerHTML = "";

    const topResults = results.slice(0, 3);

    topResults.forEach(function (result, index) {
        const listItem =
            document.createElement("li");

        const rank =
            document.createElement("span");

        const information =
            document.createElement("div");

        const textRow =
            document.createElement("div");

        const name =
            document.createElement("strong");

        const score =
            document.createElement("span");

        const gauge =
            document.createElement("div");

        const gaugeBar =
            document.createElement("span");

        rank.className = "prediction-rank";

        information.className =
            "prediction-information";

        textRow.className = "prediction-text";
        name.className = "prediction-name";
        score.className = "prediction-score";

        gauge.className = "prediction-gauge";
        gaugeBar.className =
            "prediction-gauge-bar";

        rank.textContent =
            String(index + 1).padStart(2, "0");

        const normalizedLabel =
            normalizeLabel(result.label);

        name.textContent =
            translateLabel(normalizedLabel);

        const confidence =
            getConfidence(result);

        const percentage = Math.min(
            100,
            Math.max(
                0,
                Math.round(confidence * 100)
            )
        );

        score.textContent = `${percentage}%`;

        gauge.appendChild(gaugeBar);
        textRow.append(name, score);

        information.append(
            textRow,
            gauge
        );

        listItem.append(
            rank,
            information
        );

        predictionList.appendChild(listItem);


        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                gaugeBar.style.width =
                    `${percentage}%`;
            });
        });
    });
}

function getConfidence(result) {
    if (typeof result.confidence === "number") {
        return result.confidence;
    }

    if (typeof result.probability === "number") {
        return result.probability;
    }

    return 0;
}


function checkMission(topResult) {
    const topLabel =
        normalizeLabel(topResult.label);

    const missionLabel =
        normalizeLabel(currentMission.label);

    const isSuccess =
        topLabel === missionLabel;

    missionResult.hidden = false;

    if (isSuccess) {
        currentStreak += 1;

        missionResult.className =
            "mission-result success";

        missionResult.textContent =
            `🎉 Mission Complete! 연속 ${currentStreak}회 성공`;

        if (currentStreak > bestStreak) {
            bestStreak = currentStreak;

            bestStreakElement.textContent =
                String(bestStreak);

            localStorage.setItem(
                "drawingBestStreak",
                String(bestStreak)
            );
        }
    } else {
        currentStreak = 0;

        const predictedName =
            translateLabel(topLabel);

        missionResult.className =
            "mission-result fail";

        missionResult.textContent =
            `AI는 '${predictedName}'이라고 생각했어요. 다시 도전해보세요!`;
    }

    playAgainButton.hidden = false;
}


function normalizeLabel(label) {
    return String(label || "")
        .trim()
        .toLowerCase()
        .replaceAll("-", "_")
        .replaceAll(" ", "_");
}


function translateLabel(normalizedLabel) {
    if (koreanLabels[normalizedLabel]) {
        return koreanLabels[normalizedLabel];
    }

    return normalizedLabel
        .replaceAll("_", " ")
        .replace(/\b\w/g, function (character) {
            return character.toUpperCase();
        });
}

function playAgain(){

    resetMissionResult();

    clearDrawing();

    createNewMission();

}

function resetMissionResult(){

    missionResult.hidden = true;

    missionResult.textContent = "";

    missionResult.classList.remove(
        "success",
        "fail"
    );

    playAgainButton.hidden = true;

}

guessButton.addEventListener(
    "click",
    guessDrawing
);

clearButton.addEventListener(
    "click",
    function () {
        resetMissionResult();
        clearDrawing();
    }
);

newMissionButton.addEventListener(
    "click",
    createNewMission
);

brushSizeInput.addEventListener(
    "input",
    function () {
        strokeWeight(
            Number(brushSizeInput.value)
        );
    }
);

playAgainButton.addEventListener(
    "click",
    playAgain
);
