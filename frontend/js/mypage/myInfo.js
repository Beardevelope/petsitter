// 정보조회
async function getInfomationFromServer() {
  try {
    const response = await fetch(
      `http://localhost:3000/api/user/info/me`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        accept: "application/json",
      },
    );
    const information = await response.json();
    if (response.status !== 200) {
      throw new Error(information.message);
    }
    addInfo(information);
  } catch (error) {
    alert(error.message);
  }
}
getInfomationFromServer();
// 홈페이지에 나의 정보를 볼 수 있게 해주는 함수
function addInfo(info) {
  document.getElementById('email').innerText += info.user.email;
  document.getElementById('role').innerText += info.user.role;
  if (info.user.role === 'sitter') {
    document.getElementById('name').innerText += info.user.name;
    document.getElementById('carrer').innerText += info.user.career;
  }
}