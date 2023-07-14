const MAX_TAGS_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;

// Валидаторы
function isValidHashTag(hashTagStr) {
  const regex = /^#[\w\dа-яА-Я]{1,19}$/gi;

  return regex.test(hashTagStr);
}

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
  return tags.length <= MAX_TAGS_COUNT;
}

function checkTagsUniq(tagsStr) {
  const tags = getNormallizedHashTags(tagsStr);

  /* т.к. Set возвращает массив только из уникальных элементов
  мы легко можем использовать эту особенность для проверки
  исходного массива на уникальность. Если после "уникализации"
  длины массивов не равны - значит в исходном массиве есть
  повторяющиеся элементы */
  return tags.length === new Set(tags).size;
}

function getNormallizedHashTags(tagsStr) {
  const tagsArr = tagsStr.trim().split(' ');
  const result = [];

  tagsArr.map((tag) => {
    if (tag) {
      result.push(tag.toLowerCase());
    }
  });

  return result;
}

// Валидаторы комментариев
function checkComment(commentStr) {
  return commentStr.length <= MAX_COMMENT_LENGTH;
}

export {
  MAX_TAGS_COUNT,
  MAX_COMMENT_LENGTH,
  checkTagsSemantics,
  checkTagsCount,
  checkTagsUniq,
  checkComment,
};
