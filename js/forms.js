import {openImgEditor} from './formsModal.js';
import {
  MAX_TAGS_COUNT,
  MAX_COMMENT_LENGTH,
  checkTagsSemantics,
  checkTagsCount,
  checkTagsUniq,
  checkComment
} from './validators.js';

const ValidatorMessages = {
  HT_SEMANTICS: 'Хэш-теги должны начинаться с символа # и содержать только буквы/цифры',
  HT_COUNT: `К одной фотографии можно добавить не более ${MAX_TAGS_COUNT} хэш-тегов`,
  HT_UNIQ: 'Хэш-теги не могут повторяться',
  COMM_LENGTH: `Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} символов.`,
};

const imgUploadForm = document.querySelector('.img-upload__form');
const uploadImgInput = document.querySelector('.img-upload__input');

uploadImgInput.addEventListener('change', (evt) => {
  const pristine = new Pristine(imgUploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__item--invalid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'span',
    errorTextClass: 'img-upload__error'
  });

  // Валидация хэш-тегов
  pristine.addValidator(
    imgUploadForm.querySelector('.text__hashtags'),
    checkTagsSemantics,
    ValidatorMessages.HT_SEMANTICS
  );

  pristine.addValidator(
    imgUploadForm.querySelector('.text__hashtags'),
    checkTagsCount,
    ValidatorMessages.HT_COUNT
  );

  pristine.addValidator(
    imgUploadForm.querySelector('.text__hashtags'),
    checkTagsUniq,
    ValidatorMessages.HT_UNIQ
  );

  // Валидатор комментария
  pristine.addValidator(
    imgUploadForm.querySelector('.text__description'),
    checkComment,
    ValidatorMessages.COMM_LENGTH
  );

  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    // Если форма валидна - отправляем
    if (pristine.validate()) {
      imgUploadForm.submit();
    }
  });

  // Открываем редактор изображения
  openImgEditor(evt);
});
