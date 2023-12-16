document.addEventListener('DOMContentLoaded', function () {
  var petProfiles = document.getElementById('petProfiles');
  var petsData = [
    { name: '멍멍이', type: '강아지' },
    { name: '야옹이', type: '고양이' },
    // 추가적인 펫 데이터를 필요에 따라 계속 추가할 수 있습니다.
  ];

  var table = document.createElement('table');

  // Header row
  var headerRow = document.createElement('tr');

  var headerCell1 = document.createElement('th');
  headerCell1.textContent = 'No.';
  headerRow.appendChild(headerCell1);

  var headerCell2 = document.createElement('th');
  headerCell2.textContent = '펫 이름';
  headerRow.appendChild(headerCell2);

  var headerCell3 = document.createElement('th');
  headerCell3.textContent = '펫 종류';
  headerRow.appendChild(headerCell3);

  var headerCell4 = document.createElement('th');
  headerRow.appendChild(headerCell4);

  table.appendChild(headerRow);

  // Data rows
  petsData.forEach(function (pet, index) {
    var dataRow = document.createElement('tr');

    var dataCell1 = document.createElement('td');
    dataCell1.textContent = index + 1 + '.';
    dataRow.appendChild(dataCell1);

    var dataCell2 = document.createElement('td');
    dataCell2.textContent = pet.name;
    dataRow.appendChild(dataCell2);

    var dataCell3 = document.createElement('td');
    dataCell3.textContent = pet.type;
    dataRow.appendChild(dataCell3);

    var dataCell4 = document.createElement('td');

    var buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    var editButton = document.createElement('button');
    editButton.textContent = '수정';
    editButton.classList.add('button');
    editButton.addEventListener('click', function () {
      openModal(pet.name, pet.type);
    });
    buttonContainer.appendChild(editButton);

    var deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.classList.add('button');
    deleteButton.addEventListener('click', function () {
      // 여기에 삭제 버튼 클릭 시 동작하는 로직 추가
      alert('삭제 버튼 클릭됨: ' + pet.name);
    });
    buttonContainer.appendChild(deleteButton);

    dataCell4.appendChild(buttonContainer);
    dataRow.appendChild(dataCell4);

    table.appendChild(dataRow);
  });

  petProfiles.appendChild(table);

  function openModal(name, type) {
    var modal = document.createElement('div');
    modal.classList.add('modal');

    var nameLabel = document.createElement('label');
    nameLabel.textContent = '펫 이름:';
    modal.appendChild(nameLabel);

    var nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = name;
    modal.appendChild(nameInput);

    var typeLabel = document.createElement('label');
    typeLabel.textContent = '펫 종류:';
    modal.appendChild(typeLabel);

    var typeInput = document.createElement('input');
    typeInput.type = 'text';
    typeInput.value = type;
    modal.appendChild(typeInput);

    var saveButton = document.createElement('button');
    saveButton.textContent = '수정';
    saveButton.classList.add('button');
    saveButton.addEventListener('click', function () {
      // 여기에 수정 로직을 추가하세요.
      closeModal();
    });

    modal.appendChild(saveButton);

    var cancelButton = document.createElement('button');
    cancelButton.textContent = '취소';
    cancelButton.classList.add('button');
    cancelButton.addEventListener('click', function () {
      closeModal();
    });
    modal.appendChild(cancelButton);

    // 취소 버튼 클릭 이벤트 핸들러
    cancelButton.addEventListener('click', function () {
      console.log('취소 버튼 클릭됨');
      closeModal();
    });

    document.body.appendChild(modal);
  }

  function closeModal() {
    var modal = document.querySelector('.modal');
    if (modal) {
      modal.remove();
    }
  }
});
