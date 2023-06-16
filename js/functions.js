function checkStringLength(string, length) {
  return string.length <= length;
}

function isPalindrome(string) {
  const normalizedString = string.toLowerCase().replaceAll(' ', '');

  // Быстрее с точки зрения алгоритмической сложности
  for (let i = 0; i < normalizedString.length; i++) {
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

// Получение часов и минут из значения минут.
function getHoursFromMinutes(minutes) {
  if (!minutes) {
    return null;
  }

  const hoursMinutes = {h: 0, m: minutes};

  /*
    hoursMinutes.m = hours % 1 * 60;
    Получаем дробную часть. т.к. она дробная,
    то при умножении на целое число, в нашем случае - 60 минут,
    мы получим часть от этого числа, т.е. оставшееся количество минут.
  */
  if (minutes >= 60) {
    let hours = minutes / 60;

    hoursMinutes.h = parseInt(hours, 10);
    hoursMinutes.m = hours % 1 * 60;
  }

  return hoursMinutes;
}

// 5.16 Функции возвращаются
function checkMeetingTimings(workDayStartTime, workDayEndTime, meetingStartTime, meetingDuration) {

}
