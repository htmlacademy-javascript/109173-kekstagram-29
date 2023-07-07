// import {createPhotos} from './dataGenerators.js';
import {getData} from './serverApi.js';
import {drawThumbnails} from './thumbnails.js';
import {openFullPhoto} from './photosModal.js';
import {getCommentsRenderer, updateCommentsCounter, isAllCommentsLoaded} from './comments.js';
import {hasClass, showError,} from './utils.js';
import './forms.js';

const COMMENTS_PER_PAGE = 5; // Количество комментариев, загружающихся под фото за 1 раз

const picturesContainer = document.querySelector('.pictures.container');
const fullPictureContainer = document.querySelector('.big-picture__img > img');
const fullPictureDescription = document.querySelector('.social__caption');
const likesCountContainer = document.querySelector('.likes-count');
const commentsCounter = document.querySelector('.comments-count');
const commentsContainer = document.querySelector('.social__comments');
const loadMoreCommentsBtn = document.querySelector('.social__comments-loader');
const imageFiltersContainer = document.querySelector('.img-filters');

// Получаем данные о фотографиях с сервера
getData()
  .then((pictData) => {

    // Показываем блок фильтров
    imageFiltersContainer.classList.remove('img-filters--inactive');

    imageFiltersContainer.addEventListener('click', (evt) => {
      const target = evt.target;

      // Не обрабатываем клики на уже активном элементе
      if (hasClass('img-filters__button--active', target.classList)) {
        return;
      }
      console.log(evt.target);
    });

    renderGallery(pictData);
  })
  .catch((error) => {
    showError(error);
  });

function renderGallery(pictData) {
  // Отрисовываем фотографии на странице
  drawThumbnails(pictData);

  // Добавляем обработчик событий клика по миниатюре через делегирование
  picturesContainer.addEventListener('click', (evt) => {
    const target = evt.target;

    if (target.className !== 'picture__img') {
      return;
    }

    evt.preventDefault(); // Предотвращаем открытие ссылки

    // Загружаем данные о фотографии, по которой кликнули, в модальное окно
    const curPictId = target.dataset.imgId;
    const {url, description, likes, comments} = pictData[curPictId];

    fullPictureContainer.src = url;
    fullPictureDescription.textContent = description;
    likesCountContainer.textContent = likes || 0;
    commentsCounter.textContent = comments.length || 0;
    commentsContainer.innerHTML = ''; // Очищаем от старых комментариев

    if (comments.length > 0) { // Отрисовываем комментарии
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
