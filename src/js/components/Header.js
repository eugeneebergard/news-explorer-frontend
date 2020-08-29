export default class Header {
  constructor(element) {
    this.element = element;
  }

  render() {

  }

  showMenu() {
    this.element.classList.add('header__mobile-menu_show');
  }

  hideMenu() {
    this.element.classList.remove('header__mobile-menu_show');
  }
}
