const Avatar = {WIDTH: 35, HEIGHT: 35};
const commentsTemplate = document.querySelector('#comment').content;
const showedComments = document.querySelector('.social__comments').children;
const commentsCounter = document.querySelector('.social__comment-count');

function drawComment(container, {avatar, name, message}) {
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

  container.append(comment);
}

// Функция для отрисовки определенного количества комментариев
function getCommentsRenderer(comments, container, commentsCount = comments.length, startIndex = 0) {
  return () => {
    if (comments.length <= 0) {
      return;
    }

    commentsCount = (commentsCount > comments.length) ? comments.length : commentsCount;

    const commentsArr = comments.slice(startIndex, startIndex + commentsCount);

    for (let i = 0; i < commentsArr.length; i++) {
      drawComment(container, commentsArr[i]);
    }

    startIndex += commentsCount;
    updateCommentsCounter();
  };
}

function getShowedCommentsCount() {
  return showedComments.length;
}

function updateCommentsCounter() {
  commentsCounter.firstChild.textContent = `${getShowedCommentsCount()} из `;
}

export {getCommentsRenderer, updateCommentsCounter};
