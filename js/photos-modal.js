import {isEscapeKey} from './utils.js';
import {removeLoadCommentsHandler} from './gallery.js';

const fullPhotoContainer = document.querySelector('.big-picture');
const closeFullPhotoBtn = document.querySelector('.big-picture__cancel');

// Функции работы с модальными окнами
const openFullPhoto = () => {
  document.body.classList.add('modal-open'); // Запрещаем прокрутку body
  fullPhotoContainer.classList.remove('hidden'); // Открываем попап с фото

  document.addEventListener('keydown', keyDownHandler);
  closeFullPhotoBtn.addEventListener('click', closeFullPhotoHandler);
};

const closeFullPhoto = () => {
  fullPhotoContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', keyDownHandler);
  closeFullPhotoBtn.removeEventListener('click', closeFullPhotoHandler);

  // Удаляем обработчик с кнопки загрузки комментариев
  removeLoadCommentsHandler();
};

function keyDownHandler(evt) {
  if(isEscapeKey(evt)) {
    closeFullPhoto();
  }
}

function closeFullPhotoHandler() {
  closeFullPhoto();
}

export {openFullPhoto};
