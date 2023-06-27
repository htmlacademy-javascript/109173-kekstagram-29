import {isEscapeKey} from './utils.js';
import {showMoreComments} from './drawComments.js';

const fullScreenContainer = document.querySelector('.big-picture');
const closeFullScreenBtn = document.querySelector('.big-picture__cancel');
const loadMoreCommentsBtn = document.querySelector('.social__comments-loader');

function onKeyDownHandler(evt) {
  if(isEscapeKey(evt)) {
    closeFullPhotto();
  }
}

// Функции работы с модальными окнами
function openFullPhoto(evt) {
  evt.preventDefault();

  // Запрещаем прокрутку body
  document.body.classList.add('modal-open');

  fullScreenContainer.classList.remove('hidden');

  document.addEventListener('keydown', onKeyDownHandler);
  closeFullScreenBtn.addEventListener('click', closeFullPhotto);
}

function closeFullPhotto() {
  fullScreenContainer.classList.add('hidden');

  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onKeyDownHandler);
  closeFullScreenBtn.removeEventListener('click', closeFullPhotto);
  loadMoreCommentsBtn.removeEventListener('click', showMoreComments); // При закрытии попапа - удаляем обработчик, установленный в ./gallery.js
}

export {openFullPhoto};
