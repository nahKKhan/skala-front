# skala-front
SKALA 프론트엔드 프로젝트

- 과제 수행 저장소

공통 필수 내용
1) 별도 CSS 파일 생성 /css/style.css
2) 전체 글꼴: 구글 폰트에서 마음에 드는 것을 선택하고 body 태그 선택자를 이용해 전체 폰트를 변경한다.
- font-family: "Hibur Mono", monospace;
- font-weight: 400;
- font-style: normal;
- "https://fonts.googleapis.com/css2?family=Chiron+GoRound+TC:wght@200..900&family=Hibur+Mono&family=Nanum+Gothic+Coding&display=swap"

3) 전체 줄간격, Color, 배경색을 적용한다.
4) 제목 강조: h1, h2 태그에 색, 크기, Padding, Border 등을 넣어 꾸민다.
5) 링크 스타일: 링크 컬러나, Decoration을 지정한다.
6) 모든 HTML에서 style.css를 적용할 수 있도록 <link>를 추가한다.
7) body 태그 아래에 <div class="container">를 추가하고 container를 꾸민다. (모든 컨텐츠를 가운데 정렬한다.)
8) 내비게이션 메뉴나 회원가입 버튼에 마우스를 올렸을 때 배경색이나 글자색이 순식간에 바뀌지 않고 부드럽게 변하도록 처리

## index -> indexOld

필수 내용
- 브라우저 타이틀(title): “Welcome SKALA”
- 본문 타이틀(h1) : “환영 인사"
- 본문(p): “스칼라에 오신 것을 환영합니다.”
- index.html(indexOld.html)에 나의 수업, 휴일, 프로필 바로가기를 추가한다.

## index

필수 내용
- 기존에 만든 myClass, myHoliday, myProfile, myTrip, signUp 을 한 곳에 모아 볼수 있는 개인 메인 포털 작성
- <nav> - 다른 파일로 이동하는 메뉴 링크를 넣기
- <main> - 본문 영역을 선언하고 컨텐츠 넣기
- <aside> - 사이드바 넣고 부가 정보 넣기
- index.html을 처음 열었을 때, 상단 헤더의 타이틀이 부드럽게 페이드인 되며 나타나는 등장 애니메이션을 구현한다
- 바로가기에 Flexbox를 적용하고, main과 aside를 가로 배치한다.
- 화면 폭이 786 px 이하로 줄면 본문|사이드바 구조를 세로 1열로 변경하고 바로가기로 1열로 정렬

### Up-Down 숫자 맞추기 게임
▪ 컴퓨터가 생각한 비밀 숫자를 사용자가 맞추는 게임을 만든다. (/script/upDown.js)
• 컴퓨터가 1부터 50 사이의 무작위 숫자 하나를 생성하게 한다. (var computerNum = Math.floor(Math.random() * 50) + 1;)
• prompt() 창을 띄워 사용자에게 숫자를 입력받는다.
• 사용자가 맞출 때까지 반복해서 기회를 준다. (while 또는 for 반복문 실습)
• 사용자가 정답보다 큰 값을 입력하면 alert("Down!"), 작은 값을 입력하면 alert("Up!")을 띄워준다.
• 정답을 맞추면 alert("축하합니다! X번 만에 맞추셨습니다.")를 띄우고 게임을 종료한다.
▪ index.html 파일의 원하는 위치(예: <aside> 영역 안의 새로운 <section>)에 게임 시작 버튼 태그를 추가하여 실행시
킨다.

### 성적 계산기
▪ 강의 3과목의 점수를 연속으로 입력받아 평균을 내고 합격 여부와 등급을 정한다. (/script/grade.js)
• 과목 이름이 담긴 배열을 미리 만들어 둡니다. var subjects = [“HTML", “CSS", “JavaScript"];
• 총점을 저장할 변수(var total = 0;)를 만듭니다.
• for문을 배열의 길이만큼 돌리면서, 각 과목의 점수를 prompt()로 연속해서 입력받아 total에 더합니다.
• 예: prompt(subjects[i] + " 점수를 입력하세요.");
• 반복문이 끝난 후 평균 점수를 구합니다. (평균 점수가 60점 이상이면 합격, 60점 미만이면 불합격)
• 결과를 브라우저 alert창으로 보여줍니다. (alert("총점: 240점, 평균: 80, 결과: 합격입니다!"))

### 내 가방 보기
▪ 가방 속 물품을 JavaScript Object로 만들고 그 내용을 보여준다.
• /script/bag.js를 만들고 그 안에 showMyBag()함수를 생성한다.
• myBag이라는 배열에는 소지품 객체 (소지품 명과, 소지품 수)의 임의 데이터를 만든다.
• 반복문을 통해 소지품 객체를 출력한다.

### 실시간 날씨
▪ 위치 정보
• myBag이라는 배열에는 소지품 객체 (소지품 명과, 소지품 수)의 임의 데이터를 만든다.
• 반복문을 통해 소지품 객체를 출력한다.

▪ Open-Meteo 무료 API를 통해 날씨데이터를 비동기로 가져온다.
• weather.js: 도시가 변경되었을 때, 단순 좌표 출력에 그치지 않고 fetch()와 async/await 문법을 사용해 Open-Meteo 서버에 날씨 데이터를 요청한다.
• 데이터를 받아오는 동안 화면에 "로딩 중... ⏳" 메시지를 띄우고,다운로드가 완료되면 진짜 실시간 온도와 습도를 화면에 그린다.

▪ weather.js를 데이터를 책임지는 weatherAPI.js와 화면을 책임지는 realtimeInfo.js로 분리한다.
• index.html: <script type="module" src="realtimeInfo.js"></script>
• weatherAPI.js: export async function 분리
• realtimeInfo.js: weatherAPI 로 부터 함수를 import 하여 처리

## myHoilday

필수 내용
- <h1>
- <h2>
- <br>
- <p>
- <mark>

## myProfile

필수 내용
- <ul> 내가 좋아하는 음식
- <ol> 올 해 할 일
- <dl> 나를 설명하는 단어들

## myClass

필수 내용
- <table>
- <thead> - 시간, 요일
- <tbody>
- <td> - 2시간 이상의 강의나, 점심시간은 셀을 합쳐서 표시
- table, th, td를 꾸며 테이블을 깔끔한 테이블을 만든다.

## myTirp

필수 내용
- <audio><source>
- <img>
- <video><source>
- 여행지 목록의 각 단락에 클래스(trip-card)를 추가하고에 배경색, 테두리, 패딩, 마진을 조정하여 하나의 '리뷰 카드' 형태로 디자인한다.
- 여행지 카드를 Grid를 사용하여 3열 바둑판 배치 한다.
- 화면이 작을 때 : 3열 배열을 1열로 조정
- 여행 앨범의 카드에 마우스를 올리면 박스가 살짝 위로 떠 오르고 그림자가 더 진해지는 효과를 주어 '클릭하고 싶게' 만든다.

## signUp

필수 내용
- <form> - action은 signUpResult.html, method는 get
- <fieldset><legend><label>
- <input> - placeholder, required 등 속성사용
- <select><option><textarea>
- <submit><reset>
- ▪ 스타일링하기 까다로운 폼 스타일링
1) 입력창 크기 키우기
2) Fieldset 그룹 테두리 다듬기
3) 버튼 꾸미기

## signUpResult

필수 내용
- 회원가입에서 회원가입 버튼을 클릭하면 회원가입결과 페이지로 이동한다.