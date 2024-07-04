const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const mysql = require("mysql2/promise");

async function getConnection() {
  let connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "adminuser",
    database: "board",
  });
  return connection;
}

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더 생성함");
  fs.mkdirSync("uploads");
}

const uploadObj = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/imageup", uploadObj.single("image"), (req, res) => {
  console.log("filename : ", req.file.originalname);
  console.log("savefilename : ", req.file.filename);
  res.json({ image: req.file.originalname, savefilename: req.file.filename });
});

const upObj = multer();
router.post("/writeBoard", upObj.single("image"), async (req, res) => {
  const { userid, pass, email, title, content, image, savefilename } = req.body;
  try {
    const connection = await getConnection();
    const sql =
      "INSERT INTO board(userid, pass, email, title, content, image, savefilename) VALUES(?,?,?,?,?,?,?)";
    try {
      const [result, field] = await connection.query(sql, [
        userid,
        pass,
        email,
        title,
        content,
        image,
        savefilename,
      ]);
      res.send("ok");
    } catch (error) {
      next(error);
    }
  } catch (error) {}
});

router.post("/updateBoard", upObj.single("image"), async (req, res) => {
  const connection = await getConnection();
  const { title, content, img, savefilename } = req.body;
  const num = req.session.boardnum;
  const sql =
    "UPDATE board SET title=?, content=?, image=?, savefilename=? WHERE num=?";
  try {
    const [result, field] = await connection.query(sql, [
      title,
      content,
      img,
      savefilename,
      num,
    ]);
  } catch (error) {
    console.error(error);
  }
  res.send("ok");
});

router.get("/boardList", (req, res) => {
  res.sendFile(path.join(__dirname, "/..", "/views/boardList.html"));
});

router.get("/boards", async (req, res) => {
  const sql = "SELECT * FROM board ORDER BY num DESC";
  try {
    const connection = await getConnection();
    const [rows, fields] = await connection.query(sql);
    // rows 에는 하나의 레코드가 하나의 객체 형태로, 그리고 여러 레코드는 객체를 요소로 하는 배열형태로 조회
    // [ {num:1, writer:'scott', title:'안녕하세요', ...}, {}, {}, {}, ....]
    res.send(rows);
  } catch (err) {
    next(err);
  }
});

router.get("/boardView/:boardnum", async (req, res) => {
  const sql = "UPDATE board SET readcount = readcount + 1 WHERE num=?";
  req.session.boardnum = req.params.boardnum;
  try {
    const connection = await getConnection();
    const [result, fields] = await connection.query(sql, [req.params.boardnum]);
    res.sendFile(path.join(__dirname, "/..", "/views/boardView.html"));
  } catch (error) {
    next(error);
  }
});

router.get("/boardViewWithoutCnt", (req, res) => {
  res.sendFile(path.join(__dirname, "/..", "/views/boardView.html"));
});

router.get("/getBoard", async (req, res) => {
  const num = req.session.boardnum;
  const sql = "SELECT * FROM board WHERE num=?";
  try {
    const connection = await getConnection();
    const [rows, fields] = await connection.query(sql, [num]);
    res.send(rows[0]);
  } catch (error) {
    next(error);
  }
});

router.get("/boardWriteForm", (req, res) => {
  res.sendFile(path.join(__dirname, "/..", "/views/boardWriteForm.html"));
});

router.get("/updateBoardForm", (req, res) => {
  res.sendFile(path.join(__dirname, "/..", "/views/updateBoardForm.html"));
});

router.get("/getReplys", async (req, res, next) => {
  const boardnum = req.session.boardnum;
  try {
    const connection = await getConnection();
    const sql = "SELECT * FROM reply WHERE boardnum=? ORDER BY replynum DESC";
    const [rows, fields] = await connection.query(sql, [boardnum]);
    res.send(rows);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/insertReply", async (req, res, next) => {
  const { userid, boardnum, content } = req.body;
  console.log(userid, boardnum, content);
  try {
    const connection = await getConnection();
    const sql = "INSERT INTO reply(userid, boardnum, content) VALUES(?, ?, ?)";
    const [result, fields] = await connection.query(sql, [
      userid,
      boardnum,
      content,
    ]);
    res.send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/deleteReply/:replynum", async (req, res, next) => {
  try {
    const connection = await getConnection();
    const sql = "DELETE FROM reply WHERE replynum=?";
    const [result, fields] = await connection.query(sql, [req.params.replynum]);
    res.send("ok");
  } catch (error) {}
});

module.exports = router;
