const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

let colorIsChanging = false;
let colorChanger = 0;
const disabledButtonStyle = 'opacity: 0.5; cursor: not-allowed;';

refs.startBtn.style.cssText = styleButton(45);
refs.stopBtn.style.cssText = `${styleButton(55)} ${disabledButtonStyle}`;
refs.stopBtn.disabled = true;

refs.body.addEventListener('click', handleButtonClick);

function handleButtonClick({ target }) {
  if (!target.nodeName === 'BUTTON') {
    return;
  }

  if (target === refs.startBtn) {
    startColorChange();
  } else {
    stopColorChange();
  }
}

function startColorChange() {
  colorIsChanging = true;
  colorChanger = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
    refs.startBtn.style.cssText = styleDisabledButton(45);
    refs.stopBtn.style.cssText = colorButton(55);
  }, 1000);

  if (colorIsChanging) {
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
    refs.startBtn.style.cssText = styleDisabledButton(45);
  }
}

function stopColorChange() {
  if (colorIsChanging) {
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
    refs.startBtn.style.cssText = colorButton(45);
    refs.stopBtn.style.cssText = styleDisabledButton(55);
  }
  clearInterval(colorChanger);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function styleButton(left) {
  return `position: absolute; top: 50%; left: ${left}%; transform: translate(-50%, -50%); font-weight: 700; font-size: 1.2rem; border-radius: 5px;`;
}

function colorButton(left) {
  return `${styleButton(
    left
  )} background-color: ${getRandomHexColor()}; color: ${getRandomHexColor()}; border: 2px solid ${getRandomHexColor()};`;
}

function styleDisabledButton(left) {
  return `${colorButton(left)} ${disabledButtonStyle}`;
}
