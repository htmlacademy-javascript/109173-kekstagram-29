function getRandomInt(min, max) {
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

// v.2 генератора (с ростом числа элементов будет работать быстрее, чем рандомайзер с массивом)
function uniqueIdGenerator(min = 0, max) {
  let currentId = min;

  return function () {
    if (min < max) {
      return currentId++;
    }
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

  if (cutByWord && loremText[sliceOfText.length] !== ' ') {
    const lastWordInSlicedText = sliceOfText.split(' ').at(-1);
    const lastWordIndex = sliceOfText.lastIndexOf(lastWordInSlicedText);

    sliceOfText = sliceOfText.slice(0, lastWordIndex).trimEnd();
  }

  return sliceOfText;
}

// Удаление лишних пробелов из строки
function removeExtraSpaces(str) {
  return str.replace(/\s{2,}/gm, ' ').trim();
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

export {
  getRandomInt,
  getRandomElemsFromArr,
  uniqueIdGenerator,
  getLoremDescription,
  isEscapeKey,
  isValidHashTag
};
