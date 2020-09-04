import '../css/style.css';

// Импорт классов
import Popup from './components/Popup';
import Form from './components/Form';
import Header from './components/Header';
// Импорт констант
const { validMessages, headersElements } = require('./constants/constants');
// Импорт утилит
const { checkAuth, signup, signin, signout, searchNews, callShowMore, callRenderIcons } = require('./utils/utils');

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
// Кнопки для закрытия popups
const buttonCloseAuth = document.querySelector('.popup__close_type_auth');
const buttonCloseSignup = document.querySelector('.popup__close_type_signup');
const buttonCloseSuccess = document.querySelector('.popup__close_type_success');
// Кнопки для открытия и закрытия меню в мобильной версии
const buttonOpenMenu = document.querySelector('.header__mobile-menu_open');
const buttonCloseMenu = document.querySelector('.header__mobile-menu_close');
// Элементы поиска новостей
const buttonSearch = document.getElementById('search-button');
const inputSearch = document.getElementById('search-input');
const buttonResult = document.querySelector('.result__button');
// Прелоадер
const preloader = document.querySelector('.preloader');

const page = 'main';

// Передача опций классам
const statePopupAuth = new Popup(popupAuth);
const statePopupSignup = new Popup(popupSignup);
const statePopupSuccess = new Popup(popupSuccess);
const formValidatorAuth = new Form(formAuth, submitAuth, validMessages);
const formValidatorSignup = new Form(formSignup, submitSignup, validMessages);
const stateHeader = new Header(headersElements, checkAuth, page);

// Слушатели событий


// Вызов попапа с авторизацией из мобильного меню
headersElements.buttonOpenAuthMobile.addEventListener('click', () => {
  formValidatorAuth.setEventListeners();
  formValidatorAuth.setSubmitButtonStateDisactive();
  statePopupAuth.open();
});

// Вызов попапа с авторизацией из десктопного меню
headersElements.buttonOpenAuthDesktop.addEventListener('click', () => {
  formValidatorAuth.setEventListeners();
  formValidatorAuth.setSubmitButtonStateDisactive();
  statePopupAuth.open();
});

// Переход с попапа авторизации к попапу регистрации
popupLinkSignup.addEventListener('click', () => {
  statePopupAuth.close();
  formValidatorSignup.setEventListeners();
  formValidatorSignup.setSubmitButtonStateDisactive();
  statePopupSignup.open();
});

// Переход с попапа регистрации на попап авторизации
popupLinkAuthFromSignup.addEventListener('click', () => {
  statePopupSignup.close();
  formValidatorAuth.setEventListeners();
  formValidatorAuth.setSubmitButtonStateDisactive();
  statePopupAuth.open();
});

// Переход с попапа после регистрации на попап авторизации
popupLinkAuthFromSuccess.addEventListener('click', () => {
  statePopupSuccess.close();
  statePopupAuth.open();
});

// Закрыть попап авторизации
buttonCloseAuth.addEventListener('click', () => {
  statePopupAuth.close();
  formValidatorAuth.resetAllErrors();
  formAuth.reset();
});

// Закрыть попап регистрации
buttonCloseSignup.addEventListener('click', () => {
  statePopupSignup.close();
  formValidatorSignup.resetAllErrors();
  formSignup.reset();
});

// Закрыть уведомление об успешной регистрации
buttonCloseSuccess.addEventListener('click', () => {
  statePopupSuccess.close();
});

// Открыть мобильное меню
buttonOpenMenu.addEventListener('click', () => {
  stateHeader.showMenu();
});

// Закрыть мобильное меню
buttonCloseMenu.addEventListener('click', () => {
  stateHeader.hideMenu();
});

// Кнопка регистрации
submitSignup.addEventListener('click', (event) => {
  event.preventDefault();

  const email = document.querySelector('.popup__input_type_email-signup');
  const password = document.querySelector('.popup__input_type_password-signup');
  const name = document.querySelector('.popup__input_type_name-signup');
  const user = { email: email.value, name: name.value, password: password.value };

  signup(user, statePopupSignup, formSignup, statePopupSuccess);
});

// Кнопка авторизации
submitAuth.addEventListener('click', (event) => {
  event.preventDefault();

  const email = document.querySelector('.popup__input_type_email-auth');
  const password = document.querySelector('.popup__input_type_password-auth');
  const user = { email: email.value, password: password.value };

  signin(user, statePopupAuth, formAuth)
});

// Поиск новостей
buttonSearch.addEventListener('click', (event) => {
  event.preventDefault();

  const keyWord = inputSearch.value

  if (keyWord && keyWord !== '' )  {
    searchNews(keyWord, preloader);
  }
});

// Кнопка показать больше
buttonResult.addEventListener('click', (event) => {
  event.preventDefault();
  callShowMore();
  callRenderIcons(page);
});

// Выход из аккаунта десктопной версии
headersElements.buttonLogoutDesktop.addEventListener('click', () => signout());

// Выход из аккаунта мобильной версии
headersElements.buttonLogoutMobile.addEventListener('click', () => signout());


console.log(localStorage)
// Рендер хедера
stateHeader.render();
