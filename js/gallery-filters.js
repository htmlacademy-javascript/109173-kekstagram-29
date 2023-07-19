import {setGalleryData} from './gallery.js';
import {getRandUniqElemsFromArr} from './utils.js';

const ACTIVE_BTN_CLASS = 'img-filters__button--active';
const RANDOM_PHOTOS_COUNT = 10;
const Filter = {
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
    if (isActiveFilter(target)) {
      return;
    }

    // Сбрасываем предыдущую активную кнопку фильтра. Активируем текущую.
    toogleBtnActiveClass(target);

    // Меняем фильтр
    const filterID = target.id;

    setFilter(filterID, settings);
  });
}

function isActiveFilter(target) {
  if (target.classList.contains(ACTIVE_BTN_CLASS) || // Если кликаем по уже активному фильтру
    !target.classList.contains('img-filters__button')) { // Если кликаем по самому контейнеру фильтров, а не по кнопкам
    return true;
  }

  return false;
}

function toogleBtnActiveClass(target) {
  document.querySelector(`.${ACTIVE_BTN_CLASS}`).classList.remove(ACTIVE_BTN_CLASS);
  target.classList.add(ACTIVE_BTN_CLASS);
}

function setFilter(filterID, settings) {
  const photos = settings.photosData.slice();
  let filterApplied = false;

  switch(filterID) {
    case Filter.RANDOM: { // Случайные фотографии в количестве RANDOM_PICTURES_COUNT штук
      const randomPictures = getRandPhotos(photos);
      setGalleryData(randomPictures);
      filterApplied = true;
      break;
    }

    case Filter.DISCUSSED: { // Фотографии, отсортированные по количеству комментариев
      const mostDiscussed = getSortedByComments(photos);
      setGalleryData(mostDiscussed);
      filterApplied = true;
      break;
    }

    default: {
      setGalleryData(photos);
      break;
    }
  }

  // Перерисовываем отсортированную галерею
  settings.callback(filterApplied);
}

function getRandPhotos(photosArr, photosCount = RANDOM_PHOTOS_COUNT) {
  return getRandUniqElemsFromArr(photosArr, photosCount);
}

function getSortedByComments(photosArr) {
  return photosArr.sort((picA, picB) => picB.comments.length - picA.comments.length);
}

export {initGalleryFilters};
