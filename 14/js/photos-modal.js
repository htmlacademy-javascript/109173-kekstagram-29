import {isEscapeKey} from './utils.js';
import {removeLoadCommentsHandler} from './gallery.js';

const fullPhotoContainer = document.querySelector('.big-picture');
const closeFullPhotoBtn = document.querySelector('.big-picture__cancel');

function keyDownHandler(evt) {
  if(isEscapeKey(evt)) {
    closeFullPhoto();
  }
}

// Функции работы с модальными окнами
function openFullPhoto() {
  document.body.classList.add('modal-open'); // Запрещаем прокрутку body
  fullPhotoContainer.classList.remove('hidden'); // Открываем попап с фото

  document.addEventListener('keydown', keyDownHandler);
  closeFullPhotoBtn.addEventListener('click', closeFullPhoto);
}

function closeFullPhoto() {
  fullPhotoContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', keyDownHandler);
  closeFullPhotoBtn.removeEventListener('click', closeFullPhoto);

  // Удаляем обработчик с кнопки загрузки комментариев
  removeLoadCommentsHandler();
}

export {openFullPhoto};
