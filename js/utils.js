const EXTENTIONS = ['jpg', 'jpeg', 'png'];

// Параметры задержки
const DEBOUNCE_TIMEOUT = 500;
const THROTTLE_DELAY = 1000;

const MESSAGE_PROPERTIES = {
  ERROR: {
    ID: '#error',
    CLASS: '.error',
    TITLE: '.error__title',
  },
  SUCCESS: {
    ID: '#success',
    CLASS: '.success',
    TITLE: '.success__title',
  }
};

// Параметры уведомлений
const NOTIFICATION_SHOW_TIMER = 5000;
const NOTIFICATION_CONTAINER_CLASS = 'system-notification';
const NOTIFICATION_BASE_CLASS = 'system-notification__message';
const NotificationClass = {
  ERROR: 'system-notification__message--error',
  SUCCESS: 'system-notification__message--success'
};

// Параметры сообщений
const MessageType = {
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS'
};
const MessageText = {
  ERROR: 'Ошибка загрузки файла',
  SUCCESS: 'Изображение успешно загружено'
};

const isValidFileType = (file) => {
  if (file) {
    const fileExt = file.type.split('/')[1];

    return EXTENTIONS.includes(fileExt);
  }

  return false;
};

const getRandomInt = (min, max) => {
  min = Math.floor(min);
  max = Math.ceil(max);

  return Math.round(Math.random() * (max - min) + min);
};

// v.2  генератор последовательных псевдо-уникальных чисел (с ростом числа элементов будет работать быстрее, чем рандомайзер с массивом)
const getUniqIdGenerator = (min = 0, max = 10) => {
  let currentId = min;

  return function () {
    if (min < max) {
      return currentId++;
    }
  };
};

// Функция для перемешивания массива (по алгоритму тасования Фишера-Йетса)
const shuffleArr = (arr) => {
  if (!arr.length) {
    return;
  }

  const shuffledArr = arr.slice();

  for (let i = shuffledArr.length - 1; i > 0; i--) {
    const j = getRandomInt(0, i);

    [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
  }

  return shuffledArr;
};

const getRandUniqElemsFromArr = (arr, elemsCount = 1) => {
  if (elemsCount <= 1) {
    return arr[getRandomInt(0, arr.length - 1)];
  }

  const results = [];
  const generatedIDs = [];
  const idsGenerator = getUniqIdGenerator(0, elemsCount);

  for (let i = 0; i < elemsCount; i++) {
    generatedIDs.push(idsGenerator());
  }

  const shuffledIDs = shuffleArr(generatedIDs);

  for (let i = 0; i < shuffledIDs.length; i++) {
    const elemIndex = shuffledIDs[i];
    results.push(arr[elemIndex]);
  }

  return results;
};

// Проверка нажатой клавиши
const isEscapeKey = (evt) => evt.key === 'Escape';

const removeMessage = () => {
  document.querySelector(MESSAGE_PROPERTIES.ERROR.CLASS)?.remove();
  document.querySelector(MESSAGE_PROPERTIES.SUCCESS.CLASS)?.remove();
};

const closeMessageKeyDownHandler = (evt) => {
  // Закрываем сообщение только при нажатии ESC
  if(isEscapeKey(evt)) {
    removeMessage();
    document.removeEventListener('keydown', closeMessageKeyDownHandler);
  }
};

const closeMessageClickHandler = (evt) => {
  const target = evt.target;
  const triggers = ['success', 'success__button', 'error', 'error__button'];

  // Закрываем сообщение при клике по соответствующему классу
  if(triggers.includes(target.className)) {
    removeMessage();
    document.removeEventListener('keydown', closeMessageClickHandler);
  }
};

const createMessage = (messageText, messageType = MessageType.SUCCESS) => {
  // Параметры контейнера сообщения
  const templateContainerSelector = MESSAGE_PROPERTIES[messageType].ID;
  const messageContainerSelector = MESSAGE_PROPERTIES[messageType].CLASS;
  const messageTitleSelector = MESSAGE_PROPERTIES[messageType].TITLE;

  // Создаем сообщение
  const messageTmpl = document.querySelector(templateContainerSelector).content;
  const message = messageTmpl.cloneNode(true);
  message.querySelector(messageTitleSelector).textContent = messageText;
  message.querySelector(messageContainerSelector).addEventListener('click', closeMessageClickHandler);
  document.addEventListener('keydown', closeMessageKeyDownHandler);

  return message;
};

// Вывод сообщений об ошибках/успехе загрузки фотографий на сервер
const showMessage = (messageText, messageType = MessageType.SUCCESS) => {
  const message = createMessage(messageText, messageType);
  document.body.append(message);
};

const showError = (errorText = MessageText.ERROR) => showMessage(errorText, MessageType.ERROR);

const showSuccess = (successText = MessageText.SUCCESS) => showMessage(successText, MessageType.SUCCESS);

// Вывод прочих уведомлений пользователям сервиса
const createNotificationContainer = () => {
  const notificationContainer = document.createElement('ul');
  notificationContainer.className = NOTIFICATION_CONTAINER_CLASS;
  return notificationContainer;
};

const showNotification = (notifText, notifClass) => {
  if (!document.querySelector(`.${NOTIFICATION_CONTAINER_CLASS}`)) {
    const notificationContainer = createNotificationContainer();
    document.body.append(notificationContainer);
  }

  const notificationsContainer = document.querySelector(`.${NOTIFICATION_CONTAINER_CLASS}`);
  const notification = document.createElement('li');
  notification.textContent = notifText;
  notification.classList.add(NOTIFICATION_BASE_CLASS);
  notification.classList.add(notifClass);

  notificationsContainer.prepend(notification);

  // Скрываем сообщение через NOTIF_SHOW_TIMER миллисекунд
  setTimeout(() => notification.remove(), NOTIFICATION_SHOW_TIMER);
};

const showErrorNotification = (errorText) => showNotification(errorText, NotificationClass.ERROR);

const showSuccessNotification = (successText) => showNotification(successText, NotificationClass.SUCCESS);

// Функции для устранения дребезга
const debounce = (callback, timeout = DEBOUNCE_TIMEOUT) => {
  let timerId = null;

  return (...rest) => {
    clearTimeout(timerId);

    timerId = setTimeout(() => callback.apply(this, rest), timeout);
  };
};

// Вызов функции не раньше, чем раз в delay миллисекунд
const throttle = (callback, delay = THROTTLE_DELAY) => {
  let previousTime = 0;

  return (...rest) => {
    const currentTime = new Date();

    if (currentTime - previousTime >= delay) {
      callback.apply(this, rest);

      previousTime = currentTime;
    }
  };
};

export {
  isValidFileType,
  getRandomInt,
  getRandUniqElemsFromArr,
  isEscapeKey,
  MessageType,
  showError,
  showSuccess,
  showErrorNotification,
  showSuccessNotification,
  debounce,
  throttle
};
