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
// Forms
const formAuth = document.querySelector('.popup__form_type_auth');
const formSignup = document.querySelector('.popup__form_type_signup');
// Submits
const submitAuth = document.querySelector('.popup__button_type_auth');
const submitSignup = document.querySelector('.popup__button_type_signup');
// Ссылки внутри popups
const popupLinkSignup = document.querySelector('.popup__link_signup');
const popupLinkAuth = document.querySelector('.popup__link_auth');
// Кнопки аутентификации двух версий
const buttonOpenAuthDesktop = document.getElementById('auth-desk');
const buttonOpenAuthMobile = document.getElementById('auth-mobile');
// Кнопки для закрытия popups
const buttonCloseAuth = document.querySelector('.popup__close_type_auth');
const buttonCloseSignup = document.querySelector('.popup__close_type_signup');
// Кнопки для открытия и закрытия меню в мобильной версии
const buttonOpenMenu = document.querySelector('.header__mobile-menu_open');
const buttonCloseMenu = document.querySelector('.header__mobile-menu_close');
// Меню мобильной версии
const mobileMenu = document.querySelector('.header__mobile-menu');

// Передача опций классам
const statePopupAuth = new Popup(popupAuth);
const statePopupSignup = new Popup(popupSignup);
const stateMobileMenu = new Header(mobileMenu);
const formValidatorAuth = new Form(formAuth, submitAuth, validMessage);
const formValidatorSignup = new Form(formSignup, submitSignup, validMessage);
const mainApi = new MainApi(options);

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

popupLinkAuth.addEventListener('click', () => {
  statePopupSignup.close();
  formValidatorAuth.setEventListeners();
  formValidatorAuth.setSubmitButtonStateDisactive();
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

buttonOpenMenu.addEventListener('click', () => {
  stateMobileMenu.showMenu();
});

buttonCloseMenu.addEventListener('click', () => {
  stateMobileMenu.hideMenu();
});

submitSignup.addEventListener('click', (event) => {
  event.preventDefault();

  const email = document.querySelector('.popup__input_type_email-signup');
  const password = document.querySelector('.popup__input_type_password-signup');
  const name = document.querySelector('.popup__input_type_name-signup');
  const user = { email: email.value, name: name.value, password: password.value };

  submitSignup.textContent = 'Загрузка...';

  mainApi.signup(user)
    .then((res) => {
      submitSignup.textContent = 'Зарегистрироваться';
    })
    .catch((err) => console.log(err));

  formSignup.reset();
  statePopupSignup.close();
});

submitAuth.addEventListener('click', (event) => {
  event.preventDefault();

  const email = document.querySelector('.popup__input_type_email-auth');
  const password = document.querySelector('.popup__input_type_password-auth');
  const user = { email: email.value, password: password.value };

  submitAuth.textContent = 'Загрузка...';

  mainApi.signin(user)
    .then((res) => {
      submitAuth.textContent = 'Зарегистрироваться';
    })
    .catch((err) => console.log(err));

  formAuth.reset();
  statePopupAuth.close();
});




