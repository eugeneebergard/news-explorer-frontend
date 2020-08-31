import '../css/style.css';

// Импорт модулей
import Popup from './components/Popup';
import Form from './components/Form';
import Header from './components/Header';
import MainApi from "./api/MainApi";
// Импорт констант
const { validMessage, options } = require('./constants/constans');

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

// Передача опций классам
const mainApi = new MainApi(options);
const statePopupAuth = new Popup(popupAuth);
const statePopupSignup = new Popup(popupSignup);
const statePopupSuccess = new Popup(popupSuccess);
const formValidatorAuth = new Form(formAuth, submitAuth, validMessage);
const formValidatorSignup = new Form(formSignup, submitSignup, validMessage);
const stateHeader = new Header(
  mobileMenu,
  linkArticlesDesktop,
  linkArticlesMobile,
  buttonLogoutDesktop,
  buttonLogoutMobile,
  buttonOpenAuthDesktop,
  buttonOpenAuthMobile,
  userName);

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

  mainApi.signup(user)
    .then(() => {
      statePopupSignup.close();
      formSignup.reset();
      statePopupSuccess.open();
    })
    .catch((err) => console.log(err));
});

submitAuth.addEventListener('click', (event) => {
  event.preventDefault();

  const email = document.querySelector('.popup__input_type_email-auth');
  const password = document.querySelector('.popup__input_type_password-auth');
  const user = { email: email.value, password: password.value };

  mainApi.signin(user)
    .then((res) => {
      localStorage.setItem('jwtToken', res.token);
    })
    .then(() => {
      mainApi.getUserData()
        .then((res) => {
          localStorage.setItem('username', res.name)
          statePopupAuth.close();
          formAuth.reset();
          location.reload();
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

buttonLogoutDesktop.addEventListener('click', () => {
  localStorage.clear();
  location.reload();
});

buttonLogoutMobile.addEventListener('click', () => {
  localStorage.clear();
  location.reload();
});

console.log(localStorage)
stateHeader.render();
