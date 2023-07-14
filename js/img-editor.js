import {hasClass} from './utils.js';
import {removeFormValidators} from './forms.js';

const Scalable = {MIN: 25, MAX: 100};
const SCALE_STEP = 25;
const FILTERS = {
  none:{}, // Оригинальное изображение
  chrome: { // Хром
    cssName: 'grayscale',
    initValue: 1,
    max: 1,
    step: 0.1,
  },
  sepia: { // Сепия
    cssName: 'sepia',
    initValue: 1,
    max: 1,
    step: 0.1,
  },
  marvin: { // Марвин
    cssName: 'invert',
    initValue: 100,
    max: 100,
    step: 1,
    units: '%',
  },
  phobos: { // Фобос
    cssName: 'blur',
    initValue: 1,
    max: 3,
    step: 0.1,
    units: 'px'
  },
  heat: { // Зной
    cssName: 'brightness',
    initValue: 1.5,
    max: 3,
    step: 0.1,
  },
};

const uploadImgForm = document.querySelector('.img-upload__form');
const editingImage = document.querySelector('.img-upload__preview > img');
const currentScale = document.querySelector('.scale__control--value');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLvl = document.querySelector('.effect-level__value');


// Работа с размерами изображения
function changeScale(evt) {
  const target = evt.target;
  let scaleAmount = parseInt(currentScale.value, 10);

  if (hasClass('scale__control--bigger', target.classList)) {
    scaleAmount += SCALE_STEP;
  } else {
    scaleAmount -= SCALE_STEP;
  }

  if (scaleAmount > Scalable.MAX) {
    scaleAmount = Scalable.MAX;
  }

  if (scaleAmount < Scalable.MIN) {
    scaleAmount = Scalable.MIN;
  }

  currentScale.value = `${scaleAmount}%`;
  changeImageScale(editingImage, scaleAmount);
}

function changeImageScale(image, amount) {
  image.style.transform = `scale(${amount / 100})`;
}

// Наложение фильтров
function changeEffectHandler(evt) {
  const target = evt.target.closest('.effects__radio');

  if (!target) {
    return;
  }

  const filterName = target.value;

  setFilter(editingImage, filterName);
}

function setFilter(image, filterName) {
  let currentFilter = '';

  if (filterName !== 'none') {
    const {cssName = '', initValue, max, step, units = ''} = FILTERS[filterName];
    const sliderOptions = {
      range: {
        min: 0,
        max: max,
      },
      start: initValue,
      step: step,
      connect: 'lower',
    };

    currentFilter = `${cssName}(${initValue}${units})`;

    // Слайдер изменения величины накладываемого эффекта
    if (!sliderElement.noUiSlider) {
      noUiSlider.create(sliderElement, sliderOptions);
    } else {
      sliderElement.noUiSlider.updateOptions(sliderOptions);
    }

    // При изменении значения слайдера - обновляем скрытое поле и изменяем интенсивность фильтра
    sliderElement.noUiSlider.on('update', () => {
      effectLvl.value = sliderElement.noUiSlider.get();

      image.style.filter = `${cssName}(${effectLvl.value}${units})`;
    });
  } else {
    destroySlider();
  }

  image.style.filter = currentFilter;
}

function resetImgEditor() {
  // Сбрасываем размер изображения
  editingImage.style.transform = '';
  currentScale.value = '100%';

  // Сбрасываем значения полей
  uploadImgForm.reset();

  // Сбрасываем фильтры
  editingImage.style.filter = '';

  destroySlider();
  removeFormValidators();
}

function destroySlider() {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
}

export {
  changeScale,
  changeEffectHandler,
  resetImgEditor,
  destroySlider
};
