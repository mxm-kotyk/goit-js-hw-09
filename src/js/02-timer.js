import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_green.css';

const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  timerEl: document.querySelector('.timer'),
  timerFields: document.querySelectorAll('.field'),
};

const clockface = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;
refs.timerEl.style.cssText = 'display: flex; gap: 1rem';
refs.timerFields.forEach(field => {
  field.style.cssText =
    'display: flex; flex-direction: column; align-items: center; text-transform: uppercase';
  field.firstElementChild.style.cssText = 'font-weight: 500; font-size: 3rem';
});

// const timer = {
//   start() {
//     const startTime = Date.now();

//     setInterval(() => {
//       const currentTime = Date.now();
//       const deltaTIme = startTime - currentTime;
//       const timeComponents = convertMs(deltaTIme);
//       console.log(timeComponents);
//     }, 1000);
//   },
// };

// refs.startBtn.addEventListener('click', timer.start);

const currentDate = new Date();
let selectedDate;

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    console.log(selectedDate);
    pickDate(selectedDate);
  },
};

flatpickr(refs.dateInput, flatpickrOptions);

function pickDate(date) {
  if (date <= currentDate) {
    alert('Please choose a date in the future');
    refs.startBtn.disabled = true;
    return;
  }
  refs.startBtn.disabled = false;

  fillInTimer(date);
}

function fillInTimer(date) {
  const timeObj = calculateTime(date);

  for (const key in clockface) {
    clockface[key].textContent = timeObj[key];
  }
}

// function intiateTimer() {
//   setInterval(calculateTime, 1000);
// }

function calculateTime(date) {
  const delta = date - currentDate;
  return convertMs(delta);
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
