const getAllReservations = async () => {
    const apiUrl = 'http://localhost:3000/api/reservations';

    try {
      const response = await fetch(`${apiUrl}?sort=asc`);
      const reservations = await response.json();

      populateTable(reservations);
    } catch (error) {
      console.error('서버 오류', error);
    }
  };

  const populateTable = (reservations) => {
    const tableBody = document.querySelector('#reservationTable tbody');

    reservations.forEach(reservation => {
      const row = tableBody.insertRow();
      const dateCell = row.insertCell(0);
      const availabilityCell = row.insertCell(1);

      dateCell.textContent = reservation.reservationDate;

      if (!reservation.reservationDate) {
        availabilityCell.textContent = '예약 가능';
      } else {
        availabilityCell.textContent = '예약 불가능';
      }
    });
  };
  
  window.onload = getAllReservations;