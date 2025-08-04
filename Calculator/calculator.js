let result = [];
let visibleNum = []; // 보이는 배열
let previousRecordArr = [];
let buttonCondition = true;

const clear = document.querySelector('.clear');
const allClear = document.querySelector('.allClear');
const previousRecord = document.querySelector('.previousRecord');
const display = document.querySelector('.display');
const buttonItem = document.querySelector('.buttons');
const operatorArr = ['+', '-', '*', '/'];

buttonItem.addEventListener('click', (event) => {
  const target = event.target;
  const value = target.value;

  if (!value) return; // 버튼 외 클릭시 리턴!

  // 수식이 들어간 자리 찾기
  let lastOpIndex = -1;
  for (let i = result.length - 1; i >= 0; i--) {
    if (operatorArr.includes(result[i])) {
      lastOpIndex = i;
      break;
    }
  }
  const currentNumber = result.slice(lastOpIndex + 1).join(''); // 현재 숫자 확인

  // 소수점 중복 방지
  if (value === '.' && currentNumber.includes('.')) return;

  // 숫자 클릭시
  if (target.classList.contains('number')) {
    previousRecord.textContent = previousRecordArr.join('');
    result.push(value);
    visibleNum.push(value);
    display.textContent = visibleNum.join('');
  }
  // 수식 클릭시
  else if (target.classList.contains('operator')) {
    // 수식은 한번만!!!
    let last = result[result.length - 1];
    if (operatorArr.includes(last)) {
      result[result.length - 1] = value;
    } else {
      result.push(value);
      visibleNum = [];
    }
    previousRecord.textContent = [];
    buttonCondition = true;

    let previousCalculationResult = eval(result.slice(0, result.length - 1).join(''));
    result.splice(0, result.length - 1, `${previousCalculationResult || '0'}`);
    display.textContent = result[0];
  }
  // AC 버튼 클릭시
  else if (value === 'AC') {
    result = [];
    visibleNum = [];
    previousRecordArr = [];
    buttonCondition = true;
    display.textContent = result.join('') || '0';
    previousRecord.textContent = previousRecordArr.join('');
  }
  // clear 버튼 클릭시
  else if (value === 'clear') {
    result.pop();
    visibleNum.pop();
    display.textContent = visibleNum.join('') || '0';
  }
  // = 버튼 클릭시
  else if (value === '=') {
    if (!visibleNum.length) return;
    previousRecord.textContent = result.join('');
    const answer = eval(result.join(''));
    display.textContent = answer;
    result = [String(answer)];
    buttonCondition = false;
    // result = [];
    visibleNum = [];
    previousRecordArr = [];
  }
  // 아직 추가 안한 기능
  else if (value === '+/-') {
  } else if (value === '%') {
  }

  // 글자 갯수에 따라 글자 크기 조정
  const length = display.textContent.length;
  if (length >= 13) display.style.fontSize = '20px';
  else if (length > 6) display.style.fontSize = '35px';
  else display.style.fontSize = '60px';

  // 버튼 활성 / 비활성
  if (visibleNum.length && buttonCondition) {
    clear.style.display = 'block';
    allClear.style.display = 'none';
  } else {
    clear.style.display = 'none';
    allClear.style.display = 'block';
  }
});
