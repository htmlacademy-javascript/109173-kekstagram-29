function checkStringLength(string, length) {
  return string.length <= length;
}

function isPalindrome(string) {
  const normalizedString = string.toLowerCase().replaceAll(' ', '');

  // Быстрее с точки зрения алгоритмической сложности
  for (let i = 0; i < normalizedString.length; i++) {
    let lastIndex = normalizedString.length - 1 - i;

    if (normalizedString[i] !== normalizedString[lastIndex]) return false;
  }

  return true;
}
function getNumFromStr(text) {
  const result = text.toString().replaceAll(' ', '');

  return result.replace(/\D/g, '') || NaN;
}
