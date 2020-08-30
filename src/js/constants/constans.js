const validMessage = {
  validationEmpty: "Это поле обязательное",
  validationEmail: "email в формате example@gmail.com",
};
// Набор опций для API запросов
const options = {
  baseUrl: NODE_ENV === 'development' ? 'http://api.news-explorer-ee.tk' : 'https://api.news-explorer-ee.tk',
  headers: {
    'Content-Type': 'application/json',
  },
};

module.exports = {
  validMessage, options
};
