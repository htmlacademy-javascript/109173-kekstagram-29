import {isEscapeKey} from './utils.js';
import {
  changeImgScale,
  changeEffectHandler,
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
  document.removeEventListener('keydown', keyDownHandler);
  closeImgEditorBtn.removeEventListener('click', closeImgEditorHandler);

  scaleBiggerBtn.removeEventListener('click', changeImgScaleHandler);
  scaleSmallerBtn.removeEventListener('click', changeImgScaleHandler);

  imgEffectsContainer.removeEventListener('click', changeEffectHandler);
  resetImgEditor();
};

// Функции работы с модальными окнами
const openImgEditor = () => {
  imgEditorContainer.classList.remove('hidden');
  changeBodyScrollState(false); // Отключаем скролл на body, добавляя спец. класс

  document.addEventListener('keydown', keyDownHandler);
  closeImgEditorBtn.addEventListener('click', closeImgEditorHandler);

  // Работа с размером изображения
  scaleBiggerBtn.addEventListener('click', changeImgScaleHandler);
  scaleSmallerBtn.addEventListener('click', changeImgScaleHandler);

  // Наложение фильтров
  imgEffectsContainer.addEventListener('click', changeEffectHandler);
};

function keyDownHandler(evt) {
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

function closeImgEditorHandler() {
  closeImgEditor();
}

function changeImgScaleHandler(evt) {
  changeImgScale(evt);
}

export {
  openImgEditor,
  closeImgEditor
};

