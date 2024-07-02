// Node.js에 포함된 함수, 기능과 문법을 이용해서 웹호스팅을 할 수 있는 서버를 구축한다
// Node가 제공하는 라이브러리 중 서버 구축에 필요한 기능과 함수를 담고 있는 http 모듈(객체)을 require 한다
const { error } = require("console");
const http = require("http");
// http 모듈의 내용을 불러와서 http 라는 변수에 저장하여 사용한다
// 객체형식으로 불러와서 저장한형태이므로 http.함수이름(), http.변수이름 처럼 사용한다

// http.createServer((request, response) => {});
// createServer 함수 : Node.js 자바스크립트로 만든 http 서버가 설정 & 실행되게 하는 함수이다
// (request, response) => {} : 서버에 클라이언트가 요청이 있을때 실행할 명령들이 들어간다

// 서버 생성
const server01 = http.createServer((req, res) => {
  // req는 요청을 받고, res는 응답을 보낸다
  // req에 클라이언트로부터 요청이 들어오면 res로 응답해준다
  res.write("<h1>Hello Node Server!</h1>");
  res.end("<h2>Welcome to My Node Server!!</h2>");
});

// 서버 오픈
/* 
server01.listen(3000, () => {
  console.log("port 3000 :: Server Open");
}); 
*/
// 3000은 포트번호, 익명함수는 서버 오픈과 동시에 실행될 명령들이 들어간다.
// 서버 변수를 사용하지 않은 간단 표현 예 : http.createServer((req, res)=>{}).listen();

server01.listen(3000);
server01.on("listening", () => {
  console.log("port 3000 :: Server Open");
});
server01.on("error", (error) => {
  console.error(error);
});

const server02 = http.createServer((req, res) => {
  res.write("<h1>Hello Node Server02!</h1>");
  res.end("<h2>Welcome to My Node Server02!!</h2>");
});
server02.listen(3001, () => {
  console.log("port 3001 :: Server Open");
});
