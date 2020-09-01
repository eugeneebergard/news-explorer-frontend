export default class NewsCardList {
  constructor(cardList, notFound, result, correctDate) {
    this.cardList = cardList;
    this.notFound = notFound;
    this.result = result;
    this.correctDate = correctDate;
  }

  renderResults(news) {
    let noRes;
    const newCard = true;
    const articlesArray = news.articles.reverse();

    if (news.articles.length === 0) {
      noRes = true;
      this.renderError(noRes);
    } else {
      noRes = false;
      this.renderError(noRes);
      articlesArray.forEach((article) => {
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

        const createdCard = this.addCard(card);

        if (newCard) {
          this.cardList.insertBefore(createdCard, this.cardList.firstChild);
        } else {
          this.cardList.appendChild(createdCard);
        }
      });
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

  showMore() {

  }

  addCard(card) {
    this.card = card;
    this.cardContainer = document.createElement('div');
    this.cardContainer.classList.add('card');
    this.cardContainer.insertAdjacentHTML(
      'beforeend',

      `<a class="link" href="${this.card.link}" target="_blank">
          <div class="card__heading">
            <img class="card__image" alt="К сожалению, картинка убежала с карточки :(" src="${this.card.image}">
          </div>
          <div class="card__content">
            <p class="card__data">${this.correctDate(this.card.date)}</p>
            <h3 class="card__title">${this.card.title}</h3>
            <p class="card__description">${this.card.description}</p>
            <span class="card__publisher">${this.card.publisher}</span>
          </div>
        </a>`,
    );

    return this.cardContainer;
  }
}
