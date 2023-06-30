import {getRandomInt, getRandomElemsFromArr, uniqueIdGenerator, getLoremDescription} from './utils.js';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Mr. Anderson',
  'John Snow',
  'Ben Kenobi',
  'Elesar',
  'Frodo Baggins',
  'Mitrandir',
  'Ken Block',
  'Mr. Black',
  'White Russian'
];

// Настройки
const PHOTOS_COUNT = 25;
const Likes = {MIN: 15, MAX: 200};
const MAX_DESCRIPTION_LENGTH = 80;
const MAX_COMMENTS_COUNT = 30;

// Функции генерации данных
const getUniquePhotoId = uniqueIdGenerator(1, PHOTOS_COUNT);
const getUniqueCommentId = uniqueIdGenerator(1, PHOTOS_COUNT * MAX_COMMENTS_COUNT);

function createPhoto() {
  const photoId = getUniquePhotoId();
  return {
    id: photoId, // Случайное уникальное число (1-25)
    url: `/photos/${photoId}.jpg`, // i - случайное уникальное число (1-25)
    description: getLoremDescription(MAX_DESCRIPTION_LENGTH),
    likes: getRandomInt(Likes.MIN, Likes.MAX), // Случайное число от 15 до 200
    comments: Array.from({length: getRandomInt(0, MAX_COMMENTS_COUNT)}, getComment),
  };
}

function getComment(){
  return {
    id: getUniqueCommentId(), // Случайное уникальное число
    avatar: `/img/avatar-${getRandomInt(1, 6)}.svg`, // Цифра - случайное число от 1 до 6.
    message: getRandomElemsFromArr(MESSAGES, getRandomInt(1, 2)), // Комментарий из 1-2 случайных предложений
    name: getRandomElemsFromArr(NAMES), // Имя автора также должно генерироваться случайно
  };
}

export {createPhoto};
