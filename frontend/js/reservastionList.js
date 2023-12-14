// script.js

document.addEventListener("DOMContentLoaded", function () {
  // 예약 리스트를 가져오는 함수
  function fetchReservations() {
    // 여기에 백엔드 API 호출 및 데이터 가져오는 로직을 추가하세요.
    // 예를 들면, fetch() 함수를 사용할 수 있습니다.

    // 가상의 데이터 예제
    const mockData = [
      { date: "2023-01-01", isAvailable: true },
      { date: "2023-01-02", isAvailable: false },
      // 추가적인 데이터
    ];

    displayReservations(mockData);
  }

  // 테이블에 예약 리스트를 표시하는 함수
  function displayReservations(reservations) {
    const tableBody = document.querySelector("#reservationTable tbody");

    // 기존 테이블 내용 비우기
    tableBody.innerHTML = "";

    // 예약 리스트를 테이블에 추가
    reservations.forEach((reservation) => {
      const row = tableBody.insertRow();
      const cellDate = row.insertCell(0);
      const cellAvailability = row.insertCell(1);

      cellDate.textContent = reservation.date;
      cellAvailability.textContent = reservation.isAvailable ? "예약 가능" : "예약 불가능";
    });
  }

  // 페이지 로드 시 예약 리스트 가져오기
  fetchReservations();
});
