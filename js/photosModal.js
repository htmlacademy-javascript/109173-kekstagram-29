import {isEscapeKey} from './utils.js';

const fullScreenContainer = document.querySelector('.big-picture');
const closeFullScreenBtn = document.querySelector('.big-picture__cancel');

function onKeyDownHandler(evt) {
  if(isEscapeKey(evt)) {
    closeFullPhotto();
  }
}

// Функции работы с модальными окнами
function openFullPhoto(evt) {
  evt.preventDefault();

  fullScreenContainer.classList.remove('hidden');

  document.addEventListener('keydown', onKeyDownHandler);
  closeFullScreenBtn.addEventListener('click', closeFullPhotto);
}

function closeFullPhotto() {
  fullScreenContainer.classList.add('hidden');

  document.removeEventListener('keydown', onKeyDownHandler);
  closeFullScreenBtn.removeEventListener('click', closeFullPhotto);
}

export {openFullPhoto};
