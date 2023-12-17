// 모달 요소 가져오기
let signUpmodal = document.getElementById("signUpmodal");
let signUpmodalContent = document.querySelector('.signUpmodal-content')

// 모달 열기 버튼 가져오기
let signUpbtn = document.querySelector(".register");

// 모달 닫기 버튼 가져오기
let signUpspan = document.getElementsByClassName("signUpclose")[0];

// 버튼 클릭 시 모달 열기
function signUpopenModal() {
    signUpmodal.style.display = "block";
    logInmodal.style.display = "none";
}

// 닫기 버튼 클릭 시 모달 닫기
function signUpcloseModal() {
    signUpmodal.style.display = "none";
  window.location.reload();
}

// ESC 키를 눌렀을 때 모달 닫기
window.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    signUpmodal.style.display = 'none';
  }
});