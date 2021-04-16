import '../css/articles.css';
// Импорт модулей
import Header from './components/Header';
// Импорт утилит и констант
const { headersElements } = require('./constants/constants');
const { checkAuth, callGetArticles, signout, redirect } = require('./utils/utils');
// Кнопки открытия и закрытия мобильного меню
const buttonOpenMenu = document.querySelector('.header__mobile-menu_open');
const buttonCloseMenu = document.querySelector('.header__mobile-menu_close');
// Мобильное меню
const mobileMenu = document.querySelector('.header__mobile-menu');
// Название страницы
const page = 'articles';
// Передача опций классам
const stateHeader = new Header(headersElements, checkAuth, page);

// Слушатели событий

// Открыть мобильное меню
buttonOpenMenu.addEventListener('click', () => {
  mobileMenu.classList.add('header__mobile-menu_show');
});
// Закрыть мобильное меню
buttonCloseMenu.addEventListener('click', () => {
  mobileMenu.classList.remove('header__mobile-menu_show');
});
// Выход из аккаунта десктопной версии
headersElements.buttonLogoutDesktop.addEventListener('click', () => signout());

// Выход из аккаунта мобильной версии
headersElements.buttonLogoutMobile.addEventListener('click', () => signout());

// Вызов утилит и методов

// Редирект на главную, если пользователь не авторизован
redirect();
// Прорисовка сохранённых статей
callGetArticles();
// Рендер header
stateHeader.render();
