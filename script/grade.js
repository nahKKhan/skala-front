function startGradeCalculator() {

    // 과목 배열
    var subjects = ["HTML", "CSS", "JavaScript"];

    // 총점
    var total = 0;

    // 평균
    var average;

    // 결과
    var result;

    // 등급
    var grade;

    // 점수 입력
    for (var i = 0; i < subjects.length; i++) {

        var score = Number(
            prompt(subjects[i] + " 점수를 입력하세요.")
        );

        // 잘못 입력한 경우
        if (isNaN(score) || score < 0 || score > 100) {
            alert("0~100 사이의 점수를 입력하세요.");
            i--;
            continue;
        }

        total += score;
    }

    average = total / subjects.length;

    // 합격 여부
    if (average >= 60) {
        result = "합격";
    } else {
        result = "불합격";
    }

    // 등급 계산
    if (average >= 90) {
        grade = "A";
    }
    else if (average >= 80) {
        grade = "B";
    }
    else if (average >= 70) {
        grade = "C";
    }
    else if (average >= 60) {
        grade = "D";
    }
    else {
        grade = "F";
    }

    alert(
        "총점 : " + total + "점\n" +
        "평균 : " + average.toFixed(1) + "점\n" +
        "등급 : " + grade + "\n" +
        "결과 : " + result + "입니다!"
    );
}