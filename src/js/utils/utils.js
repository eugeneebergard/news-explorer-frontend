// Импорт модулей
import MainApi from '../api/MainApi';
import NewsApi from '../api/NewsApi';
import NewsCardList from '../components/NewsCardList';
import NewsCard from '../components/NewsCard';
// Места вывода ошибок popup'a и поиска
const errorAuth = document.getElementById('error-auth');
const errorSignup = document.getElementById('error-signup');
const resultErrorTitle = document.querySelector('.not-found__heading');
const resultErrorText = document.querySelector('.not-found__text');
// Блок результатов
const cardList = document.querySelector('.result__list');
const notFound = document.querySelector('.not-found');
const result = document.querySelector('.result');
// Импорт констант
const { options, errorApiMessages, errorSearchMessages, cardMessages } = require('../constants/constants');
// Объявление методов
const mainApi = new MainApi(options, errorApiMessages, errorAuth, errorSignup);
const newsApi = new NewsApi();
const newsCardList = new NewsCardList(cardList, notFound, result, correctDate, mainApi, checkAuth);
const newCard = new NewsCard(checkAuth, cardMessages);

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

// Поиск новостей
export function searchNews(keyWord, preloader) {
  // Перед загрузкой скрываем прошлые результаты и ошибки, включаем прелоадер
  hideResult();
  notFound.classList.remove('not-found_show');
  preloader.classList.add('preloader_show');
  // Запрос новостей
  newsApi.getNews(keyWord, actualDate)
    .then((res) => {
      // Если запрос успешен - вызываем рендер
      newsCardList.renderResults(res, keyWord);
    })
    .then(() => {
      hidePreload(preloader);
      // Если запрос успешен, возвращаем начальное сообщение в not-found
      resultErrorTitle.textContent = errorSearchMessages.notFound.title;
      resultErrorText.textContent = errorSearchMessages.notFound.text;
      // и вызываем рендер иконок
      callRenderIcons('main');
    })
    .catch(() => {
      // Если запрос не успешен, скрываем прелоадер и выводим сообщение ошибки сервера
      hidePreload(preloader);
      resultErrorTitle.textContent = errorSearchMessages.serverError.title;
      resultErrorText.textContent = errorSearchMessages.serverError.text;
      notFound.classList.add('not-found_show');
    });
}

// Парсинг даты
export function correctDate(string) {
  const date = new Date(string);
  return date.toLocaleDateString();
}

// Вызов метода, добавляющий карточки
export function callShowMore() {
  newsCardList.addCard();
}

// Вызов рендера иконок
export function callRenderIcons(page) {
  newCard.renderIcon(page);
}

// Вызов запроса сохранённых карточек
export function callGetArticles() {
  mainApi.getArticles()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
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

// Скрыть прелоадер
function hidePreload(preloader) {
  preloader.classList.remove('preloader_show');
}

// Скрыть блок результатов
function hideResult() {
  result.classList.remove('result_show');
}



