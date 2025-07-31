// 아이폰 계산기 따라만들기

let result = [];
let previousRecords = [];
let buttonCondition = true;

const clear = document.querySelector('.clear');
const allClear = document.querySelector('.allClear');
const previousRecord = document.querySelector('.previousRecord');
const display = document.querySelector('.display');
const buttonItem = document.querySelector('.buttons');
const operator = ['+', '-', '*', '/'];

buttonItem.addEventListener('click', (event) => {
  const target = event.target;
  const value = target.value;
  // 버튼 외 클릭 시 리턴
  if (!value) return;

  // 수식 찾기
  let lastOpIndex = -1;
  for (let i = result.length - 1; i >= 0; i--) {
    if (operator.includes(result[i])) {
      lastOpIndex = i;
      break;
    }
  }

  // 연산자 다음 숫자 확인
  const currentNumber = result.slice(lastOpIndex + 1).join('');

  // 소수점 중복 방지
  if (value === '.' && currentNumber.includes('.')) return;

  // 숫자를 클릭시
  if (target.classList.contains('number')) {
    result.push(value);
  }
  // 수식을 클릭시
  else if (target.classList.contains('operator')) {
    let last = result[result.length - 1];
    if (operator.includes(last)) {
      result[result.length - 1] = value;
    } else {
      result.push(value);
    }
  }
  // allclear을 클릭시
  else if (value === 'AC') {
    result = []; // 배열 빈 배열
    previousRecords = [];
    previousRecord.textContent = previousRecords;
  }

  // clear 버튼 클릭시
  else if (value === 'clear') {
    result.pop();
    display.textContent = result.join('') || '0';
  }
  // =을 클릭시
  else if (value === '=') {
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
  // 아직 기능 미완성
  else if (value === '+/-') {
  } else if (value === '%') {
  }

  display.textContent = result.join('') || '0';

  // 글자 갯수에 따라 글자 크기 조정
  const length = result.length;
  if (length >= 13) display.style.fontSize = '20px';
  else if (length > 6) display.style.fontSize = '35px';
  else display.style.fontSize = '60px';

  // 버튼 활성 / 비활성
  if (result.length && buttonCondition) {
    clear.style.display = 'block';
    allClear.style.display = 'none';
  } else {
    clear.style.display = 'none';
    allClear.style.display = 'block';
  }
});
