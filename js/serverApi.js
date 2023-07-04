const BASE_URL = 'https://29.javascript.pages.academy/kekstagram';
const Routes = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Methods = {
  GET: 'GET',
  POST: 'POST'
};
const DataErrors = {
  LOAD: 'Не удалось загрузить данные с сервера. Попробуйте позднее.',
  SEND: 'Не удалось отправить данные на сервер. Попробуйте повторить отправку.'
};

function loadData(route, errorText, method = Methods.GET, body = null) {
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
  return loadData(Routes.GET_DATA, DataErrors.LOAD);
}

function sendData(data) {
  return loadData(Routes.SEND_DATA, DataErrors.SEND, Methods.POST, data);
}

export {getData, sendData};
