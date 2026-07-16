function startUpDownGame() {

    var computerNum = Math.floor(Math.random() * 50) + 1;

    var count = 0;

    while (true) {

        var userNum = prompt("1부터 50 사이의 숫자를 입력하세요.");

        if (userNum === null) {
            alert("게임을 종료했습니다.");
            break;
        }

        userNum = Number(userNum);
        count++;
        if (isNaN(userNum) || userNum < 1 || userNum > 50) {
            alert("1~50 사이의 숫자만 입력하세요.");
            continue;
        }
        else if (userNum > computerNum) {
            alert("⬇ Down!");
        }
        else if (userNum < computerNum) {
            alert("⬆ Up!");
        }
        else {
            alert("🎉 축하합니다!\n" + count + "번 만에 맞추셨습니다.");
            break;
        }
    }
}