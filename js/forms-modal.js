import {isEscapeKey} from './utils.js';
import {
  changeImgScale,
  changeEffectHandler as effectChangeHandler,
  resetImgEditor
} from './img-editor.js';

const MODAL_OPENED_BODY_CLASS = 'modal-open';

// При фокусе на элементах с этими классами - закрытие окна по ESC - отключить
const CLASSES = ['text__hashtags', 'text__description'];

const imgEditorContainer = document.querySelector('.img-upload__overlay');
const closeImgEditorBtn = document.querySelector('.img-upload__cancel');

// Кнопки изменения масштаба изображения
const scaleBiggerBtn = document.querySelector('.scale__control--bigger');
const scaleSmallerBtn = document.querySelector('.scale__control--smaller');

// Фильтры
const imgEffectsContainer = document.querySelector('.effects__list');

const changeBodyScrollState = (scrollEnabled = true) => {
  if (scrollEnabled) {
    document.body.classList.remove(MODAL_OPENED_BODY_CLASS);

    return;
  }

  document.body.classList.add(MODAL_OPENED_BODY_CLASS);
};

const closeImgEditor = () => {
  // Закрываем модалку
  imgEditorContainer.classList.add('hidden');
  changeBodyScrollState(); // Возвращаем body возможность скролла

  // Удаляем все подвешенные обработчики
  document.removeEventListener('keydown', documentKeyDownHandler);
  closeImgEditorBtn.removeEventListener('click', imgEditorCloseHandler);

  scaleBiggerBtn.removeEventListener('click', imgResizeHandler);
  scaleSmallerBtn.removeEventListener('click', imgResizeHandler);

  imgEffectsContainer.removeEventListener('click', effectChangeHandler);
  resetImgEditor();
};

// Функции работы с модальными окнами
const openImgEditor = () => {
  imgEditorContainer.classList.remove('hidden');
  changeBodyScrollState(false); // Отключаем скролл на body, добавляя спец. класс

  document.addEventListener('keydown', documentKeyDownHandler);
  closeImgEditorBtn.addEventListener('click', imgEditorCloseHandler);

  // Работа с размером изображения
  scaleBiggerBtn.addEventListener('click', imgResizeHandler);
  scaleSmallerBtn.addEventListener('click', imgResizeHandler);

  // Наложение фильтров
  imgEffectsContainer.addEventListener('click', effectChangeHandler);
};

function documentKeyDownHandler(evt) {
  const target = evt.target;
  /* Запрещаем закрытие редактора изображений при фокусе на определенных элементах
  (поле вовода хэш-тегов и комментария при добавлении фотографии), а также
  когда открыто сообщение об ошибке отправки
  (иначе, мы не сможем дать пользователю отправить форму поаторно,
  не потеряв введённые им данные, т.к. она закроется вместе с окном об ошибке) */
  if(CLASSES.includes(target.className) || document.querySelector('.error')) {
    return;
  }

  /* Закрываем редактор изображения по нажатию клавиши ESC */
  if(isEscapeKey(evt)) {
    closeImgEditor();
  }
}

function imgEditorCloseHandler() {
  closeImgEditor();
}

function imgResizeHandler(evt) {
  changeImgScale(evt);
}

export {
  openImgEditor,
  closeImgEditor
};

