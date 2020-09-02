export default class NewsCardList {
  constructor(cardList, notFound, result, correctDate) {
    this.cardList = cardList;
    this.notFound = notFound;
    this.result = result;
    this.correctDate = correctDate;
  }

  renderResults(news) {
    // Есть ли результат?
    let noRes;
    // Первая ли это карточка в массиве?
    let newCard = true;
    this.newCard = newCard;
    // Вытаскиваем массив из объекта
    const articlesArray = news.articles;
    this.articlesArray = articlesArray;
    // Проверка на пустой массив
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
      this.addCard();
    }
  }

  renderLoader() {

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

  addCard() {
    if(this.articlesArray.length < 3) {

    }
    // Вырезаем 3 карточки из массива
    const actualArticles = this.articlesArray.splice(0, 3);
    actualArticles.forEach((article) => {
      //Выводим данные из карточки
        const card = {
          title: article.title,
          keyword: article.keyword,
          image: article.urlToImage,
          date: article.publishedAt,
          description: article.description,
          publisher: article.source.name,
          link: article.url,
          cardId: article._id,
        }

        // Создаём разметку карточки
        const createdCard = this.createCard(card);
        // Проверяем, первая ли карточка и отрисовывем её
        if (this.newCard) {
          this.cardList.insertBefore(createdCard, this.cardList.firstChild);
        } else {
          this.cardList.appendChild(createdCard);
        }
        this.newCard = false;
    });
  }

  createCard(card) {
    this.card = card;
    this.cardContainer = document.createElement('div');
    this.cardContainer.classList.add('card');
    if(this.card.image === null) this.card.image = "https://thumbs.dreamstime.com/b/stack-newspaper-18883891.jpg";
    console.log(this.card.image);
    this.cardContainer.insertAdjacentHTML(
      'beforeend',

      `<a class="link" href="${this.card.link}" target="_blank">
          <div class="card__heading">
            <img class="card__image" alt="К сожалению, картинка убежала с карточки :(" src="${this.card.image}">
          </div>
          <div class="card__content">
            <p class="card__data">${this.correctDate(this.card.date)}</p>
            <h3 class="card__title">${this.card.title}</h3>
            <div class="card__description">
              <p class="card__text">${this.card.description}</p>
            </div>
            <span class="card__publisher">${this.card.publisher}</span>
          </div>
        </a>`,
    );

    return this.cardContainer;
  }

  _clearResult() {
    if(this.cardList.firstChild) {
      while(this.cardList.firstChild) {
        this.cardList.removeChild(this.cardList.firstChild);
      }
    }
  }

}
