const Scalable = {MIN: 25, MAX: 100};
const SCALE_STEP = 25;
const FILTERS = {
  none:{}, // Оригинальное изображение
  chrome: { // Хром
    cssName: 'grayscale',
    initValue: 1,
    step: 0.1,
  },
  sepia: { // Сепия
    cssName: 'sepia',
    initValue: 1,
    step: 0.1,
  },
  marvin: { // Марвин
    cssName: 'invert',
    initValue: 100,
    step: 1,
    units: '%',
  },
  phobos: { // Фобос
    cssName: 'blur',
    initValue: 1,
    step: 0.1,
    units: 'px'
  },
  heat: { // Зной
    cssName: 'brightness',
    initValue: 1.5,
    step: 0.1,
  },
};

const editingImage = document.querySelector('.img-upload__preview > img');
const currentScale = document.querySelector('.scale__control--value');

// Работа с размерами изображения
function makeScaleBigger() {
  let scaleAmount = parseInt(currentScale.value, 10);
  scaleAmount += SCALE_STEP;

  if (scaleAmount > Scalable.MAX) {
    scaleAmount = Scalable.MAX;
  }

  currentScale.value = `${scaleAmount}%`;
  changeImageScale(editingImage, scaleAmount);
}

function makeScaleSmaller() {
  let scaleAmount = parseInt(currentScale.value, 10);
  scaleAmount -= SCALE_STEP;

  if (scaleAmount < Scalable.MIN) {
    scaleAmount = Scalable.MIN;
  }

  currentScale.value = `${scaleAmount}%`;
  changeImageScale(editingImage, scaleAmount);
}

function changeImageScale(image, amount) {
  image.style.scale = amount / 100;
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
    const {cssName = '', initValue, step, units = ''} = FILTERS[filterName];
    currentFilter = `${cssName}(${initValue}${units})`;
  }

  image.style.filter = currentFilter;
}

export {
  makeScaleBigger,
  makeScaleSmaller,
  changeEffectHandler
};
