import MainApi from '../api/MainApi';
import NewsApi from '../api/NewsApi';
import NewsCardList from '../components/NewsCardList';

const errorAuth = document.getElementById('error-auth');
const errorSignup = document.getElementById('error-signup');
const resultErrorTitle = document.querySelector('.not-found__heading');
const resultErrorText = document.querySelector('.not-found__text');

const cardList = document.querySelector('.result__list');
const notFound = document.querySelector('.not-found');
const result = document.querySelector('.result');

const { options, errorApiMessages, errorSearchMessages } = require('../constants/constants');

const mainApi = new MainApi(options, errorApiMessages, errorAuth, errorSignup);
const newsApi = new NewsApi();
const newsCardList = new NewsCardList(cardList, notFound, result, correctDate);

// Проверка авторизации
export function checkAuth() {
  if(localStorage.jwtToken && localStorage.jwtToken !== '') return true;
  return false;
}
// Логика при регистрации
export function signup(user, statePopupSignup, formSignup, statePopupSuccess) {
  mainApi.signup(user)
    .then(() => {
        statePopupSignup.close();
        formSignup.reset();
        statePopupSuccess.open();
    })
    .catch((err) => {
      console.log(err)
    });
}
// Логика при авторизации
export function signin(user, statePopupAuth, formAuth){
  mainApi.signin(user)
    .then((res) => {
      localStorage.setItem('jwtToken', res.token);
      getUserData(statePopupAuth, formAuth);
    })
    .catch((err) => console.log(err));
}
// Выход из аккаунта
export function signout() {
  localStorage.clear();
  location.reload();
}
// Получить имя пользователя
function getUserData(statePopupAuth, formAuth) {
  mainApi.getUserData()
    .then((res) => {
      localStorage.setItem('username', res.name)
      statePopupAuth.close();
      formAuth.reset();
      location.reload();
    })
    .catch((err) => console.log(err));
}
// Поиск новостей
export function searchNews(keyWord, preloader) {
  newsApi.getNews(keyWord, actualDate)
    .then((res) => {
      newsCardList.renderResults(res, keyWord);
    })
    .then(() => {
      hidePreload(preloader);
      // Если запрос успешен, возвращаем начальное сообщение в not-found
      resultErrorTitle.textContent = errorSearchMessages.notFound.title;
      resultErrorText.textContent = errorSearchMessages.notFound.text;
      notFound.classList.remove('not-found_show');
    })
    .catch(() => {
      hidePreload(preloader);
      // Если запрос не успешен, выводим сообщение ошибки сервера
      resultErrorTitle.textContent = errorSearchMessages.serverError.title;
      resultErrorText.textContent = errorSearchMessages.serverError.text;
      notFound.classList.add('not-found_show');
    });
}
// Рефакторинг числа
function editNum(num) {
  if (num >= 0 && num <= 9) {
    return `0${num}`;
  }
  return num;
}
// Получение актуальной даты
function actualDate() {
  const date = new Date();
  return `${editNum(date.getFullYear())}-${editNum(date.getMonth() + 1)}-${editNum(date.getDate() - 7)}`;
}
// Парсинг даты
export function correctDate(string) {
  const date = new Date(string);
  return date.toLocaleDateString();
}

export function callShowMore() {
  newsCardList.addCard();
}

function hidePreload(preloader) {
  preloader.classList.remove('preloader_show');
}

export function hideResult() {
  result.classList.remove('result_show');
}



