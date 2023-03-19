import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  labels: document.querySelectorAll('label'),
  firstDelay: document.querySelector('[name="delay"]'),
  delayStep: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

refs.labels.forEach(label => {
  label.style.cssText =
    'display: flex; flex-direction: column; font-weight: 700';
});
refs.form.style.cssText = 'display: flex; gap: 1rem; align-items: flex-end';

refs.form.addEventListener('submit', handleFormOnSubmit);

function handleFormOnSubmit(e) {
  e.preventDefault();
  const amount = Number(refs.amount.value);
  let firstDelay = Number(refs.firstDelay.value);
  const delayStep = Number(refs.delayStep.value);

  setTimeout(() => {
    for (let index = 1; index <= amount; index += 1) {
      createPromise(index, firstDelay).then(onResolve).catch(onReject);
      firstDelay += delayStep;
    }
  }, firstDelay);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}

function onResolve({ position, delay }) {
  Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
}

function onReject({ position, delay }) {
  Notify.failure(`Rejected promise ${position} in ${delay}ms`);
}
