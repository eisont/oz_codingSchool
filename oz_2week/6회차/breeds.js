// 6회차 과제
// - 견종 고르는 셀렉트 옆에다 버튼(button)을 하나 추가한다.
// - 버튼에는 '리셋'이라고 쓴다.
// - 해당 버튼을 누르면 강아지 42마리의 소스를 새롭게 요청에 받아온다.
// - 기존에 뿌려져 있던 강아지는 모두 사라지고, 새로운 강아지 42마리로 채워진다.

const apiRandomDogs = 'https://dog.ceo/api/breeds/image/random/42';
const apiAllBreeds = 'https://dog.ceo/api/breeds/list/all';
const request1 = new XMLHttpRequest();
const request2 = new XMLHttpRequest();

const header = document.getElementById('header');
const main = document.getElementById('main');
const input = document.getElementById('filter-text');
const button = document.getElementById('filter-button');
const select = document.getElementById('filter-select');
const more = document.getElementById('more');
const tothetop = document.getElementById('tothetop');
const resetBt = document.getElementById('reset');

const currentDogs = []; // 강아지 사진을 배열로 관리

function displayDogs(item) {
  // 같은 코드를 함수로 만들어 사용한다.
  const dogImgDiv = document.createElement('div');
  dogImgDiv.classList.add('flex-item');
  dogImgDiv.innerHTML = `
        <img src=${item}>
      `;

  main.appendChild(dogImgDiv);
}

window.addEventListener('load', function () {
  // 강아지 사진 뿌리기
  request1.open('get', apiRandomDogs); // 모든 강아지 사진 달라고
  request1.addEventListener('load', function () {
    // 응답이 load되었을 때
    const response = JSON.parse(request1.response); // 응답을 읽어서 JSON.parse한다. 여기서 response는 message, status를 포함한 객체이다.
    response.message.forEach(function (item) {
      currentDogs.push(item); // message에 담겨있던 이미지 주소를 배열에 새로 넣는다.
      displayDogs(item);
    });
  });
  request1.send(); // 강아지 사진 달라고 요청

  // 셀렉트에 견종 정보 뿌리기
  request2.open('get', apiAllBreeds);
  request2.addEventListener('load', function () {
    const response = JSON.parse(request2.response);
    Object.keys(response.message).forEach(function (item) {
      // Object.keys => keys 값만 받아서 객체로 만들어준다.
      const option = document.createElement('option');
      option.textContent = item;
      option.value = item;
      select.appendChild(option);
    });
  });

  request2.send();
});

button.addEventListener('click', function () {
  main.innerHTML = '';
  let filteredDogs = currentDogs.filter(function (item) {
    return item.indexOf(input.value) !== -1; // input의 값하고 일치하지 않을 경우
  });

  input.value = '';

  filteredDogs.forEach(function (item) {
    displayDogs(item);
  });
});

select.addEventListener('change', function () {
  // 옵션을 선택했을 때는 변화를 느낀다해서 change를 사용한다.

  main.innerHTML = '';
  let filteredDogs = currentDogs.filter(function (item) {
    return item.indexOf(select.value) !== -1; // input의 값하고 일치하지 않을 경우
  });

  filteredDogs.forEach(function (item) {
    displayDogs(item);
  });
});

more.addEventListener('click', function () {
  request1.open('get', apiRandomDogs);
  request1.addEventListener('load', function () {
    const response = JSON.parse(request1.response);
    response.message.forEach(function (item) {
      currentDogs.push(item);
      displayDogs(item);
    });
  });
  request1.send();
});

tothetop.addEventListener('click', function () {
  // scrollTo : 주어진 위치로 스크롤을 이동한다.
  // scroll은 윈도우가 통제한다.
  window.scrollTo({ top: 0 });
});

// reset 버튼 만들기
resetBt.addEventListener('click', function () {
  currentDogs.length = 0;
  main.innerHTML = '';

  request1.open('get', apiRandomDogs);
  request1.send(); // 강아지 사진 달라고 요청
});
