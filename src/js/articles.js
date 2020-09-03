import '../css/articles.css';

const { checkAuth, callRenderIcons, callGetArticles } = require('./utils/utils');

const buttonOpenMenu = document.querySelector('.header__mobile-menu_open');
const buttonCloseMenu = document.querySelector('.header__mobile-menu_close');


const mobileMenu = document.querySelector('.header__mobile-menu');

const page = 'articles';

buttonOpenMenu.addEventListener('click', () => {
  mobileMenu.classList.add('header__mobile-menu_show');
});

buttonCloseMenu.addEventListener('click', () => {
  mobileMenu.classList.remove('header__mobile-menu_show');
});

function checkUserAuth() {
  if(!checkAuth()) return document.location.href = './';
}

checkUserAuth();
callGetArticles();
