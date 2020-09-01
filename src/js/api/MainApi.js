export default class Api {
  constructor(options, errorApiMessages, errorAuth, errorSignup) {
    this.options = options;
    this.errorApiMessages = errorApiMessages;
    this.errorAuth = errorAuth;
    this.errorSignup = errorSignup;
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
        else if (res.status == 409)  {
          this.errorSignup.textContent = this.errorApiMessages.signupError;
          this.errorSignup.classList.add('error_is-active')
          console.log(this.errorApiMessages.signupError);
        } else {
          this.errorSignup.textContent = this.errorApiMessages.serverError;
          this.errorSignup.classList.add('error_is-active')
          console.log(this.errorApiMessages.serverError);
        }

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
        else if (res.status == 400 || res.status == 401)  {
          this.errorAuth.textContent = this.errorApiMessages.authError;
          this.errorAuth.classList.add('error_is-active')
          console.log(this.errorApiMessages.authError);
        } else {
          this.errorAuth.textContent = this.errorApiMessages.serverError;
          this.errorAuth.classList.add('error_is-active')
          console.log(this.errorApiMessages.serverError);
        }

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
