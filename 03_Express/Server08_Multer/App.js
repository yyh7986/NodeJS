// npm init
// npm i express nodemon cookie-parser express-session
// npm start
// "start": "nodemon app",
const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const app = express();
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 업로드 폴더 생성 - fs 모듈 이용
// 업로드용 폴더로 사용할 폴더를 조사해보고 없으면 생성 있으면 그 폴더를 이용

try {
  fs.readdirSync("uploads");
} catch (err) {
  console.error("폴더가 존재하지 않아 새로 생성합니다");
  fs.mkdirSync("uploads");
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/multer.html"));
});

app.post("/upload", (req, res) => {});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "port ::: Server Open");
});
