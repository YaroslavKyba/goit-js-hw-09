const CHANGECOLOR_DELAY = 1000;
let timerId = null;

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

btnStart.addEventListener('click', onChangeBodyColor);
btnStop.addEventListener('click', cancelChangeBodyColor);

function onChangeBodyColor() {
  btnStart.setAttribute('disabled', true);
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, CHANGECOLOR_DELAY);
}

function cancelChangeBodyColor() {
  clearInterval(timerId);
  btnStart.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
// Напиши скрипт, який після натискання кнопки «Start»,
// раз на секунду змінює колір фону < body > на випадкове значення, використовуючи інлайн стиль.
// Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.

// УВАГА
// Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів.
// Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною(disabled).

// Для генерування випадкового кольору використовуй функцію getRandomHexColor.

// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
// }
