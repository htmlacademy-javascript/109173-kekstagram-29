import {isEscapeKey} from './utils.js';
import {makeScaleBigger, makeScaleSmaller, changeEffectHandler} from './imgEditor.js';

// При фокусе на элементах с этими классами - закрытие окна по ESC - отключить
const PREVENT_ESC_ON_ELEMS = ['text__hashtags', 'text__description'];

const imgParamsContainer = document.querySelector('.img-upload__text');

const uploadedImgEditor = document.querySelector('.img-upload__overlay');
const closeImgEditorBtn = document.querySelector('.img-upload__cancel');

const uploadImgInput = document.querySelector('.img-upload__input');
const imgHashTags = document.querySelector('.text__hashtags');
const imgDescription = document.querySelector('.text__description');
const imgEffectsBtns = document.querySelectorAll('.effects__radio');

const editingImage = document.querySelector('.img-upload__preview > img');
const currentScale = document.querySelector('.scale__control--value');

// Кнопки изменения масштаба изображения
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleSmaller = document.querySelector('.scale__control--smaller');

// Фильтры
const imgEffectsContainer = document.querySelector('.effects__list');

function onKeyDownHandler(evt) {
  if(isEscapeKey(evt)) {
    closeImgEditor();
  }
}

// Запрещаем закрытие редактора изображений при фокусе на определенных элементах
function onFocusHandler(evt) {
  const target = evt.target;

  if (PREVENT_ESC_ON_ELEMS.includes(target.className)) {
    document.removeEventListener('keydown', onKeyDownHandler);
  }
}

function onBlurHandler(evt) {
  const target = evt.target;

  document.addEventListener('keydown', onKeyDownHandler);

  if (!PREVENT_ESC_ON_ELEMS.includes(target.className)) {
    imgParamsContainer.removeEventListener('focusin', onFocusHandler);
    imgParamsContainer.removeEventListener('focusout', onBlurHandler);
  }
}

// Функции работы с модальными окнами
function openImgEditor(evt) {
  uploadedImgEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onKeyDownHandler);
  closeImgEditorBtn.addEventListener('click', closeImgEditor);

  // Запрещаем закрывать редактор при фокусе на определенных элементах
  imgParamsContainer.addEventListener('focusin', onFocusHandler);
  imgParamsContainer.addEventListener('focusout', onBlurHandler);

  // Работа с размером изображения
  scaleBigger.addEventListener('click', makeScaleBigger);
  scaleSmaller.addEventListener('click', makeScaleSmaller);

  // Наложение фильтров
  imgEffectsContainer.addEventListener('click', changeEffectHandler);
}

function closeImgEditor() {
  uploadedImgEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onKeyDownHandler);
  closeImgEditorBtn.removeEventListener('click', closeImgEditor);

  scaleBigger.removeEventListener('click', makeScaleBigger);
  scaleSmaller.removeEventListener('click', makeScaleSmaller);

  resetImgEditor();
}

function resetImgEditor() {
  // Сбрасываем размер изображения
  editingImage.style.scale = '';
  currentScale.value = '100%';

  // Сбрасываем значения полей
  uploadImgInput.value = '';
  imgHashTags.value = '';
  imgDescription.value = '';

  // Сбрасываем фильтры
  for (const imgEffectBtn of imgEffectsBtns) {
    imgEffectBtn.checked = false;
  }

  imgEffectsBtns[0].checked = true;
}

export {openImgEditor};

