function checkStringLength(string, length) {
  return string.length <= length;
}

function isPalindrome(string) {
  const normalizedString = string.toLowerCase().replaceAll(' ', '');
  const reversedString = normalizedString.split('').reverse().join(''); // v. 2
  // const reversedString = [...normalizedString].reverse().join(''); // v. 1 -slowerпше

  return normalizedString === reversedString;
}

function getNumFromStr(text) {
  const result = typeof(text) === 'number' ? String(text) : text.replaceAll(' ', '');

  return result.replace(/\D/g, '') || NaN;
}
