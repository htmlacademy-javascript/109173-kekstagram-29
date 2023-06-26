import {createPhotos} from './dataGenerators.js';
import {drawThumbnail} from './drawThumbnails.js';
import {openFullPhoto} from './photosModal.js';
import {drawComment} from './drawComments.js';

const photosData = createPhotos(); // Генерируем рандомные данные о фотографиях

// Отрисовываем фотографии на странице
for (const photoDataElem of photosData) {
  drawThumbnail(photoDataElem);

  // Фото, которое мы только что вставили
  const thumbnail = document.querySelector(`img[src="${photoDataElem.url}"]`);
  addThumnailClickHandler(thumbnail, photoDataElem);
}

function addThumnailClickHandler(thumbnail, data) {
  thumbnail.addEventListener('click', (evt) => {
    loadDataToModal(data); // Загружаем данные фото, по которому кликнули
    openFullPhoto(evt);
  });
}

// Функция загрузки данных о фотографии в модальное окно
const fullPhotoContainer = document.querySelector('.big-picture__img > img');
const likesCountContainer = document.querySelector('.likes-count');
const commentsCountContainer = document.querySelector('.comments-count');

const commentsContainer = document.querySelector('.social__comments');

function loadDataToModal(data) {
  fullPhotoContainer.src = data.url;
  likesCountContainer.textContent = data.likes || 0;
  commentsCountContainer.textContent = data.comments.length || 0;

  if (data.comments.length > 0) {
    for (const comment of data.comments) {
      drawComment(commentsContainer, comment);
    }
  }
}
