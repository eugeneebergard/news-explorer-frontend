export default class Header {
  constructor(elements, checkAuth, page) {
    this.elements = elements;
    this.checkAuth = checkAuth;
    this.page = page;
  }

  render() {
    let actualUser = localStorage.getItem('username');

    if(this.checkAuth()) {
      if(this.page === 'main') {
        this.elements.linkArticlesDesktop.classList.add('header__link_articles_active');
        this.elements.linkArticlesMobile.classList.add('header__link_articles_active');
        this.elements.buttonLogoutDesktop.classList.add('header__button_logout_active');
        this.elements.buttonLogoutMobile.classList.add('header__button_logout_active');
        this.elements.buttonOpenAuthDesktop.classList.remove('header__button_auth_active');
        this.elements.buttonOpenAuthMobile.classList.remove('header__button_auth_active');
      }
      this.elements.userName.forEach(btn => btn.textContent = actualUser);
    } else {
      this.elements.userName.forEach(btn => btn.textContent = 'Пользователь');
      this.elements.linkArticlesDesktop.classList.remove('header__link_articles_active');
      this.elements.linkArticlesMobile.classList.remove('header__link_articles_active');
      this.elements.buttonLogoutDesktop.classList.remove('header__button_logout_active');
      this.elements.buttonLogoutMobile.classList.remove('header__button_logout_active');
      this.elements.buttonOpenAuthDesktop.classList.add('header__button_auth_active');
      this.elements.buttonOpenAuthMobile.classList.add('header__button_auth_active');
    }
  }

  showMenu() {
    this.elements.mobileMenu.classList.add('header__mobile-menu_show');
  }

  hideMenu() {
    this.elements.mobileMenu.classList.remove('header__mobile-menu_show');
  }
}
