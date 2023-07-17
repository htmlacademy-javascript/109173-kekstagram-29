import {getRandUniqElemsFromArr} from './utils.js';

const RANDOM_PICTURES_COUNT = 10;
const FilterID = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const imageFiltersContainer = document.querySelector('.img-filters');

function initGalleryFilters(settings) {
  imageFiltersContainer.classList.remove('img-filters--inactive');

  imageFiltersContainer.addEventListener('click', (evt) => {
    const target = evt.target;

    // Не обрабатываем клики на уже активном элементе и на чем либо, кроме кнопок фильтров
    if (target.classList.contains('img-filters__button--active') ||
      !target.classList.contains('img-filters__button')) {
      return;
    }

    // Сбрасываем предыдущую активную кнопку фильтра. Активируем текущую.
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    target.classList.add('img-filters__button--active');

    // Меняем фильтр
    const filterID = target.id;

    setFilter(filterID, settings);
  });
}

function setFilter(filterID, settings) {
  switch(filterID) {
    case FilterID.RANDOM: { // Случайные фотографии в количестве RANDOM_PICTURES_COUNT штук
      const randomPictures = getRandPictures(settings.photosData);
      settings.callback(randomPictures, true);
      break;
    }

    case FilterID.DISCUSSED: { // Фотографии, отсортированные по количеству комментариев
      const mostDiscussed = getSortedByComments(settings.photosData);
      settings.callback(mostDiscussed, true);
      break;
    }

    default: {
      settings.callback(settings.photosData);
      break;
    }
  }
}

function getRandPictures(picturesArr, picturesCount = RANDOM_PICTURES_COUNT) {
  return getRandUniqElemsFromArr(picturesArr, picturesCount);
}

function getSortedByComments(picturesArr) {
  const result = picturesArr.slice();

  return result.sort((picA, picB) => picB.comments.length - picA.comments.length);
}

export {initGalleryFilters};
