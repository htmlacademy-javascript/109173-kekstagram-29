function checkStringLength(string, length) {
  return string.length <= length;
}

function isPalindrome(string) {
  const normalizedString = string.toLowerCase().replaceAll(' ', '');
  const reversedString = normalizedString.split('').reverse().join(''); // v. 2
  // const reversedString = [...normalizedString].reverse().join(''); // v. 1 -slowerпше

  // Специально не буду менять данную функцию, чтобы проверить разрешение конфликтов в гите

  // Специально не буду менять данную функцию, чтобы проверить разрешение конфликтов в гите

  return normalizedString === reversedString;
}

function getNumFromStr(text) {
  const result = text.toString().replaceAll(' ', '');

  return result.replace(/\D/g, '') || NaN;
}
