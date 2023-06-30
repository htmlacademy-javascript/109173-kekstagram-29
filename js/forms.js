import {openImgEditor} from './formsModal.js';
import {hashTags, comment} from './validators.js';

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

  // Валидатор хэш-тегов
  pristine.addValidator(
    imgUploadForm.querySelector('.text__hashtags'),
    hashTags,
    'Неверно заполнено поле хэш-тегов'
  );

  // Валидатор комментария
  pristine.addValidator(
    imgUploadForm.querySelector('.text__description'),
    comment,
    'Слишком длинный комментарий'
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
