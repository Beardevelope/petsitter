
const reservastionAPI = 'http://localhost:3000/api/reservations'
const petAPI = 'http://localhost:3000/api/pet'
const MOCKSITTERID = 1;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3LCJpYXQiOjE3MDI3MTM3MTgsImV4cCI6MTcwMjc1NjkxOH0.SamRN1dCL8dtzdIPxRsLRTYmI73OrQCsb6lSEyuc8O0'

document.addEventListener("DOMContentLoaded", function () {
  const getReservations = () => {
    fetch(`${reservastionAPI}/${MOCKSITTERID}?sort=asc`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(response => {
      if (!response.ok) throw new Error('http 오류');
      return response.json()
    }).then(data => {
      getPets(data)
    }).catch(error => {
      console.error('예약 오류', error);
      alert('예약 불러오기 실패.')
    })
  }

  const getPets = (reservation) => {
    fetch(`${petAPI}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(response => {
      if (!response.ok) throw new Error('http 오류');
      return response.json()
    }).then(pets => {
      displayReservations(pets, reservation);
    }).catch(error => {
      console.error('예약 오류', error)
    })
  }


  function displayPetModal(pets, date) {
    const modal = createPetModal(pets.data);
    modal.style.display = "block";

    modal.addEventListener("click", function (event) {
      const selectedPetId = event.target.dataset.petId;
      if (selectedPetId) {
        createReservation({
          petId: +selectedPetId,
          reservationDate: date,
          sitterId: MOCKSITTERID
        });
      }
      modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  function createPetModal(pets) {
    const modal = document.createElement("div");
    modal.classList.add("modal");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    pets.forEach(pet => {
      const petButton = document.createElement("button");
      petButton.textContent = pet.petName;

      petButton.dataset.petId = pet.petId;
      petButton.classList.add("pet-button");
      modalContent.appendChild(petButton);
    });

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    return modal;
  }

  const createReservation = (data) => {

    fetch(reservastionAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then(response => {
      if (!response.ok) throw new Error('http 오류 ${response}');
      return response.json();
    }).then(data => {
      console.log('예약 성공');
      alert('예약을 하셨습니다.')
      getReservations()
    }).catch(error => {
      console.error('예약 오류', error)
    })
  }

  const deleteReservation = (reservationId) => {
    fetch(`${reservastionAPI}/${reservationId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    }).then(response => {
      if (!response.ok) throw new Error(`http 오류 ${response}`);
      return response.json();
    }).then(data => {
      console.log('예약 취소 성공');
      alert('예약을 취소하셨습니다.');
      getReservations();
    }).catch(error => {
      console.error('예약 오류', error)
    });
  }



  function displayReservations(pets, reservations) {
    const tableBody = document.querySelector("#reservationTable tbody")

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
      if (reservation) {
        const reservatedBySomeone = pets.data.find((pet) => pet.petId === reservation.petId)
        cellAvailability.textContent = reservatedBySomeone ? 'cancel' : '이미 누군가가 예약했습니다.'
      } else {
        cellAvailability.textContent = "예약"
      }
      cellDate.textContent = formattedDate
    }

    /**날짜 고르기 동작*/
    let isEventRunning = false  /**이벤트 중복 방지, 이것 때문에 한참 해맸네 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ*/

    tableBody.addEventListener("click", function (event) {
      if (!isEventRunning) {

        isEventRunning = true;
        console.log(isEventRunning)

        const clickedCell = event.target.closest("td");
        const availability = (clickedCell.textContent)
        const date = clickedCell.parentElement.cells[0].textContent;

        const reservation = reservations.find((r) => r.reservationDate === date);
        if (clickedCell) {
          if (!reservation && availability === '예약') {
            displayPetModal(pets, date)
          }
          if (reservation && availability === 'cancel') {
            const isConfirmed = confirm("예약을 취소하시겠습니까?");
            if (isConfirmed) {
              deleteReservation(reservation.reservationId)
            }
          }
        }
      }
    });
  }
  getReservations();

});
