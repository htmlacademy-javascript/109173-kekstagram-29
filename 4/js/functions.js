function checkStringLength(string, length) {
  return string.length <= length;
}

function isPalindrome(string) {
  const normalizedString = string.toLowerCase().replaceAll(' ', '');

  // Быстрее с точки зрения алгоритмической сложности
  for (const i = 0; i < normalizedString.length; i++) {
    const lastIndex = normalizedString.length - 1 - i;

    if (normalizedString[i] !== normalizedString[lastIndex]) {
      return false;
    }
  }

  return true;
}
function getNumFromStr(text) {
  const result = text.toString().replace(/\D/g, '');

  return parseInt(result, 10) || NaN;
}
