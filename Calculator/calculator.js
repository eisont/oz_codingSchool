let result = [];

const display = document.querySelector('.display');
const buttonItem = document.querySelector('.buttons');
const equals = document.getElementById('equals'); // = 결과
const operator = ['+', '-', '*', '/'];

buttonItem.addEventListener('click', (event) => {
  const target = event.target;
  const value = target.value;
  if (!value) return;

  if (value === '.' && result.includes('.')) return;

  if (target.classList.contains('number')) {
    result.push(value);
  } else if (target.classList.contains('operator')) {
    result.push(value);
  } else if (target.classList.contains('pot')) {
  } else if (value === 'AC') {
    result = [];
  } else if (value === '+/-') {
  } else if (value === '%') {
  }

  display.textContent = result.join('') || '0';

  const length = result.length;
  if (length >= 13) display.style.fontSize = '20px';
  else if (length > 6) display.style.fontSize = '35px';
  else display.style.fontSize = '60px';

  console.log(value);
});

equals.addEventListener('click', () => {
  console.log(typeof result.join(''));
});
