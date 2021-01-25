class Form {
  constructor(formElement, apiFunc, successFunc) {
    this.formElement = formElement;
    this.successFunc = successFunc;
    this.apiFunc = apiFunc;
    this._getInputs();

    this._submit = (event) => {
      event.preventDefault();
      const thisForm = this;
      apiFunc(thisForm._getInfo())
        .then((res) => this.successFunc(res))
        .catch((err) => {
          if (err.message === '401') {
            this.setServerError('Неправильное имя пользователя или пароль');
          } else this.setServerError(err);
        });
    };

    this.formElement.addEventListener('submit', this._submit);
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

  clearErrors() {
    const msgBoxes = [...this.formElement.querySelectorAll('.form__input-error')];

    msgBoxes.forEach((box) => {
      box.textContent = '';
    });
  }

  clear() {
    this.inputs.forEach((inputElement) => {
      inputElement.value = '';
    });
  }
}

export default Form;
