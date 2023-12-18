const logOut = document.querySelector(".logOut")

// 로그아웃
async function logout() {
    localStorage.removeItem('token');
    location.href = '../../html/main/main.html'
}

// 마우스로 클릭하여 로그아웃하기
logOut.addEventListener('click', () => {
    logout();
    alert("로그아웃에 성공하였습니다.")
});