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
    initValue: 3,
    max: 3,
    step: 0.1,
    units: 'px'
  },
  heat: { // Зной
    cssName: 'brightness',
    initValue: 3,
    max: 3,
    step: 0.1,
  },
};

const uploadImgForm = document.querySelector('.img-upload__form');
const editingImage = document.querySelector('.img-upload__preview > img');
const currentScale = document.querySelector('.scale__control--value');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLvl = document.querySelector('.effect-level__value');

let currentFilter = null;

// Работа с размерами изображения
function changeImgScale(evt) {
  const target = evt.target;
  let scaleAmount = parseInt(currentScale.value, 10);

  if (target.classList.contains('scale__control--bigger')) {
    scaleAmount += SCALE_STEP;
  } else {
    scaleAmount -= SCALE_STEP;
  }

  // Предотвращение выхода за пределы допустимых значений
  scaleAmount = Math.min(scaleAmount, Scalable.MAX);
  scaleAmount = Math.max(scaleAmount, Scalable.MIN);

  currentScale.value = `${scaleAmount}%`;
  setImageScale(scaleAmount);
}

function setImageScale(scaleAmount) {
  editingImage.style.transform = `scale(${scaleAmount / 100})`;
}

// Наложение фильтров
function changeEffectHandler(evt) {
  const target = evt.target.closest('.effects__radio');

  if (!target) {
    return;
  }

  const filterName = target.value;

  currentFilter = FILTERS[filterName];
  setFilter(currentFilter);
}

function setFilter(filter) {
  let filterStr = '';

  if (filter.cssName) {
    const {cssName = '', initValue, max, step, units = ''} = currentFilter;
    const sliderOptions = {
      range: {
        min: 0,
        max: max,
      },
      start: initValue,
      step: step,
      connect: 'lower',
    };

    filterStr = `${cssName}(${initValue}${units})`;
    initSlider(sliderOptions);
    showSLider();
  } else {
    destroySlider();
  }

  editingImage.style.filter = filterStr;
}

function initSlider(sliderOptions) {
  // Слайдер изменения величины накладываемого эффекта
  if (!sliderElement.noUiSlider) {
    noUiSlider.create(sliderElement, sliderOptions);

    // При изменении значения слайдера - обновляем скрытое поле и изменяем интенсивность фильтра
    sliderElement.noUiSlider.on('update', sliderUpdateHandler);
  } else {
    sliderElement.noUiSlider.updateOptions(sliderOptions);
  }
}

function sliderUpdateHandler() {
  const newEffectValue = sliderElement.noUiSlider.get();
  const {cssName = '', units = ''} = currentFilter;

  effectLvl.value = newEffectValue;
  editingImage.style.filter = `${cssName}(${newEffectValue}${units})`;
}

function showSLider() {
  sliderContainer.classList.remove('hidden');
}

function hideSLider() {
  sliderContainer.classList.add('hidden');
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
  hideSLider();
}

function destroySlider() {
  if (sliderElement.noUiSlider) {
    hideSLider();
    sliderElement.noUiSlider.destroy();
  }
}

export {
  changeImgScale as changeScale,
  changeEffectHandler,
  resetImgEditor,
  destroySlider
};
