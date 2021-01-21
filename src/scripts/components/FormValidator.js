class FormValidator {
  constructor(form) {
    this.form = form;
    this.errorMessages = {
      namelengthError: 'Должно быть от 2 до 30 символов',
      passwordError: 'Минимальная длина пароля - 8 символов',
      emailError: 'Введен некорректный e-mail',
      requiredError: 'Это обязательное поле',
    };

    this.setEventListners();
  }

  setSubmitButtonState() {
    const submitButton = this.form.elements.submit;

    if (this.form.checkValidity()) {
      submitButton.removeAttribute('disabled');
    } else {
      submitButton.setAttribute('disabled', 'disabled');
    }
  }

  checkInputValidity(input) {
    const text = input.value.trim();
    const messageBox = this.form.querySelector(`#${input.id}-error`);

    if (input.validity.typeMismatch) {
      messageBox.textContent = this.errorMessages.emailError;
      return false;
    }

    if (input.type === 'text') {
      if (input.validity.tooShort || text.length > 30) {
        input.setCustomValidity(this.errorMessages.namelengthError);
        messageBox.textContent = this.errorMessages.namelengthError;
        return false;
      }
    }

    if (input.type === 'password') {
      if (input.validity.tooShort ) {
        input.setCustomValidity(this.errorMessages.passwordError);
        messageBox.textContent = this.errorMessages.passwordError;
        return false;
      }
    }

    if (input.validity.valueMissing) {
      messageBox.textContent = this.errorMessages.requiredError;
      return false;
    }

    input.setCustomValidity('');
    messageBox.textContent = '';

    return true;
  }

  setEventListners() {
    const inputs = [...this.form.elements];
    const thisForm = this;

    inputs.forEach((input) => {
      if (input.type !== 'submit') {
        input.addEventListener('input', () => {
          thisForm.checkInputValidity(input);
          thisForm.setSubmitButtonState();
        });
      }
    });
  }
}

export default FormValidator;
