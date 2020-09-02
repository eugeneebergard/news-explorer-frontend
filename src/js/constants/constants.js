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
// Набор опций для API запросов
const options = {
  baseUrl: NODE_ENV === 'development' ? 'http://api.news-explorer-ee.tk' : 'https://api.news-explorer-ee.tk',
};

module.exports = {
  validMessages, errorApiMessages, options,
};
