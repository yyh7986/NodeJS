const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");

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

router.get("/getLoginUser", (req, res) => {
  const loginUser = req.session[req.cookies.session];
  res.send(loginUser);
});

module.exports = router;
