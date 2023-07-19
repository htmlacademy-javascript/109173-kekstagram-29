/*
  TODO: При перерисовке галереи не снимается обработчик с
  общего контейнера .pictures.container, а каждый раз устанавливается
  новое дополнительное событие.
  UPD: Временно решено с помощью onclick - Переделать на addEventListener
*/
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

/*
  @param {Object} photosData - Объект с данными о фотографиях
  @param {Bool} filterApplied - Была ли отфильтрована галерея.
  Параметр необходим, т.к. по умолчинию индекс в массиве с фото
  соответствует id изображения в этом массиве, что дает
  нам простой доступ к фотографии по pictData[curPictId].
  Однако, если отфильтровать фотографии, допустим, по лайкам,
  в таком случае на месте 0 индекса может оказаться фото с другим
  id, например 17. В таком случае, простой доступ по индексу - не подойдет.
  Необходимо пройтись по всему массиву с данными, чтобы найти фото с тем id,
  который нам нужен
*/
function renderGallery(photosData, filterApplied = false) {
  // Отрисовываем фотографии на странице
  drawThumbnails(photosData);

  // Добавляем обработчик событий клика по миниатюре через делегирование.
  photosContainer.onclick = (evt) => {
    const targetParent = evt.target.closest('.picture');

    if (!targetParent) {
      return;
    }

    evt.preventDefault(); // Предотвращаем открытие ссылки

    // Загружаем данные о фотографии, по которой кликнули, в модальное окно
    const target = targetParent.querySelector('.picture__img');
    const curImgId = parseInt(target.dataset.imgId, 10);
    const currentImg = !filterApplied ? photosData[curImgId] : photosData.find((image) => image.id === curImgId);

    setFullPhotoData(currentImg);
    openFullPhoto(evt); // Открываем модальное окно
  };
}

function setFullPhotoData(currentImage) {
  const {url, description, likes, comments} = currentImage;

  fullPhotoContainer.src = url;
  fullPhotoDescription.textContent = description;
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
}

export {renderGallery};
