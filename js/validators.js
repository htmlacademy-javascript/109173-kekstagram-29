import {isValidHashTag} from './utils.js';

const MAX_COMMENT_LENGTH = 140;

function hashTags(tagsStr) {
  const normillizedStr = tagsStr.trim();

  if (normillizedStr !== '') {
    const tags = normillizedStr.split(' ');

    if (tags.length > 0) {
      for (const tag of tags) {
        if (!isValidHashTag(tag)) {
          return false;
        }
      }
    }
  }

  return true;
}

function comment(commentStr) {
  return !(commentStr.length > MAX_COMMENT_LENGTH);
}

export {
  hashTags,
  comment,
};
