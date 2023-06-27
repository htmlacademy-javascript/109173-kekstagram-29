import {createPhotos} from './dataGenerators.js';
import {drawThumbnail} from './drawThumbnails.js';
import {openFullPhoto} from './photosModal.js';
import {getCommentsRenderer, showMoreComments} from './drawComments.js';

const COMMENTS_PER_PAGE = 5; // Количество комментариев, отображающихся за 1 раз

const photosData = createPhotos(); // Генерируем рандомные данные о фотографиях

const fullPhotoContainer = document.querySelector('.big-picture__img > img');
const likesCountContainer = document.querySelector('.likes-count');
const commentsCountContainer = document.querySelector('.comments-count');
const commentsContainer = document.querySelector('.social__comments');
const loadMoreCommentsBtn = document.querySelector('.social__comments-loader');

// Отрисовываем фотографии на странице
for (const photoDataElem of photosData) {
  drawThumbnail(photoDataElem);

  // Фото, которое мы только что вставили
  const thumbnail = document.querySelector(`img[src="${photoDataElem.url}"]`);
  addThumnailClickHandler(thumbnail, photoDataElem);
}

// Обработчик событий клика по миниатюре
function addThumnailClickHandler(thumbnail, {url, likes, comments}) {
  thumbnail.addEventListener('click', (evt) => {
    // Загружаем данные фото, по которому кликнули
    fullPhotoContainer.src = url;
    likesCountContainer.textContent = likes || 0;
    commentsCountContainer.textContent = comments.length || 0;

    if (comments.length > 0) {
      commentsContainer.innerHTML = ''; // Очищаем от старых комментариев

      const drawComments = getCommentsRenderer();
      drawComments(comments, commentsContainer, 0, COMMENTS_PER_PAGE);

      loadMoreCommentsBtn.addEventListener('click', showMoreComments); // Добавляем обработчик на кнопку загрузки доп. комментариев
    }

    openFullPhoto(evt); // Открываем модальное окно
  });
}
