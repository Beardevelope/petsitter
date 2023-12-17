const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
const userName = document.getElementById('name');
const userCareer = document.getElementById('career');
const password = document.getElementById('password');
const passwordCheck = document.getElementById('passwordCheck')
const getAPI = {
  method: 'GET',
  headers: myHeaders
};
fetch("http://localhost:3000/api/user/info/me", getAPI)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(result => {
    if (result.user.role !== 'sitter') {
      document.getElementById('name').style.display = 'none';
      document.getElementById('nameLabel').style.display = 'none';
      document.getElementById('career').style.display = 'none';
      document.getElementById('careerLabel').style.display = 'none';
    }
    inputValue(result)
  })
  .catch(error => {
    console.error('Error:', error.message);
  });

function inputValue(result) {
  if (result.user.role === 'sitter') {
    userName.value = result.user.name;
    userCareer.value = result.user.career;
  }
}

async function putInfomation() {
  try {
    const newInformation = {
      name: userName.value,
      career: userCareer.value,
      password: password.value,
      passwordCheck: passwordCheck.value,
    };
    const response = await fetch(
      `http://localhost:3000/api/user/info/me`,
      {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(newInformation),
      },
    );

    const information = await response.json();
    alert(information.message);
    if (response.status === 200) {
      location.href = "../../html/mypage/mypage.html";
    }
  } catch (error) {
    alert(error.message);
  }
}