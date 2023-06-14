function checkStringLength(string, length) {
  return string.length <= length;
}

function isPalindrome(string) {
  const normalizedString = string.toLowerCase().replaceAll(' ', '');
  const reversedString = [...normalizedString].reverse().join('');

  // Специально не буду менять данную функцию, чтобы проверить разрешение конфликтов в гите

  return normalizedString === reversedString;
}

function getNumFromStr(text) {
  const result = text.toString().replaceAll(' ', '');

  return result.replace(/\D/g, '') || NaN;
}
