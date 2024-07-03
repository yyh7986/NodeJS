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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/multer.html"));
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "port ::: Server Open");
});
