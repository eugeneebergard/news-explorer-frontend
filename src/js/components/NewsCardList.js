export default class NewsCardList {
  constructor(cardList, notFound, result, correctDate, mainApi, checkAuth, btnResult) {
    this.cardList = cardList;
    this.notFound = notFound;
    this.result = result;
    this.correctDate = correctDate;
    this.mainApi = mainApi;
    this.checkAuth = checkAuth;
    this.btnResult = btnResult;
  }

  renderResults(news, page, keyWord) {
    // Есть ли результат?
    let noRes;
    let articlesArray = [];
    // Первая ли это карточка в массиве?
    let newCard = true;
    this.keyWord = keyWord;
    this.newCard = newCard;
    // Вытаскиваем массив из объекта
    if (page === 'main') articlesArray = news.articles;
    else articlesArray = news.data;
    this.articlesArray = articlesArray;
    // Проверка на пустой массив
    if(page === 'main') {
      if (news.articles.length === 0) {
        // Результата нет, поэтому вызываем обработчик ошибки и выводим "ничего не найдено"
        noRes = true;
        this.renderError(noRes);
      } else {
        // Результат есть, поэтому вызываем обработчик ошибки и выводим результат
        noRes = false;
        this.renderError(noRes);
        // Чистим результаты от прошлых новостей
        this._clearResult();
        // Выводим 3 карточки на экран
        this.addCard(page);
      }
    } else {
      if(news.data.length === 0) {

      } else {
        this.addCard(page);
      }
    }
  }

  renderError(error) {
    if (error)  {
      this.notFound.classList.add('not-found_show');
      this.result.classList.remove('result_show');
    } else  {
      this.notFound.classList.remove('not-found_show');
      this.result.classList.add('result_show');
    }
  }

  addCard(page) {
    let actualArticles = [];


    if(page === 'main')  {
      actualArticles = this.articlesArray.splice(0, 3);

      if(this.articlesArray.length <= 3) this.btnResult.classList.add('result__button_hide');
      else this.btnResult.classList.remove('result__button_hide');
    } else  {
      actualArticles = this.articlesArray.reverse();
    }

    actualArticles.forEach((article) => {
      let card = {};
      //Выводим данные из карточки
      if (page === 'main') {
        card = {
          title: article.title,
          keyword: this.keyWord,
          image: article.urlToImage,
          date: article.publishedAt,
          text: article.description,
          source: article.source.name,
          link: article.url,
        }
      } else {
        card = {
          title: article.title,
          keyword: article.keyword,
          image: article.image,
          date: article.date,
          text: article.text,
          source: article.source,
          link: article.link,
          cardId: article._id,
        }
      }

        // Создаём разметку карточки
        const createdCard = this.createCard(card);
        // Проверяем, первая ли карточка и отрисовываем её
        if (this.newCard) this.cardList.insertBefore(createdCard, this.cardList.firstChild);
        else this.cardList.appendChild(createdCard);

        this.newCard = false;
    });
  }

  createCard(card) {
    // Создаем разметку карточки
    this.card = card;
    this.cardContainer = document.createElement('div');
    this.cardContainer.classList.add('card');
    if(this.card.image === null) this.card.image = "https://deti-i-mama.ru/wp-content/uploads/2020/07/gazeta_212005-132.jpg";
    this.cardContainer.insertAdjacentHTML(
      'beforeend',

      `
          <div class="card__heading">
            <div class="card__keyword">
              <p>${this.card.keyword}</p>
            </div>
            <div class="card__message">
              <p class="card__message-text"></p>
            </div>
            <button class="card__icon card__icon_bookmark"></button>
            <button class="card__icon card__icon_delete"></button>
            <img class="card__image" alt="К сожалению, картинка убежала с карточки :(" src="${this.card.image}">
          </div>
          <a class="card__content" href="${this.card.link}" target="_blank">
            <p class="card__data">${this.correctDate(this.card.date)}</p>
            <h3 class="card__title">${this.card.title}</h3>
            <div class="card__description">
              <p class="card__text">${this.card.text}</p>
            </div>
            <span class="card__publisher">${this.card.source}</span>
          </a>`,
    );

    this._setEventListeners();

    return this.cardContainer;
  }

  // Очистить блок результатов от карточек
  _clearResult() {
    if(this.cardList.firstChild) {
      while(this.cardList.firstChild) {
        this.cardList.removeChild(this.cardList.firstChild);
      }
    }
  }

  _saveCard(event, card) {
    if(this.checkAuth()) {
      const clickCard = event.target.closest('.card');
      const btn = clickCard.querySelector('.card__icon_bookmark')
      btn.classList.add('card__icon_bookmark_clicked');
      const options = {
        keyword: card.keyword,
        title: card.title,
        text: card.text,
        date: card.date,
        source: card.source,
        image: card.image,
        link: card.link,
      }
      this.mainApi.createArticle(options)
        .then(() => {
          btn.setAttribute('disabled', 'true');
          this._hideMessage(event);
        })
        .catch((err) => console.log(err));
    }
  }

  _deleteCard(event, card) {
    const clickCard = event.target.closest('.card');
    this.mainApi.removeArticle(card.cardId)
      .then(() => {
        this._removeEventListeners();
        clickCard.remove();
        location.reload();
      })
      .catch((err) => console.log(err));
  }

  _showMessage(event) {
    const clickCard = event.target.closest('.card');
    const message = clickCard.querySelector('.card__message');
    message.classList.add('card__message_show');
  }

  _hideMessage(event) {
    const clickCard = event.target.closest('.card');
    const message = clickCard.querySelector('.card__message');
    message.classList.remove('card__message_show');
  }

  _setEventListeners() {
    let card = this.card

    this
      .cardContainer
      .querySelector('.card__icon_bookmark')
      .addEventListener('click', () => this._saveCard(event, card));
    this
      .cardContainer
      .querySelector('.card__icon_delete')
      .addEventListener('click', () => this._deleteCard(event, card));

    if(!this.checkAuth()) {
      this
        .cardContainer
        .querySelector('.card__icon_bookmark')
        .addEventListener('mouseover', () => this._showMessage(event));
      this
        .cardContainer
        .querySelector('.card__icon_bookmark')
        .addEventListener('mouseout', () => this._hideMessage(event));
    } else {
      this
        .cardContainer
        .querySelector('.card__icon_delete')
        .addEventListener('mouseover', () => this._showMessage(event));
      this
        .cardContainer
        .querySelector('.card__icon_delete')
        .addEventListener('mouseout', () => this._hideMessage(event));
    }
  }

  _removeEventListeners() {
    this
      .cardContainer
      .querySelector('.card__icon_bookmark')
      .removeEventListener('click', () => this._saveCard(event));
    this
      .cardContainer
      .querySelector('.card__icon_delete')
      .removeEventListener('click', () => this._deleteCard(event));
    this
      .cardContainer
      .querySelector('.card__icon_delete')
      .removeEventListener('mouseover', () => this._showMessage(event));
    this
      .cardContainer
      .querySelector('.card__icon_delete')
      .removeEventListener('mouseout', () => this._hideMessage(event));
  }
}
