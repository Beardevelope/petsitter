const apiUrl = 'http://localhost:3000/api/reservations'
const MOCKSITTERID = 1;
const MOCKPETID = 1;
document.addEventListener("DOMContentLoaded", function () {  
  function getReservations() {
    fetch(`${apiUrl}?sort=asc`).then(response => {
      if (!response.ok) throw new Error('http 오류');
      return response.json()
    }).then(data => {
      displayReservations(data)
    })
  }

  const createReservations = (data) => {

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mockData),
    }).then(response => {
      if (!response.ok) throw new Error('http 오류 ${response}');
      return response.json();
    }).then(data => {
      console.log('예약 성공')
    }).catch(error => {
      console.error('예약 오류', error)
    })
  }

  const deleteReservations = (reservationId) => {
    fetch((`${apiUrl}/${reservationId}`).then(response => {
      if (!response.ok) throw new Error('http 오류 ${response}');
      return response.json();
    }).then(data => {
      console.log('예약 성공')
    }).catch(error => {
      console.error('예약 오류', error)
    }));
  }

  function displayReservations(reservations) {
    const tableBody = document.querySelector("#reservationTable tbody");

    tableBody.innerHTML = "";

    const today = new Date();

    const thirtyDaysLater = new Date(today);
    thirtyDaysLater.setDate(today.getDate() + 30);

    function formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    for (let date = new Date(today); date <= thirtyDaysLater; date.setDate(date.getDate() + 1)) {
      const row = tableBody.insertRow();
      const cellDate = row.insertCell(0);
      const cellAvailability = row.insertCell(1);

      const formattedDate = formatDate(date);
      const reservation = reservations.find((r) => r.reservationDate === formattedDate);
      cellDate.textContent = formattedDate
      cellAvailability.textContent = reservation ? 'cancel' : "예약";
    }

    tableBody.addEventListener("click", function (event) {
      const clickedCell = event.target.closest("td");

      if (clickedCell) {
        const date = clickedCell.parentElement.cells[0].textContent;
        console.log(date)
        const reservation = reservations.find((r) => r.reservationDate === date);
        if (!reservation) {
          createReservations({
            petId: MOCKPETID,  
            reservationDate: date,  
            sitterId: MOCKSITTERID
          });
        }
      }
    });
  }
  getReservations();
});
