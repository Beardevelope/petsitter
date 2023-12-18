const reservastionAPI = 'http://localhost:3000/api/reservations'
const userAPI = 'http://localhost:3000/api/user'
const table = document.getElementById('reservationTable')
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

document.addEventListener("DOMContentLoaded", function () {
    const getUser = async () => {
        await fetch(`${reservastionAPI}`, {
            method: "GET",
            headers: myHeaders
        }).then(async response => {
            const information = await response.json();
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.message);
                })
            }
            setReservation(information.data)
        }).catch(error => {
            alert(`서버 에러: ${error.message}`)
            location.href = '../../html/main/main.html'
        });
    };
    var tableCardHeight = $('.table-card').height();
    $('.reveiw-card').height(tableCardHeight);

    getUser()
});

function setReservation(reservation) {
    reservation.forEach(reservation => {
        table.innerHTML += `
            <tr>
        <td>${reservation.reservationDate}</td>
        <td>${reservation.pets.petName}</td>
        <td>${reservation.pets.petType}</td>
        <td>
          <div class="button-container">
            <button class="button" onclick = "deleteReservation('${reservation.reservationId}')">예약취소</button>
          </div>
        </td>
      </tr>
            `
    })
}

async function deleteReservation(reservationId) {
    console.log(reservationId)

    fetch(
        `${reservastionAPI}/${reservationId}`,
        {
            method: 'DELETE',
            headers: myHeaders,
        },
    ).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
            alert('예약을 삭제하였습니다.')
            location.reload();
        }

    }).catch(error => {
        console.error('Error:', error.message);
    });
}