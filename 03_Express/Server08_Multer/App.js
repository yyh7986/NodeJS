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

// static 폴더 설정
app.use("/downloads", express.static(path.join(__dirname, "uploads")));

// 업로드 폴더 생성 - fs 모듈 이용
// 업로드용 폴더로 사용할 폴더를 조사해보고 없으면 생성 있으면 그 폴더를 이용

try {
  fs.readdirSync("uploads");
} catch (err) {
  console.error("폴더가 존재하지 않아 새로 생성합니다");
  fs.mkdirSync("uploads");
}

// multer를 이용해서 업로드를 수행할 객체를 생성한다
// const multerObj = multer();
// const multerObj = multer({ storage: multer.diskStorage({}), limits: {} });
const multerObj = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      // 업로드된 파일이 저장될 폴더 설정
      done(null, "uploads/");
    },
    filename(req, file, done) {
      // 업로드된 파일이 저장되기전 파일이름을 변경하는 설정
      const ext = path.extname(file.originalname);
      const fn = path.basename(file.originalname, ext) + Date.now() + ext;
      // abc.jpg -> abc + "1234567" + ".jpg";
      done(null, fn); // 변경된 이름으로 파일을 저장하는 설정
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/multer.html"));
});

// multerObj.single("image") 명령에 의해 파일 업로드 완료됨
app.post("/upload", multerObj.single("image"), (req, res) => {
  console.log(req.file.originalname);
  console.log(req.file.filename);

  const filename = req.file.filename;
  const title = req.body.title;

  res.json({ title, filename });
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "port ::: Server Open");
});
