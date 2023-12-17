const petList = document.getElementById('petList');
const table = document.getElementById('petList');
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
const requestOptions = {
  method: 'GET',
  headers: myHeaders
};
fetch("http://localhost:3000/api/pet", requestOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(result => {
    if (result.success) {
      console.log(result.data)
      if (result.data == []) {
        document.getElementById('petProfiles').innerHTML += `<h2>등록된 펫이 없습니다</h2>`
      } else {
        openModal(result.data)
      }
    } else {
      console.error(result.message);
    }
  })
  .catch(error => {
    console.error('Error:', error.message);
  });

function openModal(petsData) {
  petsData.forEach((pet, index) => {
    table.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${pet.petName}</td>
        <td>${pet.petType}</td>
        <td>
          <div class="button-container">
            <button class="button" id="editBtn" onclick="editModal('${pet.petId}', '${pet.petName}', '${pet.petType}')">수정</button>
            <button class="button" onclick = "deletePet('${pet.petId}')">삭제</button>
          </div>
        </td>
      </tr>
    `;
  });
  document.getElementById('createPetModal').addEventListener('click', function () {
    if (petsData.length >= 5) {
      alert('펫 등록은 최대 5마리만 가능합니다.')
    } else {
      showModal()
    }
  })
}

document.getElementById('cancelPet').addEventListener('click', function () {
  hideModal()
})

function editModal(petId, petName, petType) {
  const modal = document.getElementById('createModal');
  document.getElementById('petName').value = petName;
  document.getElementById('petType').value = petType;
  document.getElementById('createPet').addEventListener('click', function () {
    editPet(petId)
  })
  modal.style.display = 'flex';
}
async function deletePet(petId) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/pet/${petId}`,
      {
        method: 'DELETE',
        headers: myHeaders,
      },
    );
    const information = await response.json();
    alert(information.message);
    hideModal()
    location.reload();
  } catch (err) {
    alert(err.message);
  }
}
async function editPet(petId) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/pet/put/${petId}`,
      {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify({
          petName: document.getElementById('petName').value,
          petType: document.getElementById('petType').value
        })
      },
    );
    const information = await response.json();
    alert(information.message);
    hideModal()
    location.reload();
  } catch (err) {
    alert(err.message);
  }
}

function showModal() {
  const modal = document.getElementById('createModal');
  modal.style.display = 'flex';
  document.getElementById('createPet').addEventListener('click', function () {
    createPet()
  })
}
function closeModal() {
  var modal = document.querySelector('.modal');
  if (modal) {
    modal.remove();
  }
}
function hideModal() {
  const modal = document.getElementById('createModal');
  modal.style.display = 'none';
}
async function createPet() {
  try {
    const response = await fetch(
      `http://localhost:3000/api/pet/post`,
      {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
          petName: document.getElementById('petName').value,
          petType: document.getElementById('petType').value
        })
      },
    );
    const information = await response.json();
    alert(information.message);
    hideModal()
    location.reload();
  } catch (err) {
    alert(err.message);
  }
}