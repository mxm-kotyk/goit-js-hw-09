import flatpickr from 'flatpickr';
import { Report } from 'notiflix/build/notiflix-report-aio';
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
    'display: flex; flex-direction: column; align-items: center; text-transform: uppercase;';
  field.firstElementChild.style.cssText =
    'font-weight: 500; font-size: 3rem; color: black;';
});

let selectedDate = 0;
let timerId = 0;

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate <= Date.now()) {
      Report.failure(
        'Invalid date',
        'Please choose a date in the future',
        'OK'
      );
      return;
    }

    refs.startBtn.disabled = false;
    console.log(selectedDate);
  },
};

flatpickr(refs.dateInput, flatpickrOptions);

refs.startBtn.addEventListener('click', startTimerOnClick);

function startTimerOnClick() {
  timerId = setInterval(() => {
    const delta = selectedDate - Date.now();
    refs.startBtn.disabled = true;
    refs.dateInput.disabled = true;
    fillInTimer(delta);
    blinkTimer(delta);
    stopTimerOnFinish(delta);
  }, 1000);
}

function fillInTimer(time) {
  const timeObj = convertMs(time);
  for (const key in clockface) {
    clockface[key].textContent = addLeadingZero(timeObj[key]);
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function blinkTimer(time) {
  if (time < 10000) {
    refs.timerFields.forEach(
      field =>
        (field.firstElementChild.style.color =
          field.firstElementChild.style.color === 'black' ? 'red' : 'black')
    );
  }
}

function stopTimerOnFinish(time) {
  if (time < 1000) {
    clearInterval(timerId);
    refs.dateInput.disabled = false;
    Report.success(`Time's up`, '', 'OK');
  }
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
