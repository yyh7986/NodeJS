const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");
const passport = require("passport");

async function getConnection() {
  let connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "adminuser",
    database: "nodegram",
  });
  return connection;
}

router.post("/login", async (req, res) => {
  const { email, pwd } = req.body;
  const sql = "SELECT * FROM user WHERE email=?";
  try {
    const connection = await getConnection();
    const [rows, fields] = await connection.query(sql, [email]);
    // console.log("rows : ", rows);
    // console.log("rows.length : ", rows.length);
    // console.log("fields : ", fields);
    if (rows.length > 0) {
      const result = await bcrypt.compare(pwd, rows[0].pwd);
      if (result) {
        const uniqueInt = Date.now();
        req.session[uniqueInt] = rows[0];
        res.cookie("session", uniqueInt, { httpOnly: true, path: "/" });
        res.json({ msg: "ok" });
        console.log("login success");
      } else {
        res.json({ msg: "비밀번호가 틀렸습니다" });
      }
    } else {
      res.json({ msg: "아이디가 없습니다" });
    }
  } catch (err) {
    console.error(err);
  }
});

router.get("/logout", (req, res) => {
  delete req.session[req.cookies.session];
  res.clearCookie("session", req.cookies.session, {
    httpOnly: true,
    path: "/",
  });
  res.redirect("/");
});

router.get("/joinForm", (req, res) => {
  res.sendFile(path.join(__dirname, "/..", "/views/joinForm.html"));
});

router.post("/join", async (req, res) => {
  const { email, pwd, nick } = req.body;
  console.log("req.body : ", req.body);
  try {
    const con = await getConnection();
    let sql = "SELECT * FROM user WHERE email=?";
    const [rows1, fields1] = await con.query(sql, [email]);

    sql = "SELECT * FROM user WHERE nickname=?";
    const [rows2, field2] = await con.query(sql, [nick]);

    if (rows1.length > 0) {
      res.json({ msg: "중복된 이메일" });
    } else if (rows2.length > 0) {
      res.json({ msg: "중복된 닉네임" });
    } else {
      sql = "INSERT INTO user(email, pwd, nickname) VALUES(?,?,?)";
      const hash = await bcrypt.hash(pwd, 12); // pwd 암호화
      const result = await con.query(sql, [email, hash, nick]);
      res.json({ msg: "ok" });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/getLoginUser", async (req, res) => {
  const loginUser = req.session[req.cookies.session];
  console.log(loginUser);

  try {
    const con = await getConnection();
    // 내가 follow 하는 유저들 : followings
    // follow_form 에서 나를 조회해서 follow_to 들을 추출합니다
    let sql = "SELECT * FROM follow WHERE follow_from=?";
    let [rows, fields] = await con.query(sql, [loginUser.nickname]);
    // rows 는 {follow_from:값, follow_to:값}들로 구성된 객체 배열
    // let followings = rows.map((row) => {
    //   return row.follow_to;
    // }); // rows 가 원래 배열이었기 때문에 각 요소들로 실행되고 리턴된 데이터로 다시 배열이 구성되고 결과가 followings 변수에 저장된다

    let followings =
      rows.length >= 1
        ? rows.map((row) => {
            row.follow_to;
          })
        : [];

    let sql2 = "SELECT * FROM follow WHERE follow_to=?";
    let [rows2, fields2] = await con.query(sql2, [loginUser.nickname]);
    let followers =
      rows2.length >= 1
        ? rows2.map((row) => {
            row.follow_from;
          })
        : [];
    res.json({
      loginUser: loginUser,
      followers: followers,
      followings: followings,
    });
  } catch (error) {}
});

router.post("/follow", async (req, res, next) => {
  const { follow_from, follow_to } = req.body;
  try {
    const con = await getConnection();
    let sql = "INSERT INTO follow(follow_from, follow_to) VALUES(?,?)";
    let [result, fields] = await con.query(sql, [follow_from, follow_to]);
    res.send("ok");
  } catch (error) {
    next(error);
  }
});

router.post("/unfollow", async (req, res, next) => {
  const { follow_from, follow_to } = req.body;
  try {
    const con = await getConnection();
    let sql = "DELETE FROM follow WHERE follow_from=? AND follow_to=?";
    let [result, fields] = await con.query(sql, [follow_from, follow_to]);
    res.send("ok");
  } catch (error) {
    next(error);
  }
});

router.get("/kakao", passport.authenticate("kakao"));

// router.get("/logout", (req, res) => {
//   if (req.cookies.session) {
//     delete req.session[req.cookies.session];
//     res.clearCookie("session", req.cookies.session, {
//       httpOnly: true,
//       path: "/",
//     });
//   } else {
//     req.session.destroy(); // 세션 쿠키 한번에 삭제
//   }
//   res.redirect("/feed/mainList");
// });

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/main", // 인증 & 회원가입 및 로그인 실패 했을때 이동할 주소
  }),
  (req, res) => {
    const uniqueInt = Date.now();
    req.session[uniqueInt] = req.user;
    res.cookie("session", uniqueInt, { httpOnly: true, path: "/" });
    res.redirect("/feed/mainList"); // 성공했을때 이동할 주소
  }
);

module.exports = router;
