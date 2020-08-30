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
      headers: this.options.headers,
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

  signin(user) {
    const { email } = user;
    const { password } = user;

    return fetch(`${this.options.baseUrl}/signin`, {
      method: 'POST',
      headers: this.options.headers,
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(new TypeError(`Ошибка: ${res.status}`));
      });
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
