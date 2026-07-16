function showMyBag() {

    // 가방 속 물품 (객체 배열)
    var myBag = [
        { name: "노트북", count: 1 },
        { name: "마우스", count: 1 },
        { name: "충전기", count: 2 },
        { name: "이어폰", count: 1 },
        { name: "텀블러", count: 1 }
    ];

    var message = "🎒 내 가방 속 물품\n";

    message += "----------------\n";

    // 반복문으로 출력
    for (var i = 0; i < myBag.length; i++) {
        message +=
            (i + 1) + ". " +
            myBag[i].name +
            " : " +
            myBag[i].count +
            "개\n";
    }

    message += "----------------\n";
    message += "총 물품 종류 : "+ myBag.length +"가지\n";
    alert(message);
}