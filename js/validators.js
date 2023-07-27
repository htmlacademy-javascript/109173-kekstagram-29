const MAX_TAGS_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;

// Валидаторы
const isValidHashTag = (hashTagStr) => {
  const regex = /^#[\w\dёЁа-яА-Я]{1,19}$/gi;

  return regex.test(hashTagStr);
};

// Валидаторы хэш-тегов
const getNormallizedHashTags = (tagsStr) => {
  const tagsArr = tagsStr.trim().split(' ');
  const results = [];

  tagsArr.map((tag) => {
    if (tag) {
      results.push(tag.toLowerCase());
    }
  });

  return results;
};

const checkTagsSemantics = (tagsStr) => {
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
};

const checkTagsCount = (tagsStr) => {
  const tags = getNormallizedHashTags(tagsStr);

  // Не больше MAX_TAGS_COUNT тегов на фотографии
  return tags.length <= MAX_TAGS_COUNT;
};

const checkTagsUniq = (tagsStr) => {
  const tags = getNormallizedHashTags(tagsStr);

  /* т.к. Set возвращает массив только из уникальных элементов
  мы легко можем использовать эту особенность для проверки
  исходного массива на уникальность. Если после "уникализации"
  длины массивов не равны - значит в исходном массиве есть
  повторяющиеся элементы */
  return tags.length === new Set(tags).size;
};

// Валидаторы комментариев
const checkCommentLength = (commentStr) => commentStr.length <= MAX_COMMENT_LENGTH;

export {
  MAX_TAGS_COUNT,
  MAX_COMMENT_LENGTH,
  checkTagsSemantics,
  checkTagsCount,
  checkTagsUniq,
  checkCommentLength,
};
