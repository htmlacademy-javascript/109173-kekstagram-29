import {isEscapeKey} from './utils.js';
import {
  changeScale,
  changeEffectHandler,
  resetImgEditor
} from './img-editor.js';


// При фокусе на элементах с этими классами - закрытие окна по ESC - отключить
const PREVENT_ESC_ON_ELEMS = ['text__hashtags', 'text__description'];

const imgEditorContainer = document.querySelector('.img-upload__overlay');
const closeImgEditorBtn = document.querySelector('.img-upload__cancel');

// Кнопки изменения масштаба изображения
const scaleBiggerBtn = document.querySelector('.scale__control--bigger');
const scaleSmallerBtn = document.querySelector('.scale__control--smaller');

// Фильтры
const imgEffectsContainer = document.querySelector('.effects__list');

function onKeyDownHandler(evt) {
  const target = evt.target;
  /* Запрещаем закрытие редактора изображений при фокусе на определенных элементах
  (поле вовода хэш-тегов и комментария при добавлении фотографии), а также
  когда открыто сообщение об ошибке отправки
  (иначе, мы не сможем дать пользователю отправить форму поаторно,
  не потеряв введённые им данные, т.к. она закроется вместе с окном об ошибке) */
  if(PREVENT_ESC_ON_ELEMS.includes(target.className) || document.querySelector('.error')) {
    return;
  }

  /* Закрываем редактор изображения по нажатию клавиши ESC */
  if(isEscapeKey(evt)) {
    closeImgEditor();
  }
}

// Функции работы с модальными окнами
function openImgEditor() {
  imgEditorContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onKeyDownHandler);
  closeImgEditorBtn.addEventListener('click', closeImgEditor);

  // Работа с размером изображения
  scaleBiggerBtn.addEventListener('click', changeScale);
  scaleSmallerBtn.addEventListener('click', changeScale);

  // Наложение фильтров
  imgEffectsContainer.addEventListener('click', changeEffectHandler);
}

function closeImgEditor() {
  // Закрываем модалку
  imgEditorContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');

  // Удаляем все подвешенные обработчики
  document.removeEventListener('keydown', onKeyDownHandler);
  closeImgEditorBtn.removeEventListener('click', closeImgEditor);

  scaleBiggerBtn.removeEventListener('click', changeScale);
  scaleSmallerBtn.removeEventListener('click', changeScale);

  imgEffectsContainer.removeEventListener('click', changeEffectHandler);
  resetImgEditor();
}

export {
  openImgEditor,
  closeImgEditor
};

