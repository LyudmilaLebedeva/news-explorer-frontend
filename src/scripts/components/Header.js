class Header {
  constructor(elements, handlers) {
    this.elements = elements;
    this.isLoggedIn = false;

    this.loginHandler = () => {
      if (this.isLoggedIn) { handlers.logout(); } else { handlers.login(); }
    };

    this.menuButtonHandler = () => {
      this.elements.headerElement.classList.toggle('header_menu-opened');
    };

    this.elements.menuButton.addEventListener('click', this.menuButtonHandler);
    this.elements.authButton.addEventListener('click', this.loginHandler.bind(this));
  }

  render(props) {
    if (props.isLoggedIn) {
      this.elements.authButton.textContent = props.userName;
      this.elements.savedLink.classList.remove('hidden');
      this.isLoggedIn = true;
    } else {
      this.elements.authButton.textContent = 'Авторизоваться';
      this.elements.savedLink.classList.add('hidden');
      this.isLoggedIn = false;
    }
  }
}

export default Header;
