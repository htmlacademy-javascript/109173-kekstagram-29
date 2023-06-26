import {isEscapeKey} from './utils.js';

const thumbnailsContainer = document.querySelector('.pictures.container');
const fullScreenContainer = document.querySelector('.big-picture');
const closeFullScreenBtn = document.querySelector('.big-picture__cancel');

const bigPictureImg = document.querySelector('.big-picture__img > img');
const photoDescription = document.querySelector('.social__caption');
const likesCounter = document.querySelector('.likes-count');
const commentsCounter = document.querySelector('.comments-count');

// Обработчики
thumbnailsContainer.addEventListener('click', (evt) => {
  evt.preventDefault();

  const target = evt.target;

  if (target.matches('.picture__img')) {
    setFullPhotoData(target);
    openFullPhoto(target);
  }
});

function onKeyDownHandler(evt) {
  if(isEscapeKey(evt)) {
    closeFullPhotto();
  }
}


// Функции работы с модальными окнами
function openFullPhoto() {
  fullScreenContainer.classList.remove('hidden');

  document.addEventListener('keydown', onKeyDownHandler);
  closeFullScreenBtn.addEventListener('click', closeFullPhotto);
}

function closeFullPhotto() {
  fullScreenContainer.classList.add('hidden');

  document.removeEventListener('keydown', onKeyDownHandler);
  closeFullScreenBtn.removeEventListener('click', closeFullPhotto);
}

function setFullPhotoData(target) {
  const targetContainer = target.closest('.picture');
  const targetLikesCount = targetContainer.querySelector('.picture__info > .picture__likes').textContent;
  const targetCommentsCount = targetContainer.querySelector('.picture__info > .picture__comments').textContent;

  bigPictureImg.src = target.src;
  likesCounter.textContent = targetLikesCount;
  commentsCounter.textContent = targetCommentsCount;
}
