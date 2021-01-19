class Popup {
  constructor(popupElement, closeButton) {
    this.popupElement = popupElement;
    this.closeButton = closeButton;
    this.container = popupElement.querySelector('.popup__content');

    this.closeHandler = () => {
      this.close();
    };
  }

  _setEventListeners() {
    this.closeButton.addEventListener('click', this.closeHandler);
  }

  _deleteEventListeners() {
    this.closeButton.removeEventListener('click', this.closeHandler);
  }

  setContent(content) {
    this.clearContent();
    this.container.appendChild(content);
  }

  clearContent() {
    this.container.textContent = '';
    this.container.appendChild(this.closeButton);
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
