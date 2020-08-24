import './style.css';

const popupAuth = document.querySelector('.popup_type_auth');
const popupSignup = document.querySelector('.popup_type_signup');

const popupLinkSignup = document.querySelector('.popup__link_signup');
const popupLinkAuth = document.querySelector('.popup__link_auth');

const buttonOpenAuth = document.querySelector('.header__button_auth');

const buttonCloseAuth = document.querySelector('.popup__close_type_auth');
const buttonCloseSignup = document.querySelector('.popup__close_type_signup');

const buttonOpenMenu = document.querySelector('.header__mobile-menu_open');
const buttonCloseMenu = document.querySelector('.header__mobile-menu_close');

const mobileMenu = document.querySelector('.header__mobile-menu');
const desktopMenu = document.querySelector('.header__border');

buttonOpenAuth.addEventListener('click', () => {
  popupAuth.classList.add('popup_is-opened');
});

popupLinkSignup.addEventListener('click', () => {
  popupAuth.classList.remove('popup_is-opened');
  popupSignup.classList.add('popup_is-opened');
});

popupLinkAuth.addEventListener('click', () => {
  popupSignup.classList.remove('popup_is-opened');
  popupAuth.classList.add('popup_is-opened');
});

buttonCloseAuth.addEventListener('click', () => {
  popupAuth.classList.remove('popup_is-opened');
});

buttonCloseSignup.addEventListener('click', () => {
  popupSignup.classList.remove('popup_is-opened');
});

buttonOpenMenu.addEventListener('click', () => {
  mobileMenu.classList.add('header__mobile-menu_show');
  desktopMenu.classList.add('header__border_hidden');
});

buttonCloseMenu.addEventListener('click', () => {
  mobileMenu.classList.remove('header__mobile-menu_show');
  desktopMenu.classList.remove('header__border_hidden');
});




