const fs = require("fs");

fs.writeFile(
  "./writeMe.txt", // 쓰려는 파일이름
  "writeMe 파일임", // 쓰려는 내용
  (err) => {
    console.error(err);
  } // 에러 발생시 처리할 익명함수
);
/*
fs.readFile("./writeMe.txt")
  .then((data) => {
    console.log(data.toString());
  })
  .catch((err) => {
    console.error(err);
  });
*/
