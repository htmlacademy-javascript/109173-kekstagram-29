/*
  TODO: Попробовать реализовать повторную попытку
  загрузки изображений с сервера в случае неудачи (n-число раз)
*/
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

const loadData = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => loadData(Route.GET_DATA, ErrorText.LOAD);

const sendData = (data) => loadData(Route.SEND_DATA, ErrorText.SEND, Method.POST, data);

export {getData, sendData};
