const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/downloads", express.static(path.join(__dirname, "uploads")));

try {
  fs.readdirSync("uploads");
} catch (err) {
  console.error("폴더가 존재하지 않아 새로 생성합니다");
  fs.mkdirSync("uploads");
}

const multerObj = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const fn = path.basename(file.originalname, ext) + Date.now() + ext;
      done(null, fn);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/fileupload.html"));
});

app.post("/upload", multerObj.single("image"), (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const filename = req.file.filename;

  res.json({ title, description, price, filename });
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "port ::: Server Open");
});
