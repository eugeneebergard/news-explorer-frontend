import '../css/style.css';

const popupAuth = document.querySelector('.popup_type_auth');
const popupSignup = document.querySelector('.popup_type_signup');

const popupLinkSignup = document.querySelector('.popup__link_signup');
const popupLinkAuth = document.querySelector('.popup__link_auth');

const buttonOpenAuthDesktop = document.getElementById('auth-desk')
const buttonOpenAuthMobile = document.getElementById('auth-mobile')

const buttonCloseAuth = document.querySelector('.popup__close_type_auth');
const buttonCloseSignup = document.querySelector('.popup__close_type_signup');

const buttonOpenMenu = document.querySelector('.header__mobile-menu_open');
const buttonCloseMenu = document.querySelector('.header__mobile-menu_close');

const mobileMenu = document.querySelector('.header__mobile-menu');

buttonOpenAuthMobile.addEventListener('click', () => {
  popupAuth.classList.add('popup_is-opened');
});

buttonOpenAuthDesktop.addEventListener('click', () => {
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
});

buttonCloseMenu.addEventListener('click', () => {
  mobileMenu.classList.remove('header__mobile-menu_show');
});




