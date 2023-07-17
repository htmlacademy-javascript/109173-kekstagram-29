const NOTIF_CONTAINER_CLASS = 'system-notification';
const NOTIF_BASE_CLASS = 'system-notification__message';
const NotifClass = {
  ERROR: 'system-notification__message--error',
  SUCCESS: 'system-notification__message--success'
};
const NOTIF_SHOW_TIMER = 5000;

const MessageType = {
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS'
};
const MessageText = {
  ERROR: 'Ошибка загрузки файла',
  SUCCESS: 'Изображение успешно загружено'
};

const DEBOUNCE_TIMEOUT = 500;
const THROTTLE_DELAY = 1000;

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
    if(generatedIds.length >= max) {
      return;
    }

    while(generatedIds.length < max) {
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

// Проверка клавишь
function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

// Вывод ошибок при загрузке фотографий на сервер
function showMessage(messageText, messageType = MessageType.SUCCESS) {
  const message = createMessage(messageText, messageType);
  document.body.append(message);
}

function createMessage(messageText, messageType = MessageType.SUCCESS) {
  let templateContainerSelector = null;
  let messageContainerSelector = null;
  let messageTitleSelector = null;

  switch(messageType) {
    case MessageType.ERROR: {
      templateContainerSelector = '#error';
      messageContainerSelector = '.error';
      messageTitleSelector = '.error__title';
      break;
    }
    default: {
      templateContainerSelector = '#success';
      messageContainerSelector = '.success';
      messageTitleSelector = '.success__title';
      break;
    }
  }

  const messageTmpl = document.querySelector(templateContainerSelector).content;
  const message = messageTmpl.cloneNode(true);
  message.querySelector(messageTitleSelector).textContent = messageText;
  message.querySelector(messageContainerSelector).addEventListener('click', messageHandler);
  document.addEventListener('keydown', messageHandler);

  return message;
}

function showError(errorText = MessageText.ERROR) {
  showMessage(errorText, MessageType.ERROR);
}

function showSuccess(successText = MessageText.SUCCESS) {
  showMessage(successText, MessageType.SUCCESS);
}

// Вывод прочих уведомлений пользователям сервиса
function createNotifContainer() {
  const notifContainer = document.createElement('ul');
  notifContainer.className = NOTIF_CONTAINER_CLASS;
  return notifContainer;
}

function showNotification(notifText, notifClass) {
  if (!document.querySelector(`.${NOTIF_CONTAINER_CLASS}`)) {
    document.body.append(createNotifContainer());
  }

  const notifocationsContainer = document.querySelector(`.${NOTIF_CONTAINER_CLASS}`);
  const notification = document.createElement('li');
  notification.textContent = notifText;
  notification.classList.add(NOTIF_BASE_CLASS);
  notification.classList.add(notifClass);

  notifocationsContainer.prepend(notification);

  // Скрываем сообщение через MESSAGE_SHOW_TIMER миллисекунд
  setTimeout(() => notification.remove(), NOTIF_SHOW_TIMER);
}

function showErrorNotif(errorText) {
  showNotification(errorText, NotifClass.ERROR);
}

function showSuccessNotif(successText) {
  showNotification(successText, NotifClass.SUCCESS);
}

function messageHandler(evt) {
  const target = evt.target;
  const messageTriggers = ['success', 'success__button', 'error', 'error__button'];

  if(isEscapeKey(evt) || messageTriggers.includes(target.className)) {
    document.querySelector('.error')?.remove();
    document.querySelector('.success')?.remove();
    document.removeEventListener('keydown', messageHandler);
  }
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
  isEscapeKey,
  MessageType,
  showError,
  showSuccess,
  showErrorNotif,
  showSuccessNotif,
  debounce,
  throttle
};
