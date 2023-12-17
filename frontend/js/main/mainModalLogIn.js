// 모달 요소 가져오기
let logInmodal = document.getElementById("logInmodal");

// 모달 열기 버튼 가져오기
let logInbtn = document.querySelector(".login");

// 모달 닫기 버튼 가져오기
let logInspan = document.getElementsByClassName("logInclose")[0];

// 버튼 클릭 시 모달 열기
function logInopenModal() {
    logInmodal.style.display = "block";
    signUpmodal.style.display = "none";
}

function logIncloseModal() {
  // 닫기 버튼 클릭 시 모달 닫기
    logInmodal.style.display = "none";
  window.location.reload();
}

// ESC 키를 눌렀을 때 모달 닫기
window.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    logInmodal.style.display = 'none';
  }
});