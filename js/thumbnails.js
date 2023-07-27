import {removeThumbnailClickHandler} from './gallery.js';

const thumbnailTemplate = document.querySelector('#picture').content;
const picturesContainer = document.querySelector('.pictures.container');

const getThumbnail = ({id, url, description, likes, comments}) => {
  const thumbnailElem = thumbnailTemplate.cloneNode(true);
  const imageLink = thumbnailElem.querySelector('a.picture');
  imageLink.href = url;

  const image = thumbnailElem.querySelector('img.picture__img');
  image.src = url;
  image.alt = description;
  image.dataset.imgId = id;

  const commentsContainer = thumbnailElem.querySelector('.picture__comments');
  commentsContainer.textContent = comments.length || 0;

  const likesContainer = thumbnailElem.querySelector('.picture__likes');
  likesContainer.textContent = likes || 0;

  const thumbnail = document.createDocumentFragment();
  thumbnail.append(thumbnailElem);

  return thumbnail;
};

const removeThumbnails = () => {
  const thumbnails = document.querySelectorAll('.picture');

  if (!thumbnails.length) {
    return;
  }

  for (let i = 0; i < thumbnails.length; i++) {
    thumbnails[i].remove();
  }

  // Удаляем обработчик события клика по миниатюрам
  removeThumbnailClickHandler();
};

const drawThumbnails = (pictData) => {
  const picturesList = document.createDocumentFragment();

  for (const pictDataElem of pictData) {
    // Соберем все фото в фрагмент, чтобы избежать множественной перерисовки DOM
    const thumbnail = getThumbnail(pictDataElem);

    picturesList.append(thumbnail);
  }

  // Добавляем все фотографии настраницу разом
  removeThumbnails(); // Удаление отрисованных ранее фото, если такие есть (для работы фильтров)
  picturesContainer.append(picturesList);
};

export {drawThumbnails};
