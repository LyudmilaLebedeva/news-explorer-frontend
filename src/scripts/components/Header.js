import BaseComponent from './BaseComponent';

class Header extends BaseComponent {
  constructor(elements, authForm, popup, handlers) {
    super(handlers);
    this.elements = elements;
    this.authForm = authForm;
    this.popup = popup;
    this.isLoggedIn = false;

    this.loginHandler = () => {
      if (this.isLoggedIn) {
        this.render({ isLoggedIn: false });
        this.isLoggedIn = false;
      } else {
        this.authForm.successFunc = (res) => {
          this.isLoggedIn = true;
          this.render({ isLoggedIn: true, userName: res.name });
          this.popup.clearContent();
          this.popup.close();
        };
        this.popup.clearContent();
        this.popup.setContent(authForm.formElement);
        this.popup.open();
      }
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
    } else {
      this.elements.authButton.textContent = 'Авторизоваться';
      this.elements.savedLink.classList.add('hidden');
    }
  }
}

export default Header;
