export default class Header {
  constructor(element, linkArticles, buttonLogout, buttonOpenAuthDesktop) {
    this.element = element;
    this.linkArticles = linkArticles;
    this.buttonLogout = buttonLogout;
    this.buttonOpenAuthDesktop = buttonOpenAuthDesktop;
  }

  render() {
    console.log(localStorage.jwtToken);
    if(localStorage.jwtToken === '' || !localStorage.jwtToken) {
      this.linkArticles.classList.remove('header__link_articles_active');
      this.buttonLogout.classList.remove('header__button_logout_active');
      this.buttonOpenAuthDesktop.classList.add('header__button_auth_active');
    } else {
      this.linkArticles.classList.add('header__link_articles_active');
      this.buttonLogout.classList.add('header__button_logout_active');
      this.buttonOpenAuthDesktop.classList.remove('header__button_auth_active');
    }
  }

  showMenu() {
    this.element.classList.add('header__mobile-menu_show');
  }

  hideMenu() {
    this.element.classList.remove('header__mobile-menu_show');
  }
}
