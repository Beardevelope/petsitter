
const reservastionAPI = 'http://localhost:3000/api/reservations'
const petAPI = 'http://localhost:3000/api/pet'
const MOCKSITTERID = 1;
const MOCKPETID = 1;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3LCJpYXQiOjE3MDI2NTg5NzYsImV4cCI6MTcwMjcwMjE3Nn0.WZKWUFI3H8zsc4BP9r8v2qTKGI2nlTScm6yI9Mgw7TY'

document.addEventListener("DOMContentLoaded", function () {
  function getReservations() {
    fetch(`${reservastionAPI}/${MOCKSITTERID}?sort=asc`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(response => {
      if (!response.ok) throw new Error('http 오류');
      return response.json()
    }).then(data => {
      displayReservations(data)
    })
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
      if (!response.ok) throw new Error('http 오류 ${response}');
      return response.json();
    }).then(data => {
      console.log('예약 취소 성공');
      alert('예약을 취소하셨습니다.')
      getReservations()
    }).catch(error => {
      console.error('예약 오류', error)
    });
  }

  const getPet = (date) => {
    fetch(`${petAPI}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(response => {
      if (!response.ok) throw new Error('http 오류');
      return response.json()
    }).then(pets => {
      displayPetModal(pets, date)
    }).catch(error => {
      console.error('예약 오류', error)
    })
  }


  function displayPetModal(pets, date) {
    const modal = createPetModal(pets.data);            // 모달 열기
    modal.style.display = "block";

    // 사용자가 Pet을 선택한 경우
    modal.addEventListener("click", function (event) {
      console.log(event.target)
      const selectedPetId = event.target.dataset.petId;
      // 3. 예약 API 호출 (이 부분은 사용자가 Pet을 선택한 후 실행되어야 함)
      if (selectedPetId) {
        createReservation({
          petId: +selectedPetId,
          reservationDate: date,
          sitterId: MOCKSITTERID
          // ... 다른 필요한 예약 정보들
        });
      }

      // 모달 닫기
      modal.style.display = "none";
    });

    // 모달 영역 외부 클릭 시 모달 닫기
    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }
  // 모달 생성 함수
  function createPetModal(pets) {
    const modal = document.createElement("div");
    modal.classList.add("modal");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    pets.forEach(pet => {
      const petButton = document.createElement("button");
      petButton.textContent = pet.petName;
      console.log(pet)
      console.log(pet.petName)
      petButton.dataset.petId = pet.petId;
      console.log(pet.petId)
      petButton.classList.add("pet-button");
      modalContent.appendChild(petButton);
    });

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    return modal;
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
      const availability = (clickedCell.textContent)
      const date = clickedCell.parentElement.cells[0].textContent;

      const reservation = reservations.find((r) => r.reservationDate === date);
      if (clickedCell) {
        if (!reservation) {
          getPet(date)

        }
        if (reservation && availability === 'cancel') {
          const isConfirmed = confirm("예약을 취소하시겠습니까?");
          if (isConfirmed) deleteReservation(reservation.reservationId)
        }
      }


    });
  }
  getReservations();

});