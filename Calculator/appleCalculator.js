// 아이폰 계산기 따라만들기

let result = [];
let previousRecords = [];

const previousRecord = document.querySelector('.previousRecord');
const display = document.querySelector('.display');
const buttonItem = document.querySelector('.buttons');
const operator = ['+', '-', '*', '/'];

buttonItem.addEventListener('click', (event) => {
  const target = event.target;
  const value = target.value;
  if (!value) return;

  let lastOpIndex = -1;
  for (let i = result.length - 1; i >= 0; i--) {
    if (operator.includes(result[i])) {
      lastOpIndex = i;
      break;
    }
  }

  const currentNumber = result.slice(lastOpIndex + 1).join(''); // 연산자 다음 숫자 확인

  if (value === '.' && currentNumber.includes('.')) return; // 소수점 중복 방지

  if (target.classList.contains('number')) {
    result.push(value);
  } else if (target.classList.contains('operator')) {
    let last = result[result.length - 1];
    if (operator.includes(last)) {
      result[result.length - 1] = value;
    } else {
      result.push(value);
    }
  } else if (value === 'AC') {
    result = []; // 배열 빈 배열
    previousRecords = [];
    previousRecord.textContent = previousRecords;
  } else if (value === '+/-') {
  } else if (value === '%') {
  } else if (value === '=') {
    let formula = result.join('');
    try {
      previousRecords.push(formula);
      previousRecord.textContent = formula;
      const answer = eval(formula);
      display.textContent = answer;
      result = [String(answer)]; // 다음 계산을 이어가기 위해 배열안에 문자열로 삽입
    } catch (e) {
      display.textContent = 'error';
    }
  }
  display.textContent = result.join('') || '0';

  const length = result.length;
  if (length >= 13) display.style.fontSize = '20px';
  else if (length > 6) display.style.fontSize = '35px';
  else display.style.fontSize = '60px';
});
