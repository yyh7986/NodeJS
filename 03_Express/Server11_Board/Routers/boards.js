const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/boardList", (req, res) => {
  res.sendFile(path.join(__dirname, "/..", "/views/boardList.html"));
});

module.exports = router;
