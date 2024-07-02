// 파일 입출력을 위한 모듈의 promise 포함하여 로딩한다
const fs = require("fs").promises;
// fs의 readFile 함수안에 Promise 객체를 리턴하는 기능이 담겨있는걸 이용하겠다는 뜻

console.log("파일 리딩 시작");

const pm = fs.readFile("./Readme.txt");
// fs.readFile("./Readme.txt").then().catch().finally();

pm.then((data) => {
  console.log(data.toString());
  console.log("파일 리딩 성공");
})
  .catch((err) => {
    console.log("파일 리딩 실패");
    console.error(err.code);
    console.error(err.path);
  })
  .finally(() => {});

// readFile 함수를 동기식으로 전환하여 호출 실행
async function abcd() {
  try {
    console.log("파일 리딩 시작2");
    const result = await fs.readFile("./Readme.txt");
    console.log(result.toString());
    console.log("파일 리딩 종료2");
  } catch (err) {
    console.log(err);
  }
}
abcd();
