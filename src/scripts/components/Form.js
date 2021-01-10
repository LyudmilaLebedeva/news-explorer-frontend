class Form {
  constructor(formElement, api, popup) {
    this.formElement = formElement;
    this.api = api;
    this.popup = popup;
    this._getInputs();
  }

  _getInputs() {
    const formElements = [...this.formElement.elements];
    const thisForm = this;
    this.inputs = [];

    formElements.forEach((formElement) => {
      if (formElement.type !== 'submit') {
        thisForm.inputs.push(formElement);
      }
    });
  }

  _getInfo() {
    const values = {};
    this.inputs.forEach((inputElement) => {
      values[inputElement.name] = inputElement.value;
    });

    return values;
  }

  setServerError(errorMessage) {
    this.formElement.querySelector('.form__error').textContent = errorMessage;
  }

  open() {
    this.formElement.addEventListener('submit', this.submit.bind(this));
    this.popup.setContent(this.formElement);
    this.popup.open();
  }

  close() {
    const thisForm = this;
    this.formElement.removeEventListener('submit', thisForm);
    this.popup.clearContent();
    this.popup.close();
  }

  submit(event) {
    event.preventDefault();
    const thisForm = this;
    this.api.signin(this._getInfo())
      .then((res) => {
        thisForm.api.setToken(res.token);
        // eslint-disable-next-line no-undef
        localStorage.setItem('token', res.token);
        thisForm.api.setToken(res.token);
        return thisForm.api.getUserData();
      })
      .then((res) => {
        thisForm.successFunc(res.name);
      })
      .then(() => {
        thisForm.close();
      })
      .catch((err) => {
        if (err.message === '401') {
          this.setServerError('Неправильное имя пользователя или пароль');
        } else this.setServerError(err.message);
      });
  }
}

export default Form;
