const Avatar = {WIDTH: 35, HEIGHT: 35};
const commentsTemplate = document.querySelector('#comment').content;

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
function getCommentsRenderer(comments, container, commentsCount) {
  let startIndex = 0;

  // Проверяем выход за пределы массива
  if (comments[startIndex + commentsCount] === 'undefined') {
    commentsCount = comments.slice(startIndex - 1).length;
  }

  return function () {
    for (let i = 0; i < commentsCount; i++) {
      const currentCommentIndex = startIndex + i;

      drawComment(container, comments[currentCommentIndex]);
    }

    startIndex += commentsCount
  };
}

export {drawComment, getCommentsRenderer};
