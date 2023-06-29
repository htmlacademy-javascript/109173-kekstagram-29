/*
  TODO:
  1) Не удаляется обработчик собитый клика на кнопку "загрузить еще" в блоке комментариев.
  Из за этого часто можно загрузить больше комментариев, чем есть, т.к. срабатывает
  больше 1 обработчика событий за раз.
*/
import {createPhotos} from './dataGenerators.js';
import {drawThumbnail} from './drawThumbnails.js';
import {openFullPhoto} from './photosModal.js';
import {getCommentsRenderer, updateCommentsCounter, isAllCommentsLoaded} from './drawComments.js';

const COMMENTS_PER_PAGE = 5; // Количество комментариев, загружающихся под фото за 1 раз

const photosData = createPhotos(); // Генерируем рандомные данные о фотографиях

const fullPhotoContainer = document.querySelector('.big-picture__img > img');
const likesCountContainer = document.querySelector('.likes-count');
const commentsCounter = document.querySelector('.comments-count');
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
    commentsCounter.textContent = comments.length || 0;
    commentsContainer.innerHTML = ''; // Очищаем от старых комментариев

    if (comments.length > 0) {
      const drawComments = getCommentsRenderer(comments, commentsContainer, COMMENTS_PER_PAGE);
      drawComments();

      loadMoreCommentsBtn.classList.remove('hidden');
      // loadMoreCommentsBtn.addEventListener('click', drawComments); // Добавляем обработчик на кнопку загрузки доп. комментариев
      loadMoreCommentsBtn.onclick = drawComments; // Временное решение, т.к. непонятно пока, как удалять обработчик при закрытии окна в ./photosModal.js
    }

    // Если все комментарии загружены - скрыть кнопку загрузки
    if (isAllCommentsLoaded(comments.length)) {
      loadMoreCommentsBtn.classList.add('hidden');
    }

    updateCommentsCounter(); // Обновляем счетчик комментариев
    openFullPhoto(evt); // Открываем модальное окно
  });
}
