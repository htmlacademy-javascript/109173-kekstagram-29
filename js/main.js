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
const Likes = {
  MIN: 15,
  MAX: 200
};
const MAX_DESCRIPTION_LENGTH = 80;
const MAX_COMMENTS_COUNT = 30;

// Функции
/* function log(...variables) {
  console.log(...variables);
} */

function getRandomInt(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomElemsFromArr(arr, elemsCount = 1) {
  let message = arr[getRandomInt(0, arr.length - 1)];

  if (elemsCount > 1) {
    for (let i = 1; i <= elemsCount; i++) {
      message += ` ${arr[getRandomInt(0, arr.length - 1)]}`;
    }
  }

  return message;
}

function uniqueIdGenerator(min, max){
  const generatedIds = [];

  return function () {
    let currentId = getRandomInt(min, max);

    if (generatedIds.length >= max) {
      return null;
    }

    while(generatedIds.includes(currentId)) {
      currentId = getRandomInt(min, max);
    }

    generatedIds.push(currentId);

    return currentId;
  };
}

/*
  @param {int} length - длина получаемого текста в символах
  @param {bool} cutByWord - если true - фрагмент вырезается
  не строго посимвольно, а по последнему целому слову, входящему
  в установленную длину, с усечением в меньшую сторону.
*/
function getLoremDescription(length = 250, cutByWord = false) {
  const loremText = `Lorem ipsum, dolor sit amet consectetur adipisicing elit.
  Dignissimos vero explicabo voluptatibus voluptas quos impedit quas, ex
  sint blanditiis inventore excepturi consectetur pariatur rerum sunt quae
  officiis consequuntur harum laborum. Id minima voluptatum placeat voluptate
  debitis. Culpa repellendus voluptatum earum molestias dolore, explicabo quae
  sequi inventore minus nobis. Cumque, minima!`;

  let sliceOfText = loremText.slice(0, Math.round(length));

  /*
    loremText[sliceOfText.length] - если за местом, в котором мы обрезали
    текст идет пробел, значит можно считать, что мы итак обрезали текст
    не где-то посреди слова, а указанный размер попал четко на окончание
    слова, в таком случае - дополнительных преобразований не требуется
  */
  if (cutByWord && loremText[sliceOfText.length] !== ' ') {
    const lastWordInSlicedText = sliceOfText.split(' ').at(-1);

    sliceOfText = sliceOfText.slice(0, sliceOfText.lastIndexOf(lastWordInSlicedText)).trimEnd();
  }

  return sliceOfText;
}

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
    message: getRandomElemsFromArr(MESSAGES, getRandomInt(1, 2)),
    name: getRandomElemsFromArr(NAMES), // Имя автора также должно генерироваться случайно
  };
}

// const photos = Array.from({length: PHOTOS_COUNT}, createPhoto);
