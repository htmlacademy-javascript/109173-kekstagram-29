/*
  TODO:
  - Prestine.js при каждом вызове, даже ни смотря на reset() и
  destroy() своего объекта - не затирает за собой слушатель события
  input на #upload-file
*/
import {openImgEditor, closeImgEditor} from './forms-modal.js';
import {
  MAX_TAGS_COUNT,
  MAX_COMMENT_LENGTH,
  checkTagsSemantics,
  checkTagsCount,
  checkTagsUniq,
  checkComment
} from './validators.js';
import {sendData} from './server-api.js';
import {showError, showSuccess} from './utils.js';

const ValidatorMessages = {
  // Хеш-теги
  HT_SEMANTICS: 'Хэш-теги должны начинаться с символа # и содержать только буквы/цифры',
  HT_COUNT: `К одной фотографии можно добавить не более ${MAX_TAGS_COUNT} хэш-тегов`,
  HT_UNIQ: 'Хэш-теги не могут повторяться',
  // Комментарии
  COMM_LENGTH: `Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} символов.`,
};

const SubmitBtnText = {
  BASE: 'Опубликовать',
  PUBLISHING: 'Публикуем'
};

const imgUploadForm = document.querySelector('.img-upload__form');
const uploadImgInput = document.querySelector('.img-upload__input');
const submitBtn = document.querySelector('.img-upload__submit');
const preview = document.querySelector('.img-upload__preview > img');
const previewThumbnails = document.querySelectorAll('.effects__preview');

let pristine = null;

uploadImgInput.addEventListener('change', (evt) => {
  const target = evt.target;

  setFormValidators(); // Устанавливаем валидаторы на форму
  imgUploadForm.addEventListener('submit', submitFormHandler); // Устанавливаем обработчик на отправку
  setImagePreview(target.files[0]); // Загружаем изображение в модальное окно
  openImgEditor(evt); // Открываем редактор изображения
});

function submitFormHandler(event) {
  event.preventDefault();

  const targetForm = event.target;

  // Если форма валидна - отправляем
  if (pristine.validate()) {
    blockSendBtn();
    sendData(new FormData(targetForm))
      .then(() => showSuccess('Данные успешно отправлены'))
      .catch(() => showError('Ошибка отправки данных'))
      .finally(() => {
        unblockSendBtn();
        closeImgEditor();
      });
  }
}

function setImagePreview(fileInfo) {
  const imageSrc = URL.createObjectURL(fileInfo);

  preview.src = imageSrc;

  for(let i = 0; i < previewThumbnails.length; i++) {
    previewThumbnails[i].style.backgroundImage = `url(${imageSrc})`;
  }
}

function setFormValidators() {
  pristine = new Pristine(imgUploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__item--invalid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'span',
    errorTextClass: 'img-upload__error'
  });

  // Валидация хэш-тегов
  pristine.addValidator(
    imgUploadForm.querySelector('.text__hashtags'),
    checkTagsSemantics, // Проверка общей сементики
    ValidatorMessages.HT_SEMANTICS
  );

  pristine.addValidator(
    imgUploadForm.querySelector('.text__hashtags'),
    checkTagsCount, // Проверка количества тегов
    ValidatorMessages.HT_COUNT
  );

  pristine.addValidator(
    imgUploadForm.querySelector('.text__hashtags'),
    checkTagsUniq, // Проверка на уникальность
    ValidatorMessages.HT_UNIQ
  );

  // Валидатор комментария
  pristine.addValidator(
    imgUploadForm.querySelector('.text__description'),
    checkComment,
    ValidatorMessages.COMM_LENGTH
  );
}

function removeFormValidators() {
  imgUploadForm.removeEventListener('submit', submitFormHandler);

  if (!pristine) {
    return;
  }

  pristine.reset();
  pristine.destroy();
}

function blockSendBtn() {
  submitBtn.disabled = true;
  submitBtn.textContent = SubmitBtnText.PUBLISHING;
}

function unblockSendBtn() {
  submitBtn.disabled = false;
  submitBtn.textContent = SubmitBtnText.BASE;
}

export {removeFormValidators};
