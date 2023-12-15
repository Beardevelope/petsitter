const email = document.querySelector("#email");
const career = document.querySelector("#career");
const name = document.querySelector("#name");
const password = document.querySelector("#password");
const rePassword = document.querySelector("#rePassword");
const role = document.querySelector("#role");
const start = document.querySelector(".start");
const careerBox = document.querySelector("#careerBox");
const nameBox = document.querySelector("#nameBox");


role.addEventListener("change", (event) => {
   if(`${event.target.value}`=== 'sitter') {
    careerBox.style.display = 'block'
    nameBox.style.display = 'block'
   } else if (`${event.target.value}`=== 'normal') {
    careerBox.style.display = 'none'
    nameBox.style.display = 'none'
   }
});


async function signUp() {
  try {
    const newInformation = {
      email: email.value,
      role: role.value,
      career: +career.value,
      name: name.value,
      password: password.value,
      rePassword: rePassword.value,
    };

    const response = await fetch(`http://localhost:3000/api/auth/signUp`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newInformation),
    });

    const information = await response.json();

    if (response.status !== 201) {
      //cry catch 구문에서 throw는 에러가 발생했을 때 catch에다가 error를 던져준다.
      throw new Error(information.message);
    }
    alert("회원가입에 성공하였습니다.");
    window.location.reload();
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
}


// 마우스로 클릭하여 회원가입하기
start.addEventListener("click", () => {
  signUp();
});
