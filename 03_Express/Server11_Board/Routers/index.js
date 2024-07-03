const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/..", "/views/loginForm.html"));
});

router.get("/loginUser", (req, res) => {
  const loginUser = req.session[req.cookies.session];
  res.send(loginUser);
});

module.exports = router;
