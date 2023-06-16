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

  if (cutByWord && loremText[sliceOfText.length] !== ' ') {
    const lastWordInSlicedText = sliceOfText.split(' ').at(-1);
    const lastWordIndex = sliceOfText.lastIndexOf(lastWordInSlicedText);

    sliceOfText = sliceOfText.slice(0, lastWordIndex).trimEnd();
  }

  return sliceOfText;
}

export {getRandomInt, getRandomElemsFromArr, uniqueIdGenerator, getLoremDescription};
