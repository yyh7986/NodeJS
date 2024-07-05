//Rejex_02.js

//메타 캐릭터(메타 문자) : ^ , $ , | 등의 글자로 패턴을 표현한 글자들
// | : or 의 의미로 사용, a|b은 a 또는 b의 의미

let text = "Hello World";
let result = text.match(/Hello|Crow/g);
console.log(result);

text = "Welcom Crow";
result = text.match(/Hello|Crow/g);
console.log(result);

text = "Hello World Welcom Crow";
result = text.match(/Hello|Crow/g);
console.log(result);

console.log("-----------------------------------------");
// ^ : ^abc는 abc로 시작하는 의미의 정규식([] 안에서 사용할 때는 다른 의미)
a = "Life is too short";
result = a.match(/^Life/g);
console.log(result);

// $ : abc$는 abc로 끝나는 의미의 정규식
a = "Life is too short";
result = a.match(/short$/g);
console.log(result);

console.log("-----------------------------------------");
// * \b : Word Boundary 의미로 whitesapce로 식별되는 메타 문자입니다.
// * 원래 문자열 안에 사용하는 \b 는 백스페이스의 역할을 하는 이스케이프 문자 이지만
// * 정규표현식에서는 공백을 의미하도록 사용됩니다.

console.log();

a = "no class are all classa";
b = a.match(/\bclass\b/g);
console.log(b);

a = "the declassified algrithm";
b = a.match(/\bclass\b/g);
console.log(b);

a = "one subclass is";
b = a.match(/\bclass\b/g);
console.log(b);

// \B : whitesapce(공백)이 아닌 글자들과 매칭 , 그 외 다른 글자로 구분되는 정규식

console.log("-----------------------------------------");

a = "no class are all classa";
b = a.match(/\Bclass\B/g);
console.log(b);

a = "the declassified algrithm";
b = a.match(/\Bclass\B/g);
console.log(b);

a = "one subclass is";
b = a.match(/\Bclass\B/g);
console.log(b);

console.log("-----------------------------------------");
//정방 탐색
//http://www.naver.com 에서
// 글자들이 연속되고 : 이 뒤에 붙어 있는 정규 표현 매칭
// 그런데 결과에서 : 는 빼고 나머지 글자들만 얻고자 한다면
// 결과적으로 http만 필요하다면
text = "http://www.naver.com";
result = text.match(/.+:/g); // 글자가 연속되고 뒤에 : 이 있는 매칭
console.log(result);

// 전방위 탐색
// 매칭할 글자를 앞쪽에서 검색하고 취하지 않을때
// ?<=정규식
text = "★전방위탐색";
result = text.match(/(?<=★).+/g); // 후방위 탐색 : ★로 시작되는 매칭 -> ★는 결과에 포함되지 않음
console.log(result);

// 후방위 탐색
// 매칭할 글자를 뒤쪽에서 검색하고 취하지 않을때
// ?= 정규식

// 연습문제 3
text =
  "같은 취미를 갖는 사람들과 소통합니다. #취미 #포스팅 취미를 활용하여 포스팅합니다 #소통 #SNS ";
// 해시태그 출력
result = text.match(/#[^\s#]+/g);
console.log(result);

result = text.match(/(?<=#)[^\s#]+/g);
console.log(result);
