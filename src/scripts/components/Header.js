import BaseComponent from './BaseComponent';

class Header extends BaseComponent {
  constructor(elements, authForm, handlers) {
    super(handlers);
    this.elements = elements;
    this.authForm = authForm;

    this.loginHandler = () => {
      this.authForm.open();
    };

    this.logoutHandler = () => {
      // eslint-disable-next-line no-undef
      localStorage.removeItem('token');
      this.render({ isLoggedIn: false });
    };
  }

  render(props) {
    if (props.isLoggedIn) {
      this.elements.authButton.removeEventListener('click', this.loginHandler);
      this.elements.authButton.textContent = props.userName;
      this.elements.authButton.addEventListener('click', this.logoutHandler);
      this.elements.savedLink.classList.remove('hidden');
    } else {
      this.elements.authButton.removeEventListener('click', this.logoutHandler);
      this.elements.authButton.textContent = 'Авторизоваться';
      this.elements.authButton.addEventListener('click', this.loginHandler);
      this.elements.savedLink.classList.add('hidden');
    }
  }
}

export default Header;
