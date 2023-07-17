const MESSAGE_SHOW_TIMER = 5000;
const BASE_MESSAGE_CLASS = 'system-messages__message';
const MessageClasses = {
  ERROR: 'system-messages__message--error',
  SUCCESS: 'system-messages__message--success'
};
const DEBOUNCE_TIMEOUT = 500;
const THROTTLE_DELAY = 1000;

const messagesContainer = document.querySelector('.system-messages');

function getRandomInt(min, max) {
  min = Math.floor(min);
  max = Math.ceil(max);

  return Math.round(Math.random() * (max - min) + min);
}

function getRandomElemsFromArr(arr, elemsCount = 1) {
  let elem = arr[getRandomInt(0, arr.length - 1)];

  if (elemsCount > 1) {
    for (let i = 1; i <= elemsCount; i++) {
      elem += ` ${arr[getRandomInt(0, arr.length - 1)]}`;
    }
  }

  return elem;
}

function getRandUniqElemsFromArr(arr, elemsCount = 1) {
  if (elemsCount <= 1) {
    return arr[getRandomInt(0, arr.length - 1)];
  }

  const result = [];
  const generatedIDs = [];
  const idsGenerator = uniqueIdGenerator(0, elemsCount);

  for (let i = 0; i < elemsCount; i++) {
    generatedIDs.push(idsGenerator());
  }

  const shuffledIDs = shuffleArr(generatedIDs);

  for (let i = 0; i < shuffledIDs.length; i++) {
    const elemIndex = shuffledIDs[i];
    result.push(arr[elemIndex]);
  }

  return result;
}

// v.2  генератор последовательных псевдо-уникальных чисел (с ростом числа элементов будет работать быстрее, чем рандомайзер с массивом)
function uniqueIdGenerator(min = 0, max = 10) {
  let currentId = min;

  return function () {
    if (min < max) {
      return currentId++;
    }
  };
}

// Генератор рандомных чисел в заданном диапазоне (с ростом числа элементов - будет работать медленнее)
function randomUnicIdGenerator(min = 0, max = 10) {
  const generatedIds = [];
  let currentId = min;

  return function () {
    while(true) {
      currentId = getRandomInt(min, max);

      if(!generatedIds.includes(currentId)) {
        generatedIds.push(currentId);
        break;
      }
    }

    return currentId;
  };
}

// Функция для перемешивания массива (по алгоритму тасования Фишера-Йетса)
function shuffleArr(arr) {
  if (!arr.length) {
    return;
  }

  const shuffledArr = arr.slice();

  for (let i = shuffledArr.length - 1; i > 0; i--) {
    const j = getRandomInt(0, i);

    [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
  }

  return shuffledArr;
}

// Проверка наличия класса в класс-листе
function hasClass(className, classList) {
  const classes = Array.from(classList);

  return classes.includes(className);
}

// Проверка клавишь
function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

// Валидаторы
function isValidHashTag(hashTagStr) {
  const regex = /^#[\w\dа-яА-Я]{1,19}$/gi;

  return regex.test(hashTagStr);
}

// Вывод сообщений пользователю
function showMessage(messageText, messageClass) {
  const message = document.createElement('li');
  message.textContent = messageText;
  message.classList.add(BASE_MESSAGE_CLASS);
  message.classList.add(messageClass);

  messagesContainer.prepend(message);

  // Скрываем сообщение через MESSAGE_SHOW_TIMER миллисекунд
  setTimeout(() => message.remove(), MESSAGE_SHOW_TIMER);
}

function showError(errorText) {
  showMessage(errorText, MessageClasses.ERROR);
}

function showSuccess(successText) {
  showMessage(successText, MessageClasses.SUCCESS);
}

// Функции для устранения дребезга
function debounce(callback, timeout = DEBOUNCE_TIMEOUT) {
  let timerId = null;

  return function (...rest) {
    clearTimeout(timerId);

    timerId = setTimeout(() => callback.apply(this, rest), timeout);
  };
}

// Вызов функции не раньше, чем раз в delay миллисекунд
function throttle(callback, delay = THROTTLE_DELAY) {
  let previousTime = 0;

  return function (...rest) {
    const currentTime = new Date();

    if (currentTime - previousTime >= delay) {
      callback.apply(this, rest);

      previousTime = currentTime;
    }
  };
}

export {
  getRandomInt,
  getRandomElemsFromArr,
  getRandUniqElemsFromArr,
  uniqueIdGenerator,
  randomUnicIdGenerator,
  shuffleArr,
  hasClass,
  isEscapeKey,
  isValidHashTag,
  showError,
  showSuccess,
  debounce,
  throttle
};
