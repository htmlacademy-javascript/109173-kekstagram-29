import {hasClass, getRandUniqElemsFromArr, debounce} from './utils.js';

const RANDOM_PICTURES_COUNT = 10;
const FilterIDs = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const imageFiltersContainer = document.querySelector('.img-filters');

const GalleryFilter = {
  init(settings) {
    imageFiltersContainer.classList.remove('img-filters--inactive');

    imageFiltersContainer.addEventListener('click', (evt) => {
      const target = evt.target;

      // Не обрабатываем клики на уже активном элементе и на чем либо, кроме кнопок фильтров
      if (hasClass('img-filters__button--active', target.classList) ||
         !hasClass('img-filters__button', target.classList)) {
        return;
      }

      // Сбрасываем предыдущую активную кнопку фильтра. Активируем текущую.
      document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      target.classList.add('img-filters__button--active');

      // Вызываем фильтр
      const filterId = target.id;

      switch(filterId) {
        case FilterIDs.RANDOM: { // Случайные фотографии в количестве RANDOM_PICTURES_COUNT штук
          const randomPictures = this.getRandPictures(settings.photosData);
          debounce(() => settings.renderer(randomPictures))();
          break;
        }

        case FilterIDs.DISCUSSED: { // Фотографии, отсортированные по количеству лайков
          const mostDiscussed = this.getSortedByLikes(settings.photosData);
          debounce(() => settings.renderer(mostDiscussed))();
          break;
        }

        default: {
          debounce(() => settings.renderer(settings.photosData))();
          break;
        }
      }
    });
  },

  getRandPictures(picturesArr, picturesCount = RANDOM_PICTURES_COUNT) {
    return getRandUniqElemsFromArr(picturesArr, picturesCount);
  },

  getSortedByLikes(picturesArr) {
    const result = picturesArr.slice();

    return result.sort((picA, picB) => picB.likes - picA.likes);
  }
};

export {GalleryFilter};
