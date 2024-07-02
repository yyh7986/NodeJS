const express = require("express");
const path = require("path");
const app = express();

// process.env.PORT 시스템 포트번호
app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  // http 서버 : 파일을 읽어서 내용을 전송
  // express 서버 : 파일을 직접 전송
  // http 서버 : 상대 경로로 파일을 선택
  // express 서버 : 절대 경로로 파일을 선택
  res.sendFile(path.join(__dirname, "/index.html"));
  // __dirname : 현재 파일이 경로
  // __filename : 현재 작성중인 파일의 이름
  // path.join() : 컴마로 구분해서 경로와 경로, 경로와 파일을 조합하는 함수
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "port ::: Server Open");
});
