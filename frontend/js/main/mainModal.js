// 모달 요소 가져오기
let modal = document.getElementById("myModal");

// 모달 열기 버튼 가져오기
let btn = document.querySelector(".modal-button");

// 모달 닫기 버튼 가져오기
let span = document.getElementsByClassName("close")[0];

// 버튼 클릭 시 모달 열기
function openModal() {
  modal.style.display = "block";
}

// 닫기 버튼 클릭 시 모달 닫기
function closeModal() {
  modal.style.display = "none";
  window.location.reload();
}

// 모달 외부 클릭 시 모달 닫기
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    window.location.reload();
  }
};