import {isValidHashTag} from './utils.js';

const MAX_TAGS_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;

// Валидаторы хэш-тегов
function checkTagsSemantics(tagsStr) {
  const tags = getNormallizedHashTags(tagsStr);

  // Проверяем каждый тег
  if (tags.length > 0) {
    for (const tag of tags) {
      if (!isValidHashTag(tag)) {
        return false;
      }
    }
  }

  return true;
}


function checkTagsCount(tagsStr) {
  const tags = getNormallizedHashTags(tagsStr);

  // Не больше MAX_TAGS_COUNT тегов на фотографии
  if (tags.length > MAX_TAGS_COUNT) {
    return false;
  }

  return true;
}

function checkTagsUniq(tagsStr) {
  const tags = getNormallizedHashTags(tagsStr);

  // Проверяем каждый тег
  if (tags.length > 0) {
    const usedTags = new Set();

    for (const tag of tags) {
      // Тег должен быть валидным и не должен использоваться повторно
      if (usedTags.has(tag)) {
        return false;
      }

      usedTags.add(tag);
    }
  }

  return true;
}

function getNormallizedHashTags(tagsStr) {
  if (tagsStr.length <= 0) {
    return [];
  }

  const tagsArr = tagsStr.trim().split(' ');
  const tags = tagsArr.map((tag) => tag.toLowerCase());
  return tags;
}

// Валидаторы комментариев
function checkComment(commentStr) {
  return !(commentStr.length > MAX_COMMENT_LENGTH);
}

export {
  MAX_TAGS_COUNT,
  MAX_COMMENT_LENGTH,
  checkTagsSemantics,
  checkTagsCount,
  checkTagsUniq,
  checkComment,
};
