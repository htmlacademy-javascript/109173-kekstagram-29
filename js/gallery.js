/*
  TODO:
  1) Не удаляется обработчик собитый клика на кнопку "загрузить еще" в блоке комментариев.
  Из за этого часто можно загрузить больше комментариев, чем есть, т.к. срабатывает
  больше 1 обработчика событий за раз.
*/
import {createPhotos} from './dataGenerators.js';
import {drawThumbnails} from './thumbnails.js';
import {openFullPhoto} from './photosModal.js';
import {getCommentsRenderer, updateCommentsCounter, isAllCommentsLoaded} from './drawComments.js';

const COMMENTS_PER_PAGE = 5; // Количество комментариев, загружающихся под фото за 1 раз

const pictData = createPhotos(); // Генерируем рандомные данные о фотографиях

const picturesContainer = document.querySelector('.pictures.container');
const fullPictureContainer = document.querySelector('.big-picture__img > img');
const likesCountContainer = document.querySelector('.likes-count');
const commentsCounter = document.querySelector('.comments-count');
const commentsContainer = document.querySelector('.social__comments');
const loadMoreCommentsBtn = document.querySelector('.social__comments-loader');

// Отрисовываем фотографии на странице
drawThumbnails(pictData);

// Добавляем обработчик событий клика по миниатюре через делегирование
picturesContainer.addEventListener('click', (evt) => {
  evt.preventDefault();
  const target = evt.target;

  if (target.className !== 'picture__img') {
    return;
  }

  const curPictId = target.dataset.imgId;
  const {url, likes, comments} = pictData[curPictId - 1];

  fullPictureContainer.src = url;
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