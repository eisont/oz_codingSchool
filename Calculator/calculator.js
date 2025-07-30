let result = [];
let overflow = []; // 보이는 배열
let previousRecords = [];

const previousRecord = document.querySelector('.previousRecord');
const display = document.querySelector('.display');
const buttonItem = document.querySelector('.buttons');
const operatorArr = ['+', '-', '*', '/'];

buttonItem.addEventListener('click', (event) => {
  const target = event.target;
  const value = target.value;
  if (!value) return;

  let lastOpIndex = -1;
  for (let i = result.length - 1; i >= 0; i--) {
    // 수식 찾기
    if (operatorArr.includes(result[i])) {
      lastOpIndex = i;
      break;
    }
  }
  const currentNumber = result.slice(lastOpIndex + 1).join(''); // 현재 숫자 확인

  if (value === '.' && currentNumber.includes('.')) return; // 소수점 중복 방지

  if (target.classList.contains('number')) {
    result.push(value);
    overflow.push(value);
    display.textContent = overflow.join('');
  } else if (target.classList.contains('operator')) {
    // 수식은 한번만 눌리게 만든다.
    let last = result[result.length - 1];
    if (operatorArr.includes(last)) {
      result[result.length - 1] = value;
    } else {
      result.push(value);
      overflow = [];
    }
    let previousCalculationResult = eval(result.slice(0, result.length - 1).join(''));
    previousRecord.textContent = result.slice(0, result.length - 1).join('');
    result.splice(0, result.length - 1, `${previousCalculationResult}`);
    display.textContent = result[0];

    console.log(`firstOperand: ${result.slice(0, lastOpIndex).join('')}, operator: ${value}`);
  } else if (value === 'AC') {
    result = [];
    overflow = [];
    display.textContent = result.join('') || '0';
  } else if (value === '+/-') {
  } else if (value === '%') {
  } else if (value === '=') {
    const answer = eval(result.join(''));
    display.textContent = answer;
    result = [String(answer)];
  }

  const length = display.textContent.length;
  if (length >= 13) display.style.fontSize = '20px';
  else if (length > 6) display.style.fontSize = '35px';
  else display.style.fontSize = '60px';
});
