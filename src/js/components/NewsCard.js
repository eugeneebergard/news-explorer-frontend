export default class NewsCard {
  constructor(checkAuth, cardMessages) {
    this.checkAuth = checkAuth;
    this.cardMessages = cardMessages;
  }

  renderIcon(page) {
    const iconCard = document.querySelectorAll('.card__icon');
    const keyWordCard = document.querySelectorAll('.card__keyword');
    const messageText = document.querySelectorAll('.card__message-text');

    if(page === 'main') {
      keyWordCard.forEach((elem) => {
        elem.classList.remove('card__keyword_show');
      });

      iconCard.forEach((elem) => {
        elem.classList.remove('card__icon_delete_show');
        elem.classList.add('card__icon_bookmark_show');

      });

      messageText.forEach((elem) => {
        if(!this.checkAuth()) {
          elem.textContent = this.cardMessages.notAuth;
        }
      })
    } else {
      keyWordCard.forEach((elem) => {
        elem.classList.add('card__keyword_show');
      });

      iconCard.forEach((elem) => {
        elem.classList.add('card__icon_delete_show');
        elem.classList.remove('card__icon_bookmark_show');
      });

      messageText.forEach((elem) => {
        elem.textContent = this.cardMessages.removeArticle;
      })
    }
  }
}
