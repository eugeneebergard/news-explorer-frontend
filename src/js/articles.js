import '../css/articles.css';

const buttonOpenMenu = document.querySelector('.header__mobile-menu_open');
const buttonCloseMenu = document.querySelector('.header__mobile-menu_close');

const mobileMenu = document.querySelector('.header__mobile-menu');


buttonOpenMenu.addEventListener('click', () => {
  mobileMenu.classList.add('header__mobile-menu_show');
});

buttonCloseMenu.addEventListener('click', () => {
  mobileMenu.classList.remove('header__mobile-menu_show');
});

if(localStorage.jwtToken === '' || !localStorage.jwtToken) {
  document.location.href = './';
}
