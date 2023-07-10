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
function minutesToHours(minutes) {
  if (!minutes) {
    return null;
  }

  const hoursMinutes = {h: 0, m: minutes};

  if (minutes >= 60) {
    const hours = minutes / 60;

    hoursMinutes.h = parseInt(hours, 10);
    hoursMinutes.m = hours % 1 * 60;
  }

  return hoursMinutes;
}

// Получение минут из строки с часами и минутами (формат - 08:00)
function getMinutesFromTime(timeString) {
  const normilizedTimeString = timeString.replace(/[^:|\d]/g, '');
  const [hours, minutes] = normilizedTimeString.split(':');

  return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
}

// Функция для проверки длительности встречи в рамках рабочего дня (один и тот же день)
function checkMeetTimeInBounds(workDayStartTime, workDayEndTime, meetingStartTime, meetingDuration) {
  // Преобразуем строковое время в минуты, для удобства манипуляций и короткой записи - в те же переменные
  meetingDuration = getMinutesFromTime(meetingStartTime) + meetingDuration;
  workDayStartTime = getMinutesFromTime(workDayStartTime);
  workDayEndTime = getMinutesFromTime(workDayEndTime);

  return meetingDuration >= workDayStartTime && meetingDuration <= workDayEndTime;
}
