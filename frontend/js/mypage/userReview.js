const table = document.querySelector('.chart-table');

// 함수를 만들어 데이터를 처리하고 테이블에 추가하는 부분을 분리합니다.
function processReviewData(data) {
    // Create header row
    const headerRow = document.createElement('tr');
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
    data.forEach(item => {


        const row = document.createElement('tr');
        const dateCell = document.createElement('td');

        const reviewCell = document.createElement('td');

        // Set the content of the cells
        dateCell.textContent = item.reservationDate;
        reviewCell.textContent = item.review || '리뷰를 작성해주세요';
        reviewCell.id = item.reservationId

        // Append cells to the row
        row.appendChild(dateCell);
        row.appendChild(reviewCell);

        // Append the row to the table
        table.appendChild(row);

        // Add event listener for the reviewCell
        reviewCell.addEventListener('click', function () {
            // Show the modal and pass the review content
            showReviewModal(reviewCell.textContent, reviewCell.id);
        });
    });
}

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJhc2RmQGRmLmNvbSIsImlhdCI6MTcwMjUwNDc2OCwiZXhwIjoxNzAzMTA5NTY4fQ.XT7DoLJrI7xPjyZfQbsEEaUy4wG7q_yfRdA4Dhmi_dI");

const requestOptions = {
    method: 'GET',
    headers: myHeaders
};

fetch("http://localhost:3000/api/review/myPage", requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(result => {
        if (result.success) {
            const data = result.data;
            processReviewData(data);
        } else {
            console.error(result.message);
        }
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
function showReviewModal(reviewContent, reservationId) {
    const modal = document.getElementById('reviewModal');
    const reviewTextArea = document.getElementById('reviewTextArea');
    let reviewAdd = document.getElementById('add')
    let reviewDelete = document.getElementById('delete')

    if (reviewContent != "리뷰를 작성해주세요") {
        reviewAdd.innerText = "수정하기"
        reviewAdd.addEventListener('click', () =>
            updateReview()
        )
        reviewDelete.style.visibility = 'visible';
    } else {
        reviewAdd.innerText = "생성하기"
        reviewAdd.addEventListener('click', () =>
            createReview()
        )
        reviewDelete.style.visibility = 'hidden';
    }
    reviewTextArea.value = reviewContent;
    reviewTextArea.class = reservationId;
    modal.style.display = 'flex';
}

//리뷰 수정
function updateReview() {
    const modal = document.getElementById('reviewModal');
    const reviewTextArea = document.getElementById('reviewTextArea');
    let reviewContent = reviewTextArea.value;
    const reservationClass = reviewTextArea.class;

    const createReviewURL = 'http://localhost:3000/api/review';
    const createReviewOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify({
            content: reviewContent,
            reservationId: reservationClass
        })
    };

    fetch(createReviewURL, createReviewOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            if (result.success) {
                modal.style.display = 'none';
                reviewContent = result.data.content
                document.getElementById(reservationClass).innerText = reviewContent
            } else {
                console.error(result.message);
            }
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
}
// Function to create review
function createReview() {
    const modal = document.getElementById('reviewModal');
    const reviewTextArea = document.getElementById('reviewTextArea');
    const reviewContent = reviewTextArea.value;
    const reservationClass = reviewTextArea.class;

    const createReviewURL = 'http://localhost:3000/api/review';
    const createReviewOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
            content: reviewContent,
            reservationId: reservationClass
        })
    };

    fetch(createReviewURL, createReviewOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            if (result.success) {
                modal.style.display = 'none';
                document.getElementById(reservationClass).innerText = reviewContent
            } else {
                console.error(result.message);
            }
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
}

function deleteReview() {
    const modal = document.getElementById('reviewModal');
    const reviewTextArea = document.getElementById('reviewTextArea');
    const reservationClass = reviewTextArea.class;

    const createReviewURL = 'http://localhost:3000/api/review';
    const createReviewOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: JSON.stringify({
            reservationId: reservationClass
        })
    };

    fetch(createReviewURL, createReviewOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            if (result.success) {
                modal.style.display = 'none';
                document.getElementById(reservationClass).innerText = '리뷰를 작성해주세요'
            } else {
                console.error(result.message);
            }
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
}

// Function to cancel review
function cancelReview() {
    const modal = document.getElementById('reviewModal');
    const reviewTextArea = document.getElementById('reviewTextArea');

    // Clear the textarea and close the modal
    reviewTextArea.value = '';
    modal.style.display = 'none';
}