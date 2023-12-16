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
        //cry catch 구문에서 throw는 에러가 발생했을 때 catch에다가 error를 던져준다.
        throw new Error(information.message);
      }
      addInfo(information);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  }
  getInfomationFromServer();
  
  // 홈페이지에 나의 정보를 볼 수 있게 해주는 함수
  function addInfo(info) {
    if(info.user.role === 'sitter') {
        const html =`
                <h2>프로필 정보</h2>
                <p>Email: ${info.user.email}</p>
                <p>Role: ${info.user.role}</p>
                <p>Career: ${info.user.career}</p>
                <p>Name: ${info.user.name}</p>`;
        const infoList = document.querySelector('.profile-card');
        infoList.innerHTML = html;
    } else if (info.user.role === 'normal') {
      const html =`
                <h2>프로필 정보</h2>
                <p>Email: ${info.user.email}</p>
                <p>Role: ${info.user.role}</p>`;
        const infoList = document.querySelector('.profile-card');
        infoList.innerHTML = html;
    }
   
  }