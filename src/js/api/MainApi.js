export default class Api {
  constructor(options, errorApiMessages, errorAuth, errorSignup) {
    this.options = options;
    this.errorApiMessages = errorApiMessages;
    this.errorAuth = errorAuth;
    this.errorSignup = errorSignup;
  }

  signup(user) {
    const { email, password, name } = user;

    return fetch(`${this.options.baseUrl}/signup`, {
      credentials: 'include',
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
    const { email, password } = user;

    return fetch(`${this.options.baseUrl}/signin`, {
      credentials: 'include',
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
      credentials: 'include',
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
      credentials: 'include',
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

  createArticle(card) {
    const { keyword, title, text, date, source, link, image } = card;
    return fetch(`${this.options.baseUrl}/articles`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
      },
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();

        return Promise.reject(new TypeError(`Ошибка: ${res.status}`));
      });
  }

  removeArticle(id) {
    return fetch(`${this.options.baseUrl}/articles/${id}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
      },
      body: JSON.stringify({
        id
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();

        return Promise.reject(new TypeError(`Ошибка: ${res.status}`));
      });
  }
}
