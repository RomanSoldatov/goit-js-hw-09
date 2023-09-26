import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

document.body.style.backgroundColor = 'blue';
const timer = document.querySelector('.timer');
timer.style.display = 'flex';
timer.style.gap = '25px';

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      Report.failure('Please choose a date in the future');
      document.querySelector('[data-start]').disabled = true;
    } else {
      document.querySelector('[data-start]').disabled = false;
    }
  },
};

const fp = flatpickr('#datetime-picker', options);

let countdownInterval;

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;
startBtn.addEventListener('click', () => {
  const selectedDate = new Date(fp.selectedDates[0]);
  const currentDate = new Date();

  if (selectedDate > currentDate) {
    startBtn.disabled = false;
    countdownInterval = setInterval(() => {
      const currentTime = new Date();
      const timeDifference = selectedDate - currentTime;

      if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        Notiflix.Report.success('Countdown finished!');
        document.querySelector('[data-days]').textContent = '00';
        document.querySelector('[data-hours]').textContent = '00';
        document.querySelector('[data-minutes]').textContent = '00';
        document.querySelector('[data-seconds]').textContent = '00';
        return;
      }

      const { days, hours, minutes, seconds } = convertMs(timeDifference);

      document.querySelector('[data-days]').textContent = addLeadingZero(days);
      document.querySelector('[data-hours]').textContent =
        addLeadingZero(hours);
      document.querySelector('[data-minutes]').textContent =
        addLeadingZero(minutes);
      document.querySelector('[data-seconds]').textContent =
        addLeadingZero(seconds);
    }, 1000);
  }
});
