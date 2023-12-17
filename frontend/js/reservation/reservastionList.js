const reservastionAPI = 'http://localhost:3000/api/reservations'
const petAPI = 'http://localhost:3000/api/pet'
const userAPI = 'http://localhost:3000/api/user'
const MOCKSITTERID = new URL (document.location.href).searchParams.get('sitterId') || 5;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUzLCJyb2xlIjoibm9ybWFsIiwiaWF0IjoxNzAyODI2NTA0LCJleHAiOjE3MDI4Njk3MDR9.RjCbg3dAi6IY-llE1nChFeZ49mUyA1XY-OcKERB1qWo';

//첫번째 회원한테 펫이 없으면은 에러 발생
//sitterId 예약 에러...
//에러 처리;

document.addEventListener("DOMContentLoaded", function () {
  const getUser = () => {
    fetch(`${userAPI}/info/me`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          throw new Error(error.message);
        })
      }
      return response.json()

    }).then(data => {
      if (data.user.role === 'sitter') throw new Error('일반 유저만 예약이 가능합니다.')
    }).catch(error => {
      console.error('예약 오류', error);
      alert(`서버 에러: ${error.message}`)
      window.location.href = 'http://127.0.0.1:5500/frontend/html/main/main.html'
    });
  }
  const getReservations = () => {
    fetch(`${reservastionAPI}/${MOCKSITTERID}?sort=asc`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          throw new Error(error.message);
        })
      }
      return response.json()

    }).then(data => {
      getPets(data)
    }).catch(error => {
      console.error('예약 오류', error);
      alert(`서버 에러: ${error.message}`)
    });
  }

  const getPets = (reservation) => {
    fetch(`${petAPI}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          throw new Error(error.message);
        })
      }
      
      return response.json()
    }).then(pets => {
      displayReservations(pets, reservation);
    }).catch(error => {
      alert(`서버 에러: ${error.message}`)
      if (error.status === 404 || error.message === '등록한 반려동물이 없습니다.') {
        window.location.href = 'http://127.0.0.1:5500/frontend/html/mypage/createpet.html'
      } 
      console.error('예약 오류', error)
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
      if (!response.ok) {
        return response.json().then(error => {
          throw new Error(error.message);
        })
      }
    }).catch(error => {
      alert(`서버 에러: ${error.message}`)
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
      if (!response.ok) {
        return response.json().then(error => {
          throw new Error(error.message);
        })
      }
    }).then(data => {
      console.log('예약 취소 성공');
      alert('예약을 취소하셨습니다.');
      getReservations();
    }).catch(error => {
      alert(`서버 에러: ${error.message}`)
      console.error('예약 오류', error)
    });
  }

  function displayReservations(pets, reservations) {
    let isEventRunning = false;

    function displayPetModal(pets, date) {
      const modal = createPetModal(pets.data);
      modal.style.display = "block";

      modal.addEventListener("click", function (event) {
        const selectedPetId = event.target.dataset.petId;
        if (selectedPetId) {
          createReservation({
            petId: +selectedPetId,
            reservationDate: date,
            sitterId: +MOCKSITTERID
          });
        } else {
          console.log(isEventRunning)
          isEventRunning = false
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
    console.log(isEventRunning)
    tableBody.addEventListener("click", function (event) {
      const clickedCell = event.target.closest("td");
      if (!isEventRunning) {

        const availability = (clickedCell.textContent)
        console.log(availability)

        const date = clickedCell.parentElement.cells[0].textContent;

        const reservation = reservations.find((r) => r.reservationDate === date);
        console.log(clickedCell)
        if (clickedCell) {
          if (!reservation && availability === '예약') {
            console.log('예약')
            isEventRunning = true;

            displayPetModal(pets, date)
          }
          if (reservation && availability === 'cancel') {
            const isConfirmed = confirm("예약을 취소하시겠습니까?");
            if (isConfirmed) {
              isEventRunning = true;

              deleteReservation(reservation.reservationId)
            } else {
              isEventRunning = false
            }
          }
        }
      }
    });
  }
  getUser()
  getReservations();
});
