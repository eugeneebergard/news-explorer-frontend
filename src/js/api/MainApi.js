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
      headers: {
        'Content-Type': 'application/json',
      },
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
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();

        return Promise.reject(new TypeError(`Ошибка: ${res.status}`));
      });
  }

  getUserData() {
    return fetch(`${this.options.baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    })
      .then((res) => {
        if (res.ok) return res.json();

        return Promise.reject(new TypeError(`Ошибка: ${res.status}`));
      });
  }

  getArticles() {
    return fetch(`${this.options.baseUrl}/articles`, {
      headers: this.options.headers,
    })
      .then((res) => {
        if (res.ok) return res.json();

        return Promise.reject(new TypeError(`Ошибка: ${res.status}`));
      });
  }

  createArticle() {
    return fetch(`${this.options.baseUrl}/articles`, {
      method: 'POST',
      headers: this.options.headers,
    })
      .then((res) => {
        if (res.ok) return res.json();

        return Promise.reject(new TypeError(`Ошибка: ${res.status}`));
      });
  }

  removeArticle(id) {
    return fetch(`${this.options.baseUrl}/articles${id}`, {
      method: 'DELETE',
      headers: this.options.headers,
    })
      .then((res) => {
        if (res.ok) return res.json();

        return Promise.reject(new TypeError(`Ошибка: ${res.status}`));
      });
  }
}
