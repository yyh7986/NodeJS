const express = require("express");
const router = express.Router();
const path = require("path");
const mysql = require("mysql2/promise");
const fs = require("fs");
const multer = require("multer");

async function getConnection() {
  let connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "adminuser",
    database: "nodegram",
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

router.get("/mainList", (req, res) => {
  res.sendFile(path.join(__dirname, "/..", "/views/mainList.html"));
});

router.get("/feedWriteForm", (req, res) => {
  res.sendFile(path.join(__dirname, "/..", "/views/feedWriteForm.html"));
});

const obj = multer();
router.post("/writeFeed", obj.single("img"), async (req, res) => {
  const { content, writer, image, savefilename } = req.body;
  try {
    const con = await getConnection();
    // feed 테이블에 레코드 추가
    let sql =
      "INSERT INTO feed(content, image, savefilename, writer) VALUES(?,?,?,?)";
    const [result, field] = await con.query(sql, [
      content,
      image,
      savefilename,
      writer,
    ]);
    let feedid = result.insertId;
    console.log(`feedid : ${feedid}`);

    // content 에서 해시태그를 분리
    const hashtags = content.match(/(?<=#)[^\s#]+/g);
    console.log(`해시태그들 : ${hashtags}`);

    if (hashtags) {
    }
  } catch (err) {
    next(err);
  }
});

// 복사본 시작
router.post("/writeFeed", obj.single("img"), async (req, res) => {
  const { content, writer, image, savefilename } = req.body;
  try {
    const connection = await getConnection();
    // feed 테이블에 레코드를 추가합니다
    let sql =
      "insert into feed(content, image, savefilename, writer) values(?,?,?,?)";
    const [result, field] = await connection.query(sql, [
      content,
      image,
      savefilename,
      writer,
    ]);
    feedid = result.insertId;
    console.log(`피드아이디 : ${feedid}`);

    // content 에서 해시테그를 분리합니다
    const hashtags = content.match(/(?<=#)[^\s#]+/g);
    console.log(`해시테그들 : ${hashtags}`);

    if (hashtags) {
      hashtags.map(async (tag, idx) => {
        console.log(`------tag : ${tag}------------------------`);
        // tag 에 담긴 단어가  hashtag 테이블에 존재하는지 검색.
        sql = "select * from hashtag where word=?";
        let [rows, field] = await connection.query(sql, [tag]);
        let tagid = "";
        if (rows.length >= 1) {
          // 이미 존재하는 해시테그라면 그 word의 id만 추출
          tagid = rows[0].id;
        } else {
          sql = "insert into hashtag(word) values(?)";
          let [result2, field] = await connection.query(sql, [tag]);
          tagid = result2.insertId;
        }
        console.log(`테그아이디 : ${tagid}`);

        // hash_feed 테이블에 피드아이디와 테그아이디로 레코드를 추가
        sql = "insert into hash_feed(feed_id, hash_id) values(?,?)";
        let [result3, field3] = await connection.query(sql, [feedid, tagid]);
      });
    }
    res.send("ok");
  } catch (err) {
    next(err);
  }
});
// 복사본 끝

router.post("/getFeedList", (req, res) => {});

router.post("/imageUpload", uploadObj.single("image"), (req, res) => {
  console.log("filename : ", req.file.originalname);
  console.log("savefilename : ", req.file.filename);
  res.json({ image: req.file.originalname, savefilename: req.file.filename });
});

module.exports = router;
