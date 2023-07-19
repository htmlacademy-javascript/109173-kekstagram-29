import {isEscapeKey} from './utils.js';

const fullScreenContainer = document.querySelector('.big-picture');
const closeFullScreenBtn = document.querySelector('.big-picture__cancel');

function keyDownHandler(evt) {
  if(isEscapeKey(evt)) {
    closeFullPhotto();
  }
}

// Функции работы с модальными окнами
function openFullPhoto() {
  document.body.classList.add('modal-open'); // Запрещаем прокрутку body
  fullScreenContainer.classList.remove('hidden'); // Открываем попап с фото

  document.addEventListener('keydown', keyDownHandler);
  closeFullScreenBtn.addEventListener('click', closeFullPhotto);
}

function closeFullPhotto() {
  fullScreenContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', keyDownHandler);
  closeFullScreenBtn.removeEventListener('click', closeFullPhotto);
}

export {openFullPhoto};
