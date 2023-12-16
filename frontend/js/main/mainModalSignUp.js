// 모달 요소 가져오기
let signUpmodal = document.getElementById("signUpmodal");

// 모달 열기 버튼 가져오기
let signUpbtn = document.querySelector(".register");

// 모달 닫기 버튼 가져오기
let signUpspan = document.getElementsByClassName("signUpclose")[0];

// 버튼 클릭 시 모달 열기
function signUpopenModal() {
    signUpmodal.style.display = "block";
}

// 닫기 버튼 클릭 시 모달 닫기
function signUpcloseModal() {
    signUpmodal.style.display = "none";
  window.location.reload();
}

// 모달 외부 클릭 시 모달 닫기
window.onclick = function (event) {
  if (event.target == signUpmodal) {
    signUpmodal.style.display = "none";
    window.location.reload();
  }
};