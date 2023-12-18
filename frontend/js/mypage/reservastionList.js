const reservastionAPI = 'http://localhost:3000/api/reservations'
const petAPI = 'http://localhost:3000/api/pet'
const userAPI = 'http://localhost:3000/api/user'
const MOCKSITTERID = new URL(document.location.href).searchParams.get('sitterId')
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
const review_table = document.getElementById('review-list')
let role = null

document.addEventListener("DOMContentLoaded", function () {
  const getUser = async () => {
    await fetch(`${userAPI}/info/me`, {
      method: "GET",
      headers: myHeaders,
    }).then(async response => {
      const information = await response.json();
      if (!response.ok) {
        return response.json().then(error => {
          throw new Error(error.message);
        })
      }
      role = information.user.role

    }).catch(error => {
      alert(`서버 에러: ${error.message}`)
      location.href = '../../html/main/main.html'
    });
    await fetch('http://localhost:3000/api/review/sitter', {
      method: "GET",
      headers: myHeaders,
      body: JSON.stringify({
        sitterId: MOCKSITTERID
      })
    }).then(response =>
      response.json())
      .then(result =>
        result.data.forEach((review) => {
          review_table.innerHTML += `
          <li>${review.review}</li>
          `
        }),
        document.getElementById('notReview').style.display = 'none',
      )
      .catch(error =>
        console.log(error.message)

      );

  };
  const getReservations = () => {
    fetch(`${reservastionAPI}/${MOCKSITTERID}?sort=asc`, {
      method: "GET",
      headers: myHeaders
    }).then(response => {
      if (!response.ok) throw new Error('http 오류');
      return response.json()
    }).then(data => {
      getPets(data)
    }).catch(error => {
      console.error('예약 오류', error);
      if (!MOCKSITTERID) {
        alert('시터를 먼저 선택해주세요.');
        window.location.href = 'http://127.0.0.1:5500/frontend/html/main/main.html';
        return
      }
      alert('예약 불러오기 실패')
    })
  }

  const getPets = (reservation) => {
    fetch(`${petAPI}`, {
      method: "GET",
      headers: myHeaders
    }).then(response => {
      const checkPetExist = () => {
        if (!response.ok) {
          return response.json().then(error => {
            throw new Error(error.message);
          })
        }
      }
      return response.json()
    }).then(pets => {
      displayReservations(pets, reservation);
    }).catch(error => {
      alert(`서버 에러: ${error.message}`)
      console.error('예약 오류', error)
    })
    return reservation
  }

  const createReservation = (data) => {
    console.log(data)
    fetch(reservastionAPI, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
    }).then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          throw new Error(error.message);
        })
      }
    }).then(data => {
      alert('예약을 하셨습니다.');
      getReservations()
    }).catch(error => {
      alert(`서버 에러: ${error.message}`)
      console.error('예약 오류', error)
    })
  }

  const deleteReservation = (reservationId) => {
    fetch(`${reservastionAPI}/${reservationId}`, {
      method: "DELETE",
      headers: myHeaders
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
      alert(`서버 에러:${error.status} ${error.message}`)
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
      console.log(pets)
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
    tableBody.addEventListener("click", function (event) {
      const clickedCell = event.target.closest("td");
      if (!isEventRunning) {
        const availability = (clickedCell.textContent)
        const date = clickedCell.parentElement.cells[0].textContent;
        const reservation = reservations.find((r) => r.reservationDate === date);
        if (clickedCell) {
          if (!reservation && availability === '예약') {
            isEventRunning = true;
            if (role === "sitter") {
              alert('일반유저만 예약이 가능합니다.')
              return isEventRunning = false
            }
            if (pets.data.length <= 0) {
              alert('등록된 펫이 없습니다.');
              const isConfirmed = confirm('반려동물 등록 페이지로 이동하시겠습니까?');

              if (isConfirmed) window.location.href = '../../html/mypage/petInfo.html';
              return isEventRunning = false
            }
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
  getUser();
  getReservations();
});
