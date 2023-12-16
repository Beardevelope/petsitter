const loginEmail = document.querySelector('#loginEmail');
const loginPassword = document.querySelector('#loginPassword');
const signInButton = document.querySelector('#signInButton');
const buttontop = document.querySelector('#buttontop')
const buttonbottom = document.querySelector("#buttonbottom")
const register = document.querySelector(".register")
const logOut = document.querySelector(".logOut")

async function signIn() {
  try {
    const newInformation = {
      email: loginEmail.value,
      password: loginPassword.value,
    };

    const response = await fetch(`http://localhost:3000/api/auth/signIn`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newInformation),
    });

    const information = await response.json();
      
    if (response.status !== 200) {
      //cry catch 구문에서 throw는 에러가 발생했을 때 catch에다가 error를 던져준다.
      throw new Error(information.message);
    }
    localStorage.setItem('token', information.user.token);
    alert('로그인에 성공하였습니다.');
    window.location.reload();
    // window.location.replace('./');
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
}

// // 마우스로 클릭하여 로그인하기
// signInButton.addEventListener('DOMContentLoaded', () => {
//   signIn();
// });


// 로그아웃
async function logout() {
  localStorage.removeItem('token');
  window.location.reload();
}

// 마우스로 클릭하여 로그아웃하기
logOut.addEventListener('click', () => {
  logout();
  alert("로그아웃에 성공하였습니다.")
});




if (localStorage.getItem('token') !== null) {
  buttonbottom.style.display = 'none';
  buttontop.style.display = 'block';

} else if (localStorage.getItem('token') === null) {
  buttonbottom.style.display = 'block';
  buttontop.style.display = 'none';
}