import {hasClass, getRandomElemsFromArr} from './utils.js';

const RANDOM_PICTURES_COUNT = 10;

const imageFiltersContainer = document.querySelector('.img-filters');

const GalleryFilter = {
  init(settings) {
    imageFiltersContainer.classList.remove('img-filters--inactive');

    imageFiltersContainer.addEventListener('click', (evt) => {
      const target = evt.target;

      // Не обрабатываем клики на уже активном элементе
      if (hasClass('img-filters__button--active', target.classList)) {
        return;
      }

      // Сбрасываем предыдущую активную кнопку фильтра. Активируем текущую.
      document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      target.classList.add('img-filters__button--active');

      // Вызываем переданный коллбэк
      console.log(settings);
    });
  },

  getRandom(picturesCount = RANDOM_PICTURES_COUNT) {
  }
};

export {GalleryFilter};
