const table = document.querySelector('.chart-table');

// 함수를 만들어 데이터를 처리하고 테이블에 추가하는 부분을 분리합니다.
function processReviewData(data) {
  // Create header row
  const headerRow = document.createElement('tr');
  headerRow.setAttribute('bgcolor', 'skyblue');
  headerRow.setAttribute('align', 'center');

  // Add header cells
  const headerDateCell = document.createElement('td');
  headerDateCell.textContent = '날짜';
  headerRow.appendChild(headerDateCell);

  const headerReviewCell = document.createElement('td');
  headerReviewCell.textContent = '리뷰';
  headerRow.appendChild(headerReviewCell);

  // Append header row to the table
  table.appendChild(headerRow);

  // Loop through the data and create rows
  data.forEach((item) => {
    const row = document.createElement('tr');
    const dateCell = document.createElement('td');
    const reviewCell = document.createElement('td');

    // Set the content of the cells
    dateCell.textContent = item.reservationDate;
    reviewCell.textContent = item.review || '리뷰를 작성해주세요';

    // Append cells to the row
    row.appendChild(dateCell);
    row.appendChild(reviewCell);

    // Append the row to the table
    table.appendChild(row);
  });
}

var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append(
  'Authorization',
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJhc2RmQGRmLmNvbSIsImlhdCI6MTcwMjUwNDc2OCwiZXhwIjoxNzAzMTA5NTY4fQ.XT7DoLJrI7xPjyZfQbsEEaUy4wG7q_yfRdA4Dhmi_dI'
);
// Define requestOptions before using it in the fetch function
const requestOptions = {
  method: 'GET', // or 'POST' or other HTTP methods
  headers: myHeaders,
  // Add other options like body if needed
};

// Fetch data from the server
fetch('http://localhost:3000/api/review/myPage', requestOptions)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((result) => {
    if (result.success) {
      // If successful, process and display the data
      const data = result.data;
      processReviewData(data);
    } else {
      // If unsuccessful, log the error message
      console.error(result.message);
    }
  })
  .catch((error) => {
    // Handle network errors or exceptions during the fetch
    console.error('Error:', error.message);
  });
