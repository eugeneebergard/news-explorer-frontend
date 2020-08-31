export default class Header {
  constructor(element, linkArticlesDesktop, linkArticlesMobile, buttonLogoutDesktop, buttonLogoutMobile, buttonOpenAuthDesktop, buttonOpenAuthMobile, userName) {
    this.element = element;
    this.linkArticlesDesktop = linkArticlesDesktop;
    this.linkArticlesMobile = linkArticlesMobile;
    this.buttonLogoutDesktop = buttonLogoutDesktop;
    this.buttonLogoutMobile = buttonLogoutMobile;
    this.buttonOpenAuthDesktop = buttonOpenAuthDesktop;
    this.buttonOpenAuthMobile = buttonOpenAuthMobile;
    this.userName = userName;
  }

  render() {
    let actualUser = localStorage.getItem('username');

    if(localStorage.jwtToken === '' || !localStorage.jwtToken) {
      this.userName.forEach(btn => btn.textContent = 'Пользователь');
      this.linkArticlesDesktop.classList.remove('header__link_articles_active');
      this.linkArticlesMobile.classList.remove('header__link_articles_active');
      this.buttonLogoutDesktop.classList.remove('header__button_logout_active');
      this.buttonLogoutMobile.classList.remove('header__button_logout_active');
      this.buttonOpenAuthDesktop.classList.add('header__button_auth_active');
      this.buttonOpenAuthMobile.classList.add('header__button_auth_active')
    } else {
      this.userName.forEach(btn => btn.textContent = actualUser);
      this.linkArticlesDesktop.classList.add('header__link_articles_active');
      this.linkArticlesMobile.classList.add('header__link_articles_active');
      this.buttonLogoutDesktop.classList.add('header__button_logout_active');
      this.buttonLogoutMobile.classList.add('header__button_logout_active');
      this.buttonOpenAuthDesktop.classList.remove('header__button_auth_active');
      this.buttonOpenAuthMobile.classList.remove('header__button_auth_active')
    }
  }

  showMenu() {
    this.element.classList.add('header__mobile-menu_show');
  }

  hideMenu() {
    this.element.classList.remove('header__mobile-menu_show');
  }
}
