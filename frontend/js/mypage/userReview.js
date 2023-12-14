document.addEventListener('DOMContentLoaded', async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJhc2RmQGRmLmNvbSIsImlhdCI6MTcwMjUwNDc2OCwiZXhwIjoxNzAzMTA5NTY4fQ.XT7DoLJrI7xPjyZfQbsEEaUy4wG7q_yfRdA4Dhmi_dI");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    let review = null;
    let reservation = null;

    fetch("http://localhost:3000/api/review/myPage", requestOptions)
        .then(response => response.json()) // 'json()'로 수정
        .then(result => review = result)
        .catch(error => console.log('error', error));
    fetch("http://localhost:3000/api/reservations/myPage", requestOptions)
        .then(response => response.json()) // 'json()'로 수정
        .then(result => reservation = result)
        .catch(error => console.log('error', error));

})
