import MainApi from '../api/MainApi';
import NewsApi from '../api/NewsApi';
import NewsCardList from '../components/NewsCardList';

const errorAuth = document.getElementById('error-auth');
const errorSignup = document.getElementById('error-signup');

const cardList = document.querySelector('.result__list');
const notFound = document.querySelector('.not-found');
const result = document.querySelector('.result');

const { options, errorApiMessages } = require('../constants/constants');

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
export function searchNews(keyWord) {
  newsApi.getNews(keyWord, actualDate)
    .then((res) => {
      newsCardList.renderResults(res);
    })
    .then(() => {
      // Убрать лоудер
    })
    .catch((err) => {
      // Убрать лоудер
      console.log(err);
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



