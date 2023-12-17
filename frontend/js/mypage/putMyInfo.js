// 시터 정보수정
async function putInfomation() {
    const name = document.querySelector('#name');
    const career = document.querySelector('#career');
    const password = document.querySelector('#password');
    const confirm = document.querySelector('#confirm');
    const putBtn = document.querySelector('#putBtn');
    
    try {
      const newInformation = {
        name: name.value,
        career: career.value,
        password: password.value
      };
      const response = await fetch(
        `http://localhost:3000/api/user/info/me`,
        {
          method: 'put',
          headers: {
             Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newInformation),
        },
      );
      const information = await response.json();
      if (response.status !== 200) {
        //cry catch 구문에서 throw는 에러가 발생했을 때 catch에다가 error를 던져준다.
        throw new Error(information.message);
      }
      addInfo(information);
      alert(`${information.message}`);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
      alert(error.message);
      name.value = '';
      career.value = '';
      password.value = '';
      confirm.value = '';
    }
  }

// 마우스로 클릭하여 정보수정완료하기
putBtn.addEventListener('click', () => {
  putInfomation();
});