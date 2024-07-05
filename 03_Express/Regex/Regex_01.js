//Rejex_01.js

//정규 표현식

//정규표현식은 문자표현공식, 문자탐색공식 이라고 부르는 연산식과 같은 분류언어입니다.
//전문가가 사용한 정규표현식은 초보자에게 외계언어와 같은 느낌의 어려운 식들이지만 문자탐색과 스캔에 있어 강력한 기능을 갖고있어, 여러분야에 많이 많이 사용괴도있습니다.
//자바스크립트에서도 많은 다양한 정규표현식의 적용을 지원하고 있습니다.

let a =
  "While some may view this debt forgiveness as a slap in the face to people who were responsible and paid off their student loans";

//정규표현식으로 원하는 문자 또는 데이터를 찾는 방법
//문자변수 .math (/찾고자하는 문자 또는 패턴/);
let result = a.match(/a/);
console.log(result);

result = a.match(/th/);
console.log(result);
console.log("검색 첫번째 결과 텍스트 " + result[0]); //첫번째 매칭 결과 문자
console.log("-------------------------------------------------");

// /th/g : "th"를 모두 찾아 그룹으로 얻을수 있습니다.
result = a.match(/th/g);
console.log(`검색 전체 결과 : ${result}`);

result = a.match(/a/g);
console.log(`검색 전체 결과 : ${result}`);

console.log("----------------------------------------");
//String 내용중 a로 시작하고 b가 몇개든 반복되는 글자를 검색 매칭해주세요.
a = "gabbcdrfabgrdsagfrea";
console.log(`대상 text : ${a}`);
console.log(`검색 패턴 : /ab*/g`);
result = a.match(/ab*/g);
//*: 0이상 반복 출현하는 문자 매칭
console.log(`결과 :  ${result}`);
console.log("----------------------------------------");
console.log(`대상text :  ${a}`);
console.log(`검색 패턴 : /ab+/g`);
result = a.match(/ab+/g);
//+: 한번이상 반복 출현하는 문자매칭
console.log(`결과 :  ${result}`);

console.log("----------------------------------------");
//정규표현식에 사용되는 탐색 기호들
// - []
// [] : 배열에 썼던 대괄호로 표현합니다.
// [] : 괄호 안에 검색하고자 하는 글자들을 넣고, 그 포함 유무를 판단합니다.
// [abc] : a와  b와 c가 대상 문자열 안에 하나라도 포함되었는지 판단합니다.
// [abc] 는 a또는 b 또는 C를 의미합니다.

let text = "before";
result = text.match(/[abc]/g);
console.log(result);

text = "dune";
result = text.match(/[abc]/g);
console.log(result); //매칭 결과가 없으면 결과는 null입니다.

text = "before";
result = text.match(/abc/g); //'abc' 단어를 검색
console.log(result); //매칭 결과가 없으면 결과는 null입니다.

// 활용 : 다른 글자와 조합해서 아래와 같은 검색으로 확장됩니다.
text = "grezaeagfzvrzce";
result = text.match(/z[abc]/g); //'z' 로 시작하면서 a b c 중 하나가 뒤로 이어지는 검색
console.log(result);

console.log("----------------------------------------");
//숫자를 검색하고 추출하는 경우 [0123456789] -> [0-9]
//문자(소문자) 검색 [abcdefghijklmnopqrstuvwxyz] -> [a-z]
//문자(대문자) 검색 [ABCDEFGHIJKMNOPLRSTUVWXYZ] -> [A-Z]

// [a-zA-Z] : 아바리아 기호를 제외한 대소문자
// [a-zA-Z0-9] :아라비아 기호 , 소문자, 대문자 모두 매칭
// [0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKMNOPLRSTUVWXYZ] = [a-zA-Z0-9]

//소문자 검색
text = "ABCDEFHIdsFKCVKVCBkVCBVCbbGFH";
result = text.match(/[a-z]/g);
console.log("소문자 검색 : " + result);

//숫자검색
text = "ABCDEFHIds0FKCVKVCB0kVCBVCbbGFH2";
result = text.match(/[0-9]/g);
console.log("숫자 검색 : " + result);

// [0-9] , [a-z] , [A-Z] 등과 같은 박싱으로 매칭이 가능한 표현

// [\d] : 숫자와 매치 [0-9]와 동일
// [\D] : 숫자가 아닌것과 매치 [^0-9]와 동일  - ^:다음 내용을 제외한 글자
// [\s] : whitespace 와 매치(공백) [\t\n\r\f\v]와 같은 표현
// [\S] : whitespace 가 아닌것과 매치 [^\t\n\r\f\v]와 같은 표현
// [\w] : 문자와 숫자들과 매치 [0-9a-zA-Z]와 같은 표현
// [\W] : 문자와 숫가자 아닌 것과 매치[^0-9a-zA-Z]와 같은 표현
// '^' : 대괄호 ([]) 안에서는 뒤에 쓰인 글자를 제외하라는 뜻으로, 대괄호 밖에서는 다른 의미로 사용됩니다.

console.log("----------------------------------------");
// 숫자 검색
text = "ABCDEFGHIJKLMN0PQRTUVWXY2";
result = text.match(/[\d]/g);
console.log("숫자 검색 : " + result);

//공백 검사
text = "AB CDE FGH";
result = text.match(/[\s]/g);
console.log("공백 검색 : " + result);

//글자 [문자와 숫자] 검색
text = "1%fd$#%^DGFvxc$%^&";
result = text.match(/[\w]/g);
console.log("문자와 숫자 검색 : " + result);
result = text.match(/\w+/g);
console.log("문자와 숫자 검색 /w+/ : " + result);

console.log("----------------------------------------");
//Dot(.) : 줄바꿈 글자인 '\n' 을 제외한 모든 글자와 매칭됩니다.
// a.b : a 와 b사이에 어떤 글자가 들어와도 매칭됩니다.
// a + "모든 문자" + b
text = "fdfa5bfda";
result = text.match(/a.b/g);
console.log(result);

text = "fdfa$bfda";
result = text.match(/a.b/g);
console.log(result);

text = "fdfa.bfda";
result = text.match(/a.b/g);
console.log(result);

text = "fdfabfda"; //a와 b사이에 글자가 없는 것은 매칭되지 않습니다.
result = text.match(/a.b/g);
console.log(result);

//a.b와 a[.]b 의 차이점
//[.]는 괄호안에 '\n'을 제외한 모든 문자를 표시하는게 아니라 괄호안의 '.'을 나타냄
//'a.b'는 매칭 되지만 'aab'는 매칭되지않음
text = "fdsaa.bfeds";
result = text.match(/a[.]b/g); //매칭 ok

console.log(result);

text = "fdsaatbfeds";
result = text.match(/a[.]b/g); //매칭 null
console.log(result);

console.log("-----------------------------------------");
// - '*'는 앞에 있는 글자의 반복 횟수를 0회차 부터 카운트 하여 반복된 문자열 탐색
// - '+'는 앞에 있는 글자의 반복 횟수를 1회차 부터 카운트 하여 반복된 문자열 탐색

text = "caaaat";
result = text.match(/ca*t/g);
console.log(result);

text = "caaaat";
result = text.match(/ca+t/g);
console.log(result);

text = "ct";
result = text.match(/ca*t/g);
console.log(result);

text = "ct";
result = text.match(/ca+t/g);
console.log(result);

console.log("-----------------------------------------");
// - 반복 {m,n}
//      {m} : 앞에 위치한 글자의 m회 반복 매칭
//      a{3} : a의 3회 반복
//      - 정규표현식 : 'ca{3}t'

//      {m , n} : 앞에 위치한 글자의 m회부터 n회 반복 매칭
//      a{2,5} : a의 2~5회 반복
//      - 정규표현식 : 'ca{2,5}t'

//      ? : 앞에 위치한 글자의 0회 또는 1회 반복 매칭
//      a2 : a의 0~1회 반복
//      - 정규표현식 : 'ca?'

text = "caat";
result = text.match(/ca{2}t/g);
console.log("caat - ca{2}t : ", result);

text = "caaat";
result = text.match(/ca{2}t/g);
console.log("caaat - ca{2}t : ", result);

text = "caaat";
result = text.match(/ca{2,4}t/g);
console.log("caaat - /ca{2,4}t/ : ", result);

text = "caaaaaat";
result = text.match(/ca{2,4}t/g);
console.log("caaaaaat - /ca{2,4}t/ : ", result);

text = "ct";
result = text.match(/ca?t/g);
console.log("ct - /ca?t/ : ", result);

// 아래 문자열중 이름을 제외한 전화번호만 추출해서 출력하세요.
text =
  "park chan ho 010-1234-5678 kim min kyu 010-8888-9999 lee dae ho 011-123-2222";
result = text.match(/\d{3}-\d{3,4}-\d{4}/g);
console.log(result);

// 연습문제
text =
  "현재 접속중인 외부 아이피는 110.8.6.181 이며, 내부아이피는 192.168.0.44 입니다";
// 위 text 에서 아이피주소 내부의 숫자들만 골라서 출력
result = text.match(/\w{1,3}/g);
console.log(result);

// 완벽한 아이피주소로 출력
result = text.match(/\d{1,3}[.]\d{1,3}[.]\d{1,3}[.]\d{1,3}/g);
console.log(result);

// 아래 문자열중 이름을 제외한 전화번호만 추출해서 출력하세요
text =
  "park chan ho 010-1234-5678 kim min kyu 010-8888-9999 lee dae ho 011-123-2222";
result = text.match(/\d{3}[-]\d{3,4}[-]\d{4}/g);
console.log(result);

// 이름을 제외한 이메일주소만 출력
text =
  "park chan ho park@naver.com Kim min kyu kim@daum.net Lee dae ho lee@myhome.com a@b.c";
result = text.match(/\w*@\w*/g);
console.log(result);
