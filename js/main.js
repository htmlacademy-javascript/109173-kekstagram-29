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
  'Mitrandir'
];

function getRandomInt(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomElemsFromArr(arr, count = 1) {
  let message = arr[getRandomInt(0, arr.length - 1)];

  if (count > 1) {
    for (let i = 1; i <= count; i++) {
      message += ' ';
      message += arr[getRandomInt(0, arr.length - 1)];
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

function getLoremDescription(length = 250) {
  /*
    TODO: Можно добавить проверку на целое слово, чтобы не делить текст
    посреди слова, а брать последнее слово целиком.
  */
  const loremText = `Lorem ipsum, dolor sit amet consectetur adipisicing elit.
  Dignissimos vero explicabo voluptatibus voluptas quos impedit quas, ex
  sint blanditiis inventore excepturi consectetur pariatur rerum sunt quae
  officiis consequuntur harum laborum. Id minima voluptatum placeat voluptate
  debitis. Culpa repellendus voluptatum earum molestias dolore, explicabo quae
  sequi inventore minus nobis. Cumque, minima!`;

  return `${loremText.slice(0, length)} ...`;
}

const getUniquePhotoId = uniqueIdGenerator(1, 25);
const getUniqueCommentId = uniqueIdGenerator(1, 1000);

function createPhoto() {
  const photoId = getUniquePhotoId();
  return {
    id: photoId, // Случайное уникальное число (1-25)
    url: `/photos/${photoId}.jpg`, // i - случайное уникальное число (1-25)
    description: getLoremDescription(80),
    likes: getRandomInt(15, 200), // Случайное число от 15 до 200
    comments: Array.from({length: getRandomInt(0, 30)}, getComment),
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

// const photos = Array.from({length: 25}, createPhoto);
