import {isEscapeKey} from './utils.js';
import {removeCommentsLoadHandler} from './gallery.js';

const fullPhotoContainer = document.querySelector('.big-picture');
const closeFullPhotoBtn = document.querySelector('.big-picture__cancel');

// Функции работы с модальными окнами
const openFullPhoto = () => {
  document.body.classList.add('modal-open'); // Запрещаем прокрутку body
  fullPhotoContainer.classList.remove('hidden'); // Открываем попап с фото

  document.addEventListener('keydown', documentKeyDownHandler);
  closeFullPhotoBtn.addEventListener('click', fullPhotoCloseHandler);
};

const closeFullPhoto = () => {
  fullPhotoContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', documentKeyDownHandler);
  closeFullPhotoBtn.removeEventListener('click', fullPhotoCloseHandler);

  // Удаляем обработчик с кнопки загрузки комментариев
  removeCommentsLoadHandler();
};

function documentKeyDownHandler(evt) {
  if(isEscapeKey(evt)) {
    closeFullPhoto();
  }
}

function fullPhotoCloseHandler() {
  closeFullPhoto();
}

export {openFullPhoto};
