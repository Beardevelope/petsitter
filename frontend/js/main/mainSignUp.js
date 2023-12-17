const signemail = document.querySelector("#email");
const signcareer = document.querySelector("#career");
const signname = document.querySelector("#name");
const signpassword = document.querySelector("#password");
const signrePassword = document.querySelector("#rePassword");
const signrole = document.querySelector("#signrole");
const signUpButton = document.querySelector(".signUpButton");
const careerBox = document.querySelector("#careerBox");
const nameBox = document.querySelector("#nameBox");

signrole.addEventListener("change", (event) => {
  if (`${event.target.value}` === "sitter") {
    careerBox.style.display = "block";
    nameBox.style.display = "block";
  } else if (`${event.target.value}` === "normal") {
    careerBox.style.display = "none";
    nameBox.style.display = "none";
  }
});

async function signUp() {
  try {
    const newInformation = {
      email: signemail.value,
      role: signrole.value,
      career: +signcareer.value,
      name: signname.value,
      password: signpassword.value,
      rePassword: signrePassword.value,
    };

    const response = await fetch(`http://localhost:3000/api/auth/signUp`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newInformation),
    });
    console.log(response);
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
signUpButton.addEventListener("click", () => {
  signUp();
});
