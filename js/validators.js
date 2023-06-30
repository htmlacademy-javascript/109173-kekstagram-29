import {isValidHashTag} from './utils.js';

const MAX_TAGS_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;

function hashTags(tagsStr) {
  const normillizedStr = tagsStr.trim();

  if (normillizedStr !== '') {
    const tags = normillizedStr.split(' ');
    const usedTags = new Set(tags);

    // Не больше MAX_TAGS_COUNT тегов на фотографии
    if (tags.length > MAX_TAGS_COUNT) {
      return false;
    }

    // Проверяем каждый тег
    if (tags.length > 0) {
      for (const tag of tags) {
        // Тег должен быть валидным и не должен использоваться повторно
        if (!isValidHashTag(tag) || usedTags.has(tag.toLowerCase())) {
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
