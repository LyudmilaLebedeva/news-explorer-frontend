class Popup {
  constructor(elements) {
    this.popupElement = elements.popupElement;
    this.closeButtonElement = elements.closeButtonElement;
    this.container = elements.popupElement.querySelector('.popup__content');

    this.closeHandler = () => {
      this.close();
    };
  }

  _setEventListeners() {
    this.closeButtonElement.addEventListener('click', this.closeHandler);
  }

  _deleteEventListeners() {
    this.closeButtonElement.removeEventListener('click', this.closeHandler);
  }

  setContent(content) {
    this.clearContent();
    this.container.appendChild(content);
  }

  clearContent() {
    this.container.textContent = '';
    this.container.appendChild(this.closeButtonElement);
  }

  open() {
    this._setEventListeners();
    this.popupElement.classList.remove('hidden');
  }

  close() {
    this._deleteEventListeners();
    this.popupElement.classList.add('hidden');
  }
}

export default Popup;
