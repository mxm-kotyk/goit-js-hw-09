import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_green.css';

const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start'),
  timer: document.querySelector('.timer'),
  timerFields: document.querySelectorAll('.field'),
  timerValues: document.querySelectorAll('.value'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const currentDate = new Date();
const timerStyles = 'display: flex';

refs.timer.style.cssText = 'display: flex; gap: 1rem';
refs.timerFields.forEach(field => {
  console.log(field);
  field.style.cssText =
    'display: flex; flex-direction: column; align-items: center; text-transform: uppercase';
});
refs.timerValues.forEach(value => {
  value.style.cssText = 'font-weight: 500; font-size: 3rem';
});

refs.startBtn.disabled = true;

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] <= currentDate) {
      alert('Please choose a date in the future');
      refs.startBtn.disabled = true;
      return;
    }
    refs.startBtn.disabled = false;
  },
};

const datePicker = flatpickr(refs.dateInput, flatpickrOptions);
