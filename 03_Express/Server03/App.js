const express = require("express");
const path = require("path");
const app = express();
app.set("port", process.env.PORT || 3000);
// 라우터 : app.get() 또는 app.post() 등...
// 미들웨어 : 라우터 안에 있는 익명함수
// req가 요청을 받아서 미들웨어를 실행하고, 그안에서 res로 응답

// 1. req가 요청받은 url 없이, 미들웨어만 실행하기 위한 라우터가 있다
// 모든 라우터들이 실행되기 전 공통코드가 실행되는 라우터 : app.use();
// 보통 다른 라우터들의 위쪽에 작성한다
// 모든 라우터들이 실행되기전 실행의 대상으로 인식된다.
// 서버에서 각 url 별로 해야할 일들 이외에 공통으로 작업해야하는 일이 있다면 여기에 작성한다
app.use((req, res, next) => {
  console.log("모든 요청에 실행됩니다");
  // 공통실행 라우터를 포함 모든 라우터는 해당미들웨어 실행후 종료된다
  // 다음 라우터로 이동하지 않는 것이 보통이다
  // 공통실행 라우터는 자신도 실행되고 해당 url의 라우터도 실행되게 하기위해, 매개변수에 next를 넣고 익명함수 끝에 next()함수를 호출하여 다음 코드들이 실행되게 이어준다
  next();
  // 모든 라우터에 next가 있지만 사용하지 않아서 생략된 상태이다.
  // url을 포함한 라우터를 다른곳으로 이동할 필요가 없어서 사용하지 않을 뿐이다
  // 필요하면 꺼내서 사용할 수 있다.
  // next()가 없으면 현재 미들웨어 라우터에서 요청에대한 응답이 종료된다. 더이상 이동하지 않는다.
  // 공통코드 미들웨어를 위한 라우터는 반드시 next()를 사용한다
});

// 2. 특정 url 에서만 실행할 공통코드 라우터(이하 미들웨어)
app.use("/loginForm", (req, res, next) => {
  console.log("loginForm 요청에만 실행됩니다");
  next();
});
// get과 post 등 모든 method에서 리퀘스트 키워드만 같으면 실행된다
// 실행후 next() 로 인해 제어권이 아래로 이동하여, 해당 get이나 post등이 추가 실행된다.

// 3. 에러가 발생했을때 사용하는 미들웨어도 있다.
// 정상 라우터 또는 공통 미들웨어 실행중 에러가 발생했을때
// app.use((req, res, next) => {
// throw new Error("서버 에러 발생!");
// 현재 코드는 에러의 상세내용이 console창에도 나오고 브라우저 창에도 나온다.
// try {
// throw new Error("서버 에러 발생!");
// } catch (err) {
// console.error(err);
// 서버에서 받은 에러 내용을 담고 next로 이동한다
// next(err);
// next가 err를 전달인수로 갖으면 에러처리 미들웨어로 이동하라는 뜻
// 에러처리 라우터는 보통 현재 서버 프로그래밍의 가장 아래에 기술한다
// }
// 브라우저에 에러내용을 나오지 않게 하려면 1차적으로 try~catch를 이용하고
// 두번째로 에러처리 라우터를 만들어 사용한다.
// });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/loginForm", (req, res) => {
  res.sendFile(path.join(__dirname, "/loginForm.html"));
});

// 5. 404 에러 처리
// 위의 모든 라우터를 검색하다가 해당 라우터가 없어서 현재 미들웨어를 만나면 404에러가 발생한것이므로, 이 미들웨어는 맨아래 또는 에러처리 라우터 바로 위에 위치시킨다
app.use((req, res, next) => {
  // res.send("ERROR 발생")
  res.status(404).send("404 ERROR");
});

// 4. 에러처리 라우터
app.use((err, req, res, next) => {
  console.error(err);
  res.status(200).send("에러 발생함");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "port ::: Server Open");
});
