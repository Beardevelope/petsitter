const table = document.querySelector('.chart-table');
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJhc2RmQGRmLmNvbSIsImlhdCI6MTcwMjUwNDc2OCwiZXhwIjoxNzAzMTA5NTY4fQ.XT7DoLJrI7xPjyZfQbsEEaUy4wG7q_yfRdA4Dhmi_dI");
const requestOptions = {
    method: 'GET',
    headers: myHeaders
};
const notReservation = document.getElementById('nonReservation')
var today = new Date();
var year = today.getFullYear();
var month = ('0' + (today.getMonth() + 1)).slice(-2);
var day = ('0' + today.getDate()).slice(-2);
var dateString = year + '-' + month + '-' + day;

function processReviewData(data) {
    const headerRow = document.createElement('tr');
    headerRow.setAttribute('align', 'center');
    const headerCells = ['시터', '날짜', '펫', '리뷰'];

    headerCells.forEach(text => {
        const cell = document.createElement('td');
        cell.textContent = text;
        headerRow.appendChild(cell);
    });

    table.appendChild(headerRow);
    if (data.length > 0) {
        notReservation.style.display = 'none';
    }
    data.forEach(item => {
        const row = document.createElement('tr');
        const cells = ['sitterName', 'reservationDate', 'petName'].map(key => {
            const cell = document.createElement('td');
            cell.textContent = item[key];
            return cell;
        });

        const reviewCell = document.createElement('td');
        if (item.reservationDate > dateString) {
            reviewCell.id = item.reservationId;
            reviewCell.innerHTML = `<button>예약 취소하기</button>`;
            reviewCell.addEventListener('click', () => deleteReservation(reviewCell.id));
        } else {
            reviewCell.innerHTML = item.review || '<button>리뷰 작성하기</button>';
            reviewCell.id = item.reservationId;
            reviewCell.addEventListener('click', () => showReviewModal(reviewCell.textContent, reviewCell.id));
        }

        row.append(...cells, reviewCell);
        table.appendChild(row);
    });
}

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

    if (reviewContent != "리뷰 작성하기") {
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
function deleteReservation(reservationId) {
    const createReviewURL = 'http://localhost:3000/api/reservations/' + reservationId;
    const createReviewOptions = {
        method: 'DELETE',
        headers: myHeaders,
    };

    fetch(createReviewURL, createReviewOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            const deletedRow = document.getElementById(reservationId);
            deletedRow.parentNode.remove(deletedRow.parentNode)
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
}
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
function createReview() {
    const modal = document.getElementById('reviewModal');
    const reviewTextArea = document.getElementById('reviewTextArea');
    const reviewContent = reviewTextArea.value;
    const reservationClass = reviewTextArea.class;
    if (reviewContent == '리뷰 작성하기') {
        alert('리뷰 내용을 입력해주세요')
        return
    }

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
function cancelReview() {
    const modal = document.getElementById('reviewModal');
    const reviewTextArea = document.getElementById('reviewTextArea');
    reviewTextArea.value = '';
    modal.style.display = 'none';
}