import './style.css';

const popupAuth = document.querySelector('.popup_type_auth');
const popupSignup = document.querySelector('.popup_type_signup');

const popupLinkSignup = document.querySelector('.popup__link_signup');
const popupLinkAuth = document.querySelector('.popup__link_auth');

const buttonOpenAuth = document.querySelector('.header__button_auth');

const buttonCloseAuth = document.querySelector('.popup__close_type_auth');
const buttonCloseSignup = document.querySelector('.popup__close_type_signup');

buttonOpenAuth.addEventListener('click', () => {
  popupAuth.classList.add('popup_is-opened')
});

popupLinkSignup.addEventListener('click', () => {
  popupAuth.classList.remove('popup_is-opened')
  popupSignup.classList.add('popup_is-opened')
});

popupLinkAuth.addEventListener('click', () => {
  popupSignup.classList.remove('popup_is-opened')
  popupAuth.classList.add('popup_is-opened')
});

buttonCloseAuth.addEventListener('click', () => {
  popupAuth.classList.remove('popup_is-opened')
});

buttonCloseSignup.addEventListener('click', () => {
  popupSignup.classList.remove('popup_is-opened')
});


