import {openImgEditor} from './formsModal.js';


const uploadImgInput = document.querySelector('.img-upload__input');

uploadImgInput.addEventListener('change', openImgEditor);
