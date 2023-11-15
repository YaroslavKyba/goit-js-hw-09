import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const timeInput = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const daysTimer = document.querySelector('span[data-days]');
const hoursTimer = document.querySelector('span[data-hours]');
const minutesTimer = document.querySelector('span[data-minutes]');
const secondsTimer = document.querySelector('span[data-seconds]');

const TIMER_DELAY = 1000;
let intervalId = null;
let selectedDate = null;

btnStart.disabled = true;

flatpickr(timeInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    if (selectedDates < Date.now()) {
      Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
      return;
    }
    btnStart.disabled = false;
    Notify.success('The selected date is correct :)');
    selectedDate = selectedDates.getTime();
  },
});

btnStart.addEventListener('click', () => {
  intervalId = setInterval(() => {
    const deltaTime = selectedDate - Date.now();
    createTime(convertMs(deltaTime));

    if (deltaTime <= TIMER_DELAY) {
      clearInterval(intervalId);
    }
  }, TIMER_DELAY);
});

function createTime({ days, hours, minutes, seconds }) {
  daysTimer.textContent = addLeadingZero(days);
  hoursTimer.textContent = addLeadingZero(hours);
  minutesTimer.textContent = addLeadingZero(minutes);
  secondsTimer.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Напиши скрипт таймера, який здійснює зворотний відлік до певної дати.
// Такий таймер може використовуватися у блогах та інтернет - магазинах,
// сторінках реєстрації подій, під час технічного обслуговування тощо.
// Подивися демо - відео роботи таймера.
