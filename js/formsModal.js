import {isEscapeKey} from './utils.js';
import {
  changeScale,
  changeEffectHandler,
  resetImgEditor
} from './imgEditor.js';


// При фокусе на элементах с этими классами - закрытие окна по ESC - отключить
const PREVENT_ESC_ON_ELEMS = ['text__hashtags', 'text__description'];

const imgParamsContainer = document.querySelector('.img-upload__text');
const uploadedImgEditor = document.querySelector('.img-upload__overlay');
const closeImgEditorBtn = document.querySelector('.img-upload__cancel');

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
function openImgEditor() {
  uploadedImgEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onKeyDownHandler);
  closeImgEditorBtn.addEventListener('click', closeImgEditor);

  // Запрещаем закрывать редактор при фокусе на определенных элементах
  imgParamsContainer.addEventListener('focusin', onFocusHandler);
  imgParamsContainer.addEventListener('focusout', onBlurHandler);

  // Работа с размером изображения
  scaleBigger.addEventListener('click', changeScale);
  scaleSmaller.addEventListener('click', changeScale);

  // Наложение фильтров
  imgEffectsContainer.addEventListener('click', changeEffectHandler);
}

function closeImgEditor() {
  // Закрываем модалку
  uploadedImgEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');

  // Удаляем все подвешенные обработчики
  document.removeEventListener('keydown', onKeyDownHandler);
  closeImgEditorBtn.removeEventListener('click', closeImgEditor);

  scaleBigger.removeEventListener('click', changeScale);
  scaleSmaller.removeEventListener('click', changeScale);

  imgEffectsContainer.removeEventListener('click', changeEffectHandler);
  resetImgEditor();
}

export {
  openImgEditor,
  closeImgEditor
};

