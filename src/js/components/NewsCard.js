export default class NewsCard {
  constructor(page) {
    this.page = page;
  }

  renderIcon() {
    const iconCard = document.querySelector('.card__icon');
    const keyWordCard = document.querySelector('.card__keyword');

    if(this.page === 'main') {
      keyWordCard.classList.remove('card__keyword_show');
      iconCard.classList.remove('card__icon_delete');
      iconCard.classList.add('card__icon_bookmark');
    } else {
      iconCard.classList.remove('card__icon_bookmark');
      keyWordCard.classList.add('card__keyword_show');
      iconCard.classList.add('card__icon_delete');
    }
  }
}
