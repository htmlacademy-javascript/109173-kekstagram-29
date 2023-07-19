/*
  TODO:
  - Prestine.js при каждом вызове, даже ни смотря на reset() и
  destroy() своего объекта - не затирает за собой слушатель события
  input на #upload-file - Подумать, можно ли как-то это исправить.
*/
import {openImgEditor, closeImgEditor} from './forms-modal.js';
import {
  MAX_TAGS_COUNT,
  MAX_COMMENT_LENGTH,
  checkTagsSemantics,
  checkTagsCount,
  checkTagsUniq,
  checkCommentLength
} from './validators.js';
import {sendData} from './server-api.js';
import {isValidFileType, showError, showSuccess} from './utils.js';

const ValidatorMessage = {
  // Хеш-теги
  HT_SEMANTICS: 'Хэш-теги должны начинаться с символа # и содержать только буквы/цифры',
  HT_COUNT: `К одной фотографии можно добавить не более ${MAX_TAGS_COUNT} хэш-тегов`,
  HT_UNIQ: 'Хэш-теги не могут повторяться',
  // Комментарии
  COMM_LENGTH: `Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} символов.`,
};

const SubmitBtnText = {
  BASE: 'Опубликовать',
  PUBLISHING: 'Публикуем...'
};

const uploadImgForm = document.querySelector('.img-upload__form');
const uploadImgInput = document.querySelector('.img-upload__input');
const submitFormBtn = document.querySelector('.img-upload__submit');
const preview = document.querySelector('.img-upload__preview > img');
const effectThumbnails = document.querySelectorAll('.effects__preview');

let pristine = null;

uploadImgInput.addEventListener('change', (evt) => {
  const target = evt.target;
  const choosedFile = target.files[0];

  // Если загружен файл валидного типа
  if (isValidFileType(choosedFile)) {
    setFormValidators(); // Устанавливаем валидаторы на формуsetFormValidators(); // Устанавливаем валидаторы на форму
    uploadImgForm.addEventListener('submit', submitFormHandler); // Устанавливаем обработчик на отправку
    setImagePreview(choosedFile); // Загружаем изображение в модальное окно
    openImgEditor(evt); // Открываем редактор изображения
  }
});

function submitFormHandler(event) {
  event.preventDefault();

  const targetForm = event.target;
  const isValidForm = pristine.validate();

  // Если форма валидна - отправляем
  if (isValidForm) {
    blockSendBtn();
    sendData(new FormData(targetForm))
      .then(() => {
        showSuccess('Данные успешно отправлены');
        closeImgEditor(); // Закрываем форму только в случае успешной отправки
      })
      .catch(() => showError('Ошибка отправки данных'))
      .finally(() => {
        unblockSendBtn();
      });
  }
}

function setImagePreview(fileInfo) {
  const imageSrc = URL.createObjectURL(fileInfo);

  preview.src = imageSrc;

  for(let i = 0; i < effectThumbnails.length; i++) {
    effectThumbnails[i].style.backgroundImage = `url(${imageSrc})`;
  }
}

function setFormValidators() {
  pristine = new Pristine(uploadImgForm, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__item--invalid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'span',
    errorTextClass: 'img-upload__error'
  });

  // Валидация хэш-тегов
  pristine.addValidator(
    uploadImgForm.querySelector('.text__hashtags'),
    checkTagsSemantics, // Проверка общей сементики
    ValidatorMessage.HT_SEMANTICS,
    1,
    true
  );

  pristine.addValidator(
    uploadImgForm.querySelector('.text__hashtags'),
    checkTagsCount, // Проверка количества тегов
    ValidatorMessage.HT_COUNT,
    2,
    true
  );

  pristine.addValidator(
    uploadImgForm.querySelector('.text__hashtags'),
    checkTagsUniq, // Проверка на уникальность
    ValidatorMessage.HT_UNIQ,
    3,
    true
  );

  // Валидатор комментария
  const test = document.querySelector('.text__description').value.length;
  pristine.addValidator(
    uploadImgForm.querySelector('.text__description'),
    checkCommentLength,
    `${ValidatorMessage.COMM_LENGTH} (${test})`
  );
}

function removeFormValidators() {
  uploadImgForm.removeEventListener('submit', submitFormHandler);

  if (!pristine) {
    return;
  }

  pristine.reset();
  pristine.destroy();
}

function blockSendBtn() {
  submitFormBtn.disabled = true;
  submitFormBtn.textContent = SubmitBtnText.PUBLISHING;
}

function unblockSendBtn() {
  submitFormBtn.disabled = false;
  submitFormBtn.textContent = SubmitBtnText.BASE;
}

export {removeFormValidators};
