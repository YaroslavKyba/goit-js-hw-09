import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);

function onSubmit(ev) {
  ev.preventDefault();

  const { delay, step, amount } = ev.currentTarget.elements;
  const data = {
    delay: Number(delay.value),
    step: Number(step.value),
    amount: Number(amount.value),
  };

  for (let i = 1; i <= data.amount; i += 1) {
    createPromise(i, data.delay + data.step * (i - 1))
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    ev.currentTarget.reset();
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay)
// стільки разів, скільки ввели в поле amount.Під час кожного виклику передай їй номер промісу(position),
// що створюється, і затримку, враховуючи першу затримку(delay), введену користувачем, і крок(step).

// Доповни код функції createPromise таким чином, щоб вона повертала один проміс,
// який виконується або відхиляється через delay часу.Значенням промісу повинен бути об'єкт,
// в якому будуть властивості position і delay зі значеннями однойменних параметрів.
// Використовуй початковий код функції для вибору того, що потрібно зробити з промісом -
// виконати або відхилити.

//
