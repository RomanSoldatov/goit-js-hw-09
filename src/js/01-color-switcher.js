const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let nIntervId;

buttonStart.addEventListener('click', onStartclick);
buttonStop.addEventListener('click', onStopclick);
buttonStop.disabled = true;

function onStartclick() {
  if (!nIntervId) {
    nIntervId = setInterval(changeColor, 1000);
    buttonStop.disabled = false;
    buttonStart.disabled = true;
  }
}

function onStopclick() {
  clearInterval(nIntervId);
  nIntervId = null;
  buttonStart.disabled = false;
  buttonStop.disabled = true;
  body.style.backgroundColor = 'unset';
}

function changeColor() {
  body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
