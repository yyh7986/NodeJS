const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
// const session = require("express-session");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  if (req.cookies.userid) {
    res.send(
      `<h2>${req.cookies.userid}님 반갑습니다.</h2><a href="/logout">로그아웃</a>`
    );
  } else {
    res.sendFile(path.join(__dirname, "/index.html"));
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("userid", req.cookies.userid, {
    httpOnly: true,
    path: "/",
  });
  res.redirect("/");
});

app.post("/login", (req, res) => {
  const userid = req.body.userid;
  const pwd = req.body.pwd;
  console.log(userid, pwd);
  if (userid == "scott" && pwd == "1234") {
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 1);
    res.cookie("userid", userid, {
      expires: expires,
      httpOnly: true,
      path: "/",
    });
    res.json({ msg: "ok" });
    // res.redirect("/"); // axios 로 요청된건 반드시 요청된 곳으로 응답이 가야하기때문에 res.redirect는 지양해야한다
  } else if (userid != "scott") {
    res.json({ msg: "없는 아이디입니다." });
  } else if (pwd != "1234") {
    res.json({ msg: "비밀번호가 틀립니다." });
  }
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "port ::: Server Open");
});
