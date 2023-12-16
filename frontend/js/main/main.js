const input = document.querySelector('.searchInput')
const searchBtn = document.querySelector('.searchBtn')
const list = document.querySelector(".list");


let sitter = [];
let email = [];
// 포스터 붙이기
async function movieList() {
  try {
    const response = await fetch("http://localhost:3000/api/user", {
      accept: "application/json",
    });
    const jsonData = await response.json();
    console.log(jsonData);
    let result = jsonData["users"];

    result.forEach((num) => {
      sitter.push(num);
      email.push(num["email"]);

      // 시터 목록 출력 함수 실행 --> 79번째 줄
      attach(num);
    });

    // ID값 출력 함수 실행 --> 95번째 줄
    ID();
  } catch (error) {
    console.log(error.message);
    alert(error.message);
  }
}
movieList();

// 엔터키로 검색하기
function onClick() {
  // sitterSearch 함수와 list를 실행시키는 함수를 실행 --> 105번째 줄
  add();
}

// 마우스로 클릭하여 검색하기
searchBtn.addEventListener("click", () => {
  // sitterSearch 함수와 list를 실행시키는 함수를 실행 --> 105번째 줄
  add();
});

// 검색 인풋으로 관련 영화 출력하기
function sitterSearch(userInput) {
  list.innerHTML = ``;
  sitter.forEach(function (info) {
    if (info["email"].toLowerCase().includes(userInput.toLowerCase())) {
      // 영화 목록 출력 함수 실행 --> 79번째 줄
      attach(info);
    }
  });
  // ID값 출력 함수 실행 --> 95번째 줄
  ID();
}

// 시터 목록 출력
function attach(info) {
  let image = `<tr class ="col" id="${info["userId"]}">
                  <td>${info["userId"]}</td>
                  <td>${info["email"]}</td>
                  <td>${info["name"]}</td>
                  <td>${info["career"]}</td>
                  <td><button class="go">gogo</button></td>
                </tr>`;

                  
  list.innerHTML += `${image}`;
}

// 검색 후 ID값 출력
function ID() {
  const col = document.querySelectorAll(".col");
  col.forEach(function (col) {
    col.addEventListener("click", function () {
      alert("id: " + this.id);
    });
  });
}

//  sitterSearch 함수와 list를 실행시키는 함수
function add() {
  sitterSearch(input.value);
}
