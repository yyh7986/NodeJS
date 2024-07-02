const http = require("http");
const fs = require("fs").promises;

const users = {};

http
  .createServer(async (req, res) => {
    try {
      if (req.method == "GET") {
        if (req.url === "/") {
          // http://localhost:3000
          const data = await fs.readFile("./04_index.html");
          // writeHead : 클라이언트에 표시된 내용의 페이지 헤더 전송
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          // 본문 내용은 res.write 또는 res.end 로 전송하는데
          // res.end 는 전송 종료의 의미도 갖고 있다.
          return res.end(data);
        } else if (req.url === "/about") {
          const data = await fs.readFile("./04_about.html");
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          return res.end(data);
        } else if (req.url === "/user") {
          res.writeHead(200, {
            "Content-Type": "application/json; charset=utf-8",
          });
          // users 객체 안의 내용을 json 형식으로 변경하여 전송
          return res.end(JSON.stringify(users));
        }
      } else if (req.method == "POST") {
        if (req.url === "/user") {
          req.on("data", (data) => {
            // console.log(data);
            let body = data.toString();
            // console.log(body);
            const { username } = JSON.parse(body);
            // console.log(username);
            const id = Date.now(); // 현재시간 날짜를 id로 생성
            users[id] = username; // id를 키값으로 users객체에 추가
            console.log(users);
            return res.end("ok");
          });
        }
      } else if (req.method == "PUT") {
        if (req.url === "/user") {
          req.on("data", (data) => {
            let body = data.toString();
            const { key, username } = JSON.parse(body);
            users[key] = username;
            console.log(users);
          });
          return res.end("수정완료");
        }
      } else if (req.method == "DELETE") {
        if (req.url.startsWith("/user")) {
          // url : "/user/324627869"
          // [0], user : [1], 324627869 : [2]
          let urlArr = req.url.split("/");
          const key = urlArr[2];
          delete users[key];
          return res.end("삭제 완료");
        }
      }
    } catch (err) {
      console.error(err);
    }
  })
  .listen(3000, () => {
    console.log("3000 port :: ServerOn");
  });
