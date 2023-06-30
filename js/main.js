import {createPhotos} from './dataGenerators.js';
import {drawThumbnail} from './drawThumbnails.js';

const photosData = createPhotos(); // Генерируем рандомные данные о фотографиях

// Отрисовываем фотографии на странице
for (const photoDataElem of photosData) {
  drawThumbnail(photoDataElem);
}
