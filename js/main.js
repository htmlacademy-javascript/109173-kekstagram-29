import {createPhoto} from './dataGenerators.js';

const gallery = Array.from({length: 25}, createPhoto);

console.log(gallery);
