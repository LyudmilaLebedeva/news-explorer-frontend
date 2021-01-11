class Form {
  constructor(formElement, apiFunc, successFunc, popup) {
    this.formElement = formElement;
    this.popup = popup;
    this._getInputs();

    this._submit = (event) => {
      event.preventDefault();
      apiFunc(this._getInfo())
        .then(() => this.close())
        .then((res) => {
          successFunc(res);
        })
        .catch((err) => {
          if (err.message === '401') {
            this.setServerError('Неправильное имя пользователя или пароль');
          } else this.setServerError(err.message);
        });
    };
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
    this.formElement.addEventListener('submit', this._submit);
    this.popup.setContent(this.formElement);
    this.popup.open();
  }

  close() {
    this.formElement.removeEventListener('submit', this._submit);
    this.popup.clearContent();
    this.popup.close();
  }
}

export default Form;
