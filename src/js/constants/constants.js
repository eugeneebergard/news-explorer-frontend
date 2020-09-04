// Кнопки аутентификации двух версий
const buttonOpenAuthDesktop = document.getElementById('auth-desk');
const buttonOpenAuthMobile = document.getElementById('auth-mobile');
// Кнопки выхода двух версий
const buttonLogoutDesktop = document.getElementById('logout-desk');
const buttonLogoutMobile = document.getElementById('logout-mobile');
// Меню мобильной версии
const mobileMenu = document.querySelector('.header__mobile-menu');
// Ссылка на articles двух версий
const linkArticlesDesktop = document.getElementById('articles-desk');
const linkArticlesMobile = document.getElementById('articles-mobile');
// Элементы заголовка в saved-articles
const titleUserName = document.querySelector('.saved-articles__user-name');
const articlesLength = document.querySelector('.saved-articles__articles-length');
const keywords = document.querySelector('.saved-articles__keywords');
const keywordsOthers = document.querySelector('.saved-articles__others');
const description = document.querySelector('.saved-articles__description');
const howMatch = document.querySelector('.saved-articles__how-match');
const savedArticlesAnd = document.querySelector('.saved-articles__and');
// Пользователь
const userName = document.querySelectorAll('.user-name');

const savedArticlesElements = {
  userName: titleUserName,
  length: articlesLength,
  keywords: keywords,
  others: keywordsOthers,
  description: description,
  howMatch: howMatch,
  and: savedArticlesAnd
}

const validMessages = {
  validationEmpty: "Это поле обязательное",
  validationEmail: "email в формате example@gmail.com",
  validationPass: "Пароль должен быть не менее 8 символов"
};

const errorApiMessages = {
  rateLimiter: "Превышен лимит запросов за последние сутки",
  authError: "Неправильные почта или пароль",
  signupError: "Пользователь с таким email уже существует",
  serverError: "Ошибка сервера",
}

const errorSearchMessages = {
  'notFound': {
    title: 'Ничего не найдено',
    text: 'К сожалению по вашему запросу ничего не найдено'
  },
  'serverError': {
    title: 'Во время запроса произошла ошибка',
    text: 'Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
  },
}

const cardMessages = {
  notAuth: "Войдите, чтобы сохранять статьи",
  saveArticle: "Сохранить статью",
  removeArticle: "Убрать из сохранённых"
}

// Набор опций для API запросов
const options = {
  baseUrl: NODE_ENV === 'development' ? 'http://api.news-explorer-ee.tk' : 'https://api.news-explorer-ee.tk',
};

// Элементы хедера
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

module.exports = {
  savedArticlesElements, validMessages, errorApiMessages, errorSearchMessages, cardMessages, options, headersElements
};
