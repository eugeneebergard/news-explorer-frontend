export default class Api {
  constructor(options) {
    this.options = options;
  }

  signup(user) {
    const { email } = user;
    const { password } = user;
    const { name } = user;

    return fetch(`${this.options.baseUrl}/signup`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();

        return Promise.reject(new TypeError(`Ошибка: ${res.status}`));
      });
  }

  signin() {

  }

  getUserData() {

  }

  getArticles() {

  }

  createArticle() {

  }

  removeArticle() {

  }
}
