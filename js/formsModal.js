import {isEscapeKey} from './utils.js';

const uploadImgInput = document.querySelector('.img-upload__input');
const imgHashTags = document.querySelector('.text__hashtags');
const imgDescription = document.querySelector('.text__description');
const imgEffectsBtns = document.querySelectorAll('.effects__radio');

const uploadedImgEditor = document.querySelector('.img-upload__overlay');
const closeImgEditorBtn = document.querySelector('.img-upload__cancel');

function onKeyDownHandler(evt) {
  if(isEscapeKey(evt)) {
    closeImgEditor();
  }
}

function onDescriptionFocus() {
  document.removeEventListener('keydown', onKeyDownHandler);
}

function onDescriptionBlur() {
  document.addEventListener('keydown', onKeyDownHandler);
  imgDescription.removeEventListener('focus', onDescriptionFocus);
  imgDescription.removeEventListener('blur', onDescriptionBlur);
}

// Функции работы с модальными окнами
function openImgEditor(evt) {
  evt.preventDefault();


  uploadedImgEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onKeyDownHandler);
  closeImgEditorBtn.addEventListener('click', closeImgEditor);

  // Запрещаем закрывать редактор при фокусе на описании
  imgDescription.addEventListener('focus', onDescriptionFocus);
  imgDescription.addEventListener('blur', onDescriptionBlur);
}

function closeImgEditor() {
  uploadedImgEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onKeyDownHandler);
  closeImgEditorBtn.removeEventListener('click', closeImgEditor);

  clearImgEditor();
}

function clearImgEditor() {
  uploadImgInput.value = '';
  imgHashTags.value = '';
  imgDescription.value = '';

  for (const imgEffectBtn of imgEffectsBtns) {
    imgEffectBtn.checked = false;
  }

  imgEffectsBtns[0].checked = true;
}

export {openImgEditor};

