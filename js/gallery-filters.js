import {getRandUniqElemsFromArr} from './utils.js';

const RANDOM_PHOTOS_COUNT = 10;
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
  const photos = settings.photosData.slice();

  switch(filterID) {
    case FilterID.RANDOM: { // Случайные фотографии в количестве RANDOM_PICTURES_COUNT штук
      const randomPictures = getRandPhotos(photos);
      settings.callback(randomPictures, true);
      break;
    }

    case FilterID.DISCUSSED: { // Фотографии, отсортированные по количеству комментариев
      const mostDiscussed = getSortedByComments(photos);
      settings.callback(mostDiscussed, true);
      break;
    }

    default: {
      settings.callback(photos);
      break;
    }
  }
}

function getRandPhotos(photosArr, photosCount = RANDOM_PHOTOS_COUNT) {
  return getRandUniqElemsFromArr(photosArr, photosCount);
}

function getSortedByComments(photosArr) {
  return photosArr.sort((picA, picB) => picB.comments.length - picA.comments.length);
}

export {initGalleryFilters};
