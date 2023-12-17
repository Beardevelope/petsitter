const table = document.querySelector('.chart-table');

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

document.getElementById('cancelPet').addEventListener('click', function () {
    hideModal()
})
document.getElementById('createPet').addEventListener('click', function () {
    createPet()
})
function hideModal() {
    const modal = document.getElementById('createModal');
    modal.style.display = 'none';
}
function createPet() {
    const createReviewURL = 'http://localhost:3000/api/pet/post';
    const createReviewOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
            petType: document.getElementById('petName').value,
            petName: document.getElementById('petType').value
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