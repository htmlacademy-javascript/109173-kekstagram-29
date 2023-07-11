const Avatar = {WIDTH: 35, HEIGHT: 35};
const commentsTemplate = document.querySelector('#comment').content;
const showedComments = document.querySelector('.social__comments').children;
const showedCommentsCounter = document.querySelector('.showed-comments-count');
const loadMoreCommentsBtn = document.querySelector('.social__comments-loader');

function getComment({avatar, name, message}) {
  const commentElem = commentsTemplate.cloneNode(true);

  const commentAvatar = commentElem.querySelector('.social__picture');
  commentAvatar.src = avatar;
  commentAvatar.alt = name;
  commentAvatar.width = Avatar.WIDTH;
  commentAvatar.height = Avatar.HEIGHT;

  const commentText = commentElem.querySelector('.social__text');
  commentText.textContent = message;

  const comment = document.createDocumentFragment();
  comment.append(commentElem);

  return comment;
}

// Функция для отрисовки определенного количества комментариев
function getCommentsRenderer(comments, container, commentsCount = comments.length, startIndex = 0) {
  return () => {
    if (comments.length <= 0) {
      return;
    }

    commentsCount = (commentsCount > comments.length) ? comments.length : commentsCount;

    const commentsArr = comments.slice(startIndex, startIndex + commentsCount);
    const commentsList = document.createDocumentFragment();

    for (let i = 0; i < commentsArr.length; i++) { // Собираем нужное кол.-во комментариев в коллекцию
      commentsList.append(getComment(commentsArr[i]));
    }

    container.append(commentsList); // Добавляем собранные комментарии в DOM

    // Если все комментарии загружены - скрыть кнопку загрузки
    if (isAllCommentsLoaded(comments.length)) {
      loadMoreCommentsBtn.classList.add('hidden');
    }

    startIndex += commentsCount;
    updateCommentsCounter();
  };
}

function getShowedCommentsCount() {
  return showedComments.length;
}

function updateCommentsCounter() {
  showedCommentsCounter.textContent = getShowedCommentsCount();
}

function isAllCommentsLoaded(commentsCount) {
  return getShowedCommentsCount() === commentsCount;
}

export {getCommentsRenderer, updateCommentsCounter, isAllCommentsLoaded};
