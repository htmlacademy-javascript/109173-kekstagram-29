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

const uploadImgForm = document.querySelector('.img-upload__form');
const uploadImgInput = document.querySelector('.img-upload__input');
const submitFormBtn = document.querySelector('.img-upload__submit');
const preview = document.querySelector('.img-upload__preview > img');
const effectThumbnails = document.querySelectorAll('.effects__preview');
const hashTagsInput = uploadImgForm.querySelector('.text__hashtags');
const descriptionInput = uploadImgForm.querySelector('.text__description');

// Статусы отправки формы
const SubmitBtnText = {
  BASE: 'Опубликовать',
  PUBLISHING: 'Публикуем...'
};
const DataSendStatusText = {
  SUCCESS: 'Данные успешно отправлены',
  ERROR: 'Ошибка отправки данных'
};

// Валидация
const PrestineClass = {
  to: 'img-upload__field-wrapper',
  error: 'img-upload__item--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorText: 'img-upload__error'
};
const ValidatorMessage = {
  // Хеш-теги
  HT_SEMANTICS: 'Хэш-теги должны начинаться с символа # и содержать только буквы/цифры',
  HT_COUNT: `К одной фотографии можно добавить не более ${MAX_TAGS_COUNT} хэш-тегов`,
  HT_UNIQ: 'Хэш-теги не могут повторяться',
  // Комментарии
  COMM_LENGTH: `Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} символов.`,
};

let pristine = null;

const changeSendBtnState = (btnBlocked = false) => {
  if (btnBlocked) {
    submitFormBtn.disabled = true;
    submitFormBtn.textContent = SubmitBtnText.PUBLISHING;

    return;
  }

  submitFormBtn.disabled = false;
  submitFormBtn.textContent = SubmitBtnText.BASE;
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();

  const targetForm = evt.target;
  const isValidForm = pristine.validate();

  // Если форма валидна - отправляем
  if (isValidForm) {
    changeSendBtnState(true);
    sendData(new FormData(targetForm))
      .then(() => {
        showSuccess(DataSendStatusText.SUCCESS);
        closeImgEditor(); // Закрываем форму только в случае успешной отправки
      })
      .catch(() => showError(DataSendStatusText.ERROR))
      .finally(() => {
        changeSendBtnState();
      });
  }
};

const setImagePreview = (fileInfo) => {
  const imgSrc = URL.createObjectURL(fileInfo);

  preview.src = imgSrc;

  effectThumbnails.forEach((thumbnail) => {
    thumbnail.style.backgroundImage = `url(${imgSrc})`;
  });
};

const setFormValidators = () => {
  pristine = new Pristine(uploadImgForm, {
    classTo: PrestineClass.to,
    errorClass: PrestineClass.error,
    errorTextParent: PrestineClass.errorTextParent,
    errorTextTag: PrestineClass.errorTextTag,
    errorTextClass: PrestineClass.errorText
  });

  // Валидация хэш-тегов
  pristine.addValidator(
    hashTagsInput,
    checkTagsSemantics, // Проверка общей семантики
    ValidatorMessage.HT_SEMANTICS,
    1,
    true
  );

  pristine.addValidator(
    hashTagsInput,
    checkTagsCount, // Проверка количества тегов
    ValidatorMessage.HT_COUNT,
    2,
    true
  );

  pristine.addValidator(
    hashTagsInput,
    checkTagsUniq, // Проверка на уникальность
    ValidatorMessage.HT_UNIQ,
    3,
    true
  );

  // Валидатор комментария
  pristine.addValidator(
    descriptionInput,
    checkCommentLength,
    ValidatorMessage.COMM_LENGTH
  );
};

const removeFormValidators = () => {
  uploadImgForm.removeEventListener('submit', formSubmitHandler);

  if (!pristine) {
    return;
  }

  pristine.reset();
  pristine.destroy();
};

const fileUploadHandler = (evt) => {
  const target = evt.target;
  const choosedFile = target.files[0];

  // Если загружен файл валидного типа
  if (isValidFileType(choosedFile)) {
    setFormValidators(); // Устанавливаем валидаторы на формуsetFormValidators(); // Устанавливаем валидаторы на форму
    uploadImgForm.addEventListener('submit', formSubmitHandler); // Устанавливаем обработчик на отправку
    setImagePreview(choosedFile); // Загружаем изображение в модальное окно
    openImgEditor(evt); // Открываем редактор изображения
  }
};

// Обработка загрузки пользовательских изображений
uploadImgInput.addEventListener('change', fileUploadHandler);

export {removeFormValidators};
