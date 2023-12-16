// 모달 요소 가져오기
let logInmodal = document.getElementById("logInmodal");

// 모달 열기 버튼 가져오기
let logInbtn = document.querySelector(".login");

// 모달 닫기 버튼 가져오기
let logInspan = document.getElementsByClassName("logInclose")[0];

// 버튼 클릭 시 모달 열기
function logInopenModal() {
    logInmodal.style.display = "block";
}

// 닫기 버튼 클릭 시 모달 닫기
function logIncloseModal() {
    logInmodal.style.display = "none";
  window.location.reload();
}

// 모달 외부 클릭 시 모달 닫기
window.onclick = function (event) {
  if (event.target == logInmodal) {
    logInmodal.style.display = "none";
    window.location.reload();
  }
};