const BASE_URL = 'https://29.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST'
};
const ErrorText = {
  LOAD: 'Не удалось загрузить данные с сервера. Перезагрузите страницу или попробуйте позднее.',
  SEND: 'Не удалось отправить данные на сервер. Попробуйте повторить отправку.'
};

function loadData(route, errorText, method = Method.GET, body = null) {
  return fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error();
    })
    .catch(() => {
      throw new Error(errorText);
    });
}

function getData() {
  return loadData(Route.GET_DATA, ErrorText.LOAD);
}

function sendData(data) {
  return loadData(Route.SEND_DATA, ErrorText.SEND, Method.POST, data);
}

export {getData, sendData};
