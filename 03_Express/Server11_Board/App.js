const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const fs = require("fs");
const multer = require("multer");

const app = express();

app.set("port", process.env.PORT || 3000);
// 일반 static 폴더 설정
app.use("/", express.static(path.join(__dirname, "public")));
// upload 용 static 설정
app.use("/img", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dotenv.config();
// 쿠키와 세션
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET, // 암호화 코드
    cookie: {
      // session-cookie 설정
      httpOnly: true,
      secure: false,
    },
  })
);

const indexRouter = require("./Routers");
const membersRouter = require("./Routers/members");
const boardsRouter = require("./Routers/boards");
app.use("/", indexRouter);
app.use("/members", membersRouter);
app.use("/boards", boardsRouter);

app.get("/favicon.ico", (req, res) => res.status(204));
// 에러라우터
app.use((req, res, next) => {
  console.log(404);
  res.send("404 에러입니다");
});
app.use((err, req, res, next) => {
  //res.send("서버 에러입니다");
  console.error(err);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "port ::: Server Open");
});
