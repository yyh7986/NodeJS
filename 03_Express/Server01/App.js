// 서버운영을 위해서 express 모듈을 import 해서 express 객체 변수에 저장
const express = require("express");
const app = express(); // express() 함수를 이용해서 서버운영관련 객체를 변수에 저장
// 익스프레스 서버는 이것만으로도 http 서버의 createServer 와 같은 동작이 되었다라고 할 수 있다.

app.set("port", 3000);
// app.set() : 서버객체의 필드 변수를 추가해서 사용할 수 있다.
// 추가되는 변수는 현재 파일에서만 사용이 되고, 서버 종료시 소멸된다
// console.log(app.get("port"));

// app.get() 같은 함수를 라우터라고 부른다.
app.get("/", (req, res) => {
  res.send("<h1>Main Page</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>About Page</h1>");
});

app.listen(3000, () => {
  console.log("3000 port ::: Server Open");
});

// express 서버 구동 순서 -----------------------
// 1. npm init
// 2. npm i express
// 3. npm i nodemon : 개발환경용 이므로 필수는 아님
// 4. app.js 또는 main에 지정한 파일(서버 시작파일)을 제작한다
// 5. package.json 의 scripts 에 "start":"nodemon app" 을 추가한다
// 6. npm app 또는 npm run start(npm start) 로 서버를 시작한다.

// nodemon 사용시 장점 ----------------------------
// 1. 서버 구동 및 운용에 발생한 모든 과정을 로그로 보여준다
// 2. 에러수정이 용이하다
// 3. 일정시간이 지나거나 주요파일이 저장되면 서버가 재시작되므로 수정사항이 자동적용된다.
