import {drawThumbnails} from './thumbnails.js';
import {openFullPhoto} from './photos-modal.js';
import {getCommentsRenderer, updateCommentsCounter, isAllCommentsLoaded} from './comments.js';
import './forms.js';

const COMMENTS_PER_PAGE = 5; // Количество комментариев, загружающихся под фото за 1 раз

const photosContainer = document.querySelector('.pictures.container');
const fullPhotoContainer = document.querySelector('.big-picture__img > img');
const fullPhotoDescription = document.querySelector('.social__caption');
const likesCountContainer = document.querySelector('.likes-count');
const commentsCounter = document.querySelector('.comments-count');
const commentsContainer = document.querySelector('.social__comments');
const loadMoreCommentsBtn = document.querySelector('.social__comments-loader');

let photosData = null;
let galleryFiltered = false;
let renderComments = null; // Редререр комментариев

//  @param {Object} data - Объект с данными о фотографиях
const setGalleryData = (data) => {
  photosData = data;
};

/*
  @param {Bool} filterApplied - Была ли отфильтрована галерея.
  Параметр необходим, т.к. по умолчинию индекс в массиве с фото
  соответствует id изображения в этом массиве, что дает
  нам простой доступ к фотографии по photosData[curImgId].
  Однако, если отфильтровать фотографии, допустим, по комментариям,
  в таком случае на месте 0 индекса может оказаться фото с другим
  id, например 17. В таком случае, простой доступ по индексу - не подойдет.
  Необходимо пройтись по всему массиву с данными, чтобы найти фото с тем id,
  который нам нужен
*/
const renderGallery = (filterApplied = false) => {
  // Отрисовываем фотографии на странице
  drawThumbnails(photosData);
  galleryFiltered = filterApplied;

  // Добавляем обработчик событий клика по миниатюре через делегирование.
  photosContainer.addEventListener('click', thumbnailClickHandler);
};

const removeThumbnailClickHandler = () => photosContainer.removeEventListener('click', thumbnailClickHandler);

const getCurrentThumbnailData = (target) => {
  const curImgId = parseInt(target.dataset.imgId, 10);
  const currentImgData = !galleryFiltered
    ? photosData[curImgId]
    : photosData.find((image) => image.id === curImgId);

  return currentImgData;
};

const changeLoadCommentsBtnState = (btnShowed = true) => {
  if (btnShowed) {
    loadMoreCommentsBtn.classList.remove('hidden');

    return;
  }

  loadMoreCommentsBtn.classList.add('hidden');
};

const loadCommentsHandler = () => renderComments();

const removeLoadCommentsHandler = () => loadMoreCommentsBtn.removeEventListener('click', loadCommentsHandler);

const initComments = (comments) => {
  commentsContainer.innerHTML = ''; // Очищаем от старых комментариев

  if (comments.length > 0) { // Отрисовываем комментарии
    renderComments = getCommentsRenderer(comments, commentsContainer, COMMENTS_PER_PAGE);

    renderComments();
    changeLoadCommentsBtnState();

    loadMoreCommentsBtn.addEventListener('click', loadCommentsHandler); // Добавляем обработчик на кнопку загрузки доп. комментариев
  }

  // Если все комментарии загружены - скрыть кнопку загрузки
  if (isAllCommentsLoaded(comments.length)) {
    changeLoadCommentsBtnState(false);
  }

  updateCommentsCounter(); // Обновляем счетчик комментариев
};

const setFullPhotoData = (currentImg) => {
  const {url, description, likes, comments} = currentImg;

  fullPhotoContainer.src = url;
  fullPhotoDescription.textContent = description;
  likesCountContainer.textContent = likes || 0;
  commentsCounter.textContent = comments.length || 0;

  initComments(comments);
};

function thumbnailClickHandler(evt) {
  const targetParent = evt.target.closest('.picture');

  if (!targetParent) {
    return;
  }

  evt.preventDefault(); // Предотвращаем открытие ссылки

  // Загружаем данные о фотографии, по которой кликнули, в модальное окно
  const target = targetParent.querySelector('.picture__img');
  const currentImgData = getCurrentThumbnailData(target);

  setFullPhotoData(currentImgData);
  openFullPhoto(); // Открываем модальное окно
}

export {setGalleryData, renderGallery, removeThumbnailClickHandler, removeLoadCommentsHandler};
