const todaySpan = document.querySelector('#today');
const numberDiv = document.querySelector('.numbers');
const drawButton = document.querySelector('#draw');
const resetButton = document.querySelector('#reset');
const colors = ['orange', 'skyblue', 'red', 'purple', 'green'];

let lottoNumbers = [];

const today = new Date();

let year = today.getFullYear();
let month = today.getMonth() + 1;
let date = today.getDate();
todaySpan.textContent = `${year}년 ${month}월 ${date}일`;

function paintNumber(number) {
  const eachNumDiv = document.createElement('div');
  eachNumDiv.classList.add('eachnum');
  let colorIndex = Math.floor(number / 10);
  eachNumDiv.style.backgroundColor = colors[colorIndex];
  eachNumDiv.textContent = number;
  numberDiv.append(eachNumDiv);
}

// 클릭하면 랜덤숫자 여섯개가 배열에 추가된다.
drawButton.addEventListener('click', function () {
  lottoNumbers = [];
  numberDiv.innerHTML = '';

  // 6개의 배열을 만들고, 숫자의 범위는 1~45까지
  while (lottoNumbers.length < 6) {
    let rn = Math.floor(Math.random() * 45) + 1;
    // 배열 안에 같은 숫자가 없을 경우 배열에 추가해라.
    if (lottoNumbers.indexOf(rn) === -1) {
      lottoNumbers.push(rn);
      paintNumber(rn);
    }
  }
});

resetButton.addEventListener('click', function () {
  lottoNumbers.splice(0, 6);
  numberDiv.innerHTML = '';
});
