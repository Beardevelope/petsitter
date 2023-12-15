const loginEmail = document.querySelector('#loginEmail');
const loginPassword = document.querySelector('#loginPassword');
const postBtn = document.querySelector('#postBtn');


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
    // window.location.replace('./');
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
}

// 마우스로 클릭하여 로그인하기
postBtn.addEventListener('click', () => {
  signIn();
});

async function logout() {
  localStorage.removeItem('token');
}

// // 마우스로 클릭하여 로그아웃하기
// postBtn.addEventListener('click', () => {
//   logout();
// });
