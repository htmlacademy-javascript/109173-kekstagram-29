import {openImgEditor, closeImgEditor} from './formsModal.js';
import {
  MAX_TAGS_COUNT,
  MAX_COMMENT_LENGTH,
  checkTagsSemantics,
  checkTagsCount,
  checkTagsUniq,
  checkComment
} from './validators.js';
import {sendData} from './serverApi.js';
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

let pristine = null; // Не лучшее решение, но нужно очищать валидатор в formsModal.js, пока не придумал, как сделать иначе

uploadImgInput.addEventListener('change', (evt) => {
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

  imgUploadForm.addEventListener('submit', (event) => {
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
          pristine.reset();
        });
    }
  });

  // Открываем редактор изображения
  openImgEditor(evt);
});

function blockSendBtn() {
  submitBtn.disabled = true;
  submitBtn.textContent = SubmitBtnText.PUBLISHING;
}

function unblockSendBtn() {
  submitBtn.disabled = false;
  submitBtn.textContent = SubmitBtnText.BASE;
}

export {pristine};
