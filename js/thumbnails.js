const thumbnailTemplate = document.querySelector('#picture').content;
const picturesContainer = document.querySelector('.pictures.container');

function getThumbnail({id, url, description, likes, comments}) {
  if (arguments.length <= 0) {
    return null;
  }

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
  likesContainer.textContent = likes.length || 0;

  const thumbnail = document.createDocumentFragment();
  thumbnail.append(thumbnailElem);

  return thumbnail;
}

function drawThumbnails(pictData) {
  const picturesList = document.createDocumentFragment();

  for (const pictDataElem of pictData) {
    // Соберем все фото в фрагмент, чтобы избежать множественной перерисовки DOM
    picturesList.append(getThumbnail(pictDataElem));
  }

  // Добавляем все фотографии настраницу разом
  picturesContainer.append(picturesList);
}

export {drawThumbnails};
