const Avatar = {WIDTH: 35, HEIGHT: 35};
const commentsTemplate = document.querySelector('#comment').content;

function drawComment(commentContainer, {avatar, name, message}) {
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

  commentContainer.append(comment);
}

export {drawComment};
