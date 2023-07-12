import {getData} from './server-api.js';
import {renderGallery} from './gallery.js';
import {showError, debounce} from './utils.js';
import {initGalleryFilters} from './gallery-filters.js';
import './gallery.js';

// Получаем данные о фотографиях с сервера
getData()
  .then((photosData) => {

    // Инициализируем фильтрацию изображений
    initGalleryFilters({
      photosData: photosData,
      callback: debounce(renderGallery),
    });

    // Первая, дефолтная отрисовка галереи без фильтрации
    renderGallery(photosData);
  })
  .catch((error) => {
    showError(error);
  });
