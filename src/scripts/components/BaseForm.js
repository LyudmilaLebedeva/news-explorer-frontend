class BaseForm {
  constructor(formElement, submitFunc, successFunc, errorFunc) {
    this.formElement = formElement;
    this._getInputs();

    this.submitHandler = (e) => {
      e.preventDefault();
      submitFunc(this._getInfo())
        .then((res) => successFunc(res))
        .catch((err) => errorFunc(err));
    };

    this.formElement.addEventListener('submit', this.submitHandler);
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
}

export default BaseForm;
