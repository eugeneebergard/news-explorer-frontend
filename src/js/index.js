import '../css/style.css';

// Импорт классов
import Popup from './components/Popup';
import Form from './components/Form';
import Header from './components/Header';
import NewsCardList from './components/NewsCardList';
// Импорт констант
const { validMessages, errorApiMessages, options } = require('./constants/constants');
// Импорт утилит
const { checkAuth, signup, signin, signout, searchNews, callShowMore } = require('./utils/utils');


// Обращение к DOM дереву

// Popups
const popupAuth = document.querySelector('.popup_type_auth');
const popupSignup = document.querySelector('.popup_type_signup');
const popupSuccess = document.querySelector('.popup_type_success');
// Forms
const formAuth = document.querySelector('.popup__form_type_auth');
const formSignup = document.querySelector('.popup__form_type_signup');
// Submits
const submitAuth = document.querySelector('.popup__button_type_auth');
const submitSignup = document.querySelector('.popup__button_type_signup');
// Ссылки внутри popups
const popupLinkSignup = document.querySelector('.popup__link_signup');
const popupLinkAuthFromSignup = document.querySelector('.popup__link_auth_from-signup');
const popupLinkAuthFromSuccess = document.querySelector('.popup__link_auth_from-success');
// Кнопки аутентификации двух версий
const buttonOpenAuthDesktop = document.getElementById('auth-desk');
const buttonOpenAuthMobile = document.getElementById('auth-mobile');
// Кнопки выхода двух версий
const buttonLogoutDesktop = document.getElementById('logout-desk');
const buttonLogoutMobile = document.getElementById('logout-mobile');
// Кнопки для закрытия popups
const buttonCloseAuth = document.querySelector('.popup__close_type_auth');
const buttonCloseSignup = document.querySelector('.popup__close_type_signup');
const buttonCloseSuccess = document.querySelector('.popup__close_type_success');
// Кнопки для открытия и закрытия меню в мобильной версии
const buttonOpenMenu = document.querySelector('.header__mobile-menu_open');
const buttonCloseMenu = document.querySelector('.header__mobile-menu_close');
// Меню мобильной версии
const mobileMenu = document.querySelector('.header__mobile-menu');
// Ссылка на articles двух версий
const linkArticlesDesktop = document.getElementById('articles-desk');
const linkArticlesMobile = document.getElementById('articles-mobile');
// Пользователь
const userName = document.querySelectorAll('.user-name');
// Элементы поиска новостей
const buttonSearch = document.getElementById('search-button');
const inputSearch = document.getElementById('search-input');
const buttonResult = document.querySelector('.result__button');

const headersElements = {
  mobileMenu: mobileMenu,
  linkArticlesDesktop: linkArticlesDesktop,
  linkArticlesMobile: linkArticlesMobile,
  buttonLogoutDesktop: buttonLogoutDesktop,
  buttonLogoutMobile: buttonLogoutMobile,
  buttonOpenAuthDesktop: buttonOpenAuthDesktop,
  buttonOpenAuthMobile: buttonOpenAuthMobile,
  userName: userName,
}

// Передача опций классам
const statePopupAuth = new Popup(popupAuth);
const statePopupSignup = new Popup(popupSignup);
const statePopupSuccess = new Popup(popupSuccess);
const formValidatorAuth = new Form(formAuth, submitAuth, validMessages);
const formValidatorSignup = new Form(formSignup, submitSignup, validMessages);
const stateHeader = new Header(headersElements, checkAuth);

// Слушатели событий

buttonOpenAuthMobile.addEventListener('click', () => {
  formValidatorAuth.setEventListeners();
  formValidatorAuth.setSubmitButtonStateDisactive();
  statePopupAuth.open();
});

buttonOpenAuthDesktop.addEventListener('click', () => {
  formValidatorAuth.setEventListeners();
  formValidatorAuth.setSubmitButtonStateDisactive();
  statePopupAuth.open();
});

popupLinkSignup.addEventListener('click', () => {
  statePopupAuth.close();
  formValidatorSignup.setEventListeners();
  formValidatorSignup.setSubmitButtonStateDisactive();
  statePopupSignup.open();
});

popupLinkAuthFromSignup.addEventListener('click', () => {
  statePopupSignup.close();
  formValidatorAuth.setEventListeners();
  formValidatorAuth.setSubmitButtonStateDisactive();
  statePopupAuth.open();
});

popupLinkAuthFromSuccess.addEventListener('click', () => {
  statePopupSuccess.close();
  statePopupAuth.open();
});

buttonCloseAuth.addEventListener('click', () => {
  statePopupAuth.close();
  formValidatorAuth.resetAllErrors();
  formAuth.reset();
});

buttonCloseSignup.addEventListener('click', () => {
  statePopupSignup.close();
  formValidatorSignup.resetAllErrors();
  formSignup.reset();
});

buttonCloseSuccess.addEventListener('click', () => {
  statePopupSuccess.close();
});

buttonOpenMenu.addEventListener('click', () => {
  stateHeader.showMenu();
});

buttonCloseMenu.addEventListener('click', () => {
  stateHeader.hideMenu();
});

submitSignup.addEventListener('click', (event) => {
  event.preventDefault();

  const email = document.querySelector('.popup__input_type_email-signup');
  const password = document.querySelector('.popup__input_type_password-signup');
  const name = document.querySelector('.popup__input_type_name-signup');
  const user = { email: email.value, name: name.value, password: password.value };

  signup(user, statePopupSignup, formSignup, statePopupSuccess);
});

submitAuth.addEventListener('click', (event) => {
  event.preventDefault();

  const email = document.querySelector('.popup__input_type_email-auth');
  const password = document.querySelector('.popup__input_type_password-auth');
  const user = { email: email.value, password: password.value };

  signin(user, statePopupAuth, formAuth)
});

buttonSearch.addEventListener('click', (event) => {
  event.preventDefault();
  const keyWord = inputSearch.value
  searchNews(keyWord);
});

buttonResult.addEventListener('click', (event) => {
  event.preventDefault();

  callShowMore();
})

buttonLogoutDesktop.addEventListener('click', () => signout());

buttonLogoutMobile.addEventListener('click', () => signout());

console.log(localStorage)
stateHeader.render();
