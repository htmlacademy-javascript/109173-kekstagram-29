const thumbnailTemplate = document.querySelector('#picture').content;
// const picturesContainer = document.querySelector('.pictures.container');

function drawThumbnail({url, description, likes, comments}) {
  if (arguments.length <= 0) {
    return null;
  }

  const thumbnailElem = thumbnailTemplate.cloneNode(true);
  const imageLink = thumbnailElem.querySelector('a.picture');
  imageLink.href = url;

  const image = thumbnailElem.querySelector('img.picture__img');
  image.src = url;
  image.alt = description;

  const commentsContainer = thumbnailElem.querySelector('.picture__comments');
  commentsContainer.textContent = comments.length || 0;
  commentsContainer.textContent = comments.length || 0;

  const likesContainer = thumbnailElem.querySelector('.picture__likes');
  likesContainer.textContent = likes.length || 0;

  const thumbnail = document.createDocumentFragment();
  thumbnail.append(thumbnailElem);

  /* TODO: Переделать:
    Лучше просто возвращать созданное фото, собирать их все в контейнер и аппендить в DOM
    т.к. каждое добавление элемента в DOM - это перерисовка всего DOM и, соответсвтенно -
    бОльшая нагрузка на рендерер
  */
  picturesContainer.append(thumbnail);
}

export {drawThumbnail};
