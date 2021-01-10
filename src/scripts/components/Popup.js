class Popup {
  constructor(popupElement, closeButton) {
    this.popupElement = popupElement;
    this.closeButton = closeButton;
    this.container = this.popupElement.querySelector('.popup__content');

    this.closeHandler = () => {
      this.clearContent();
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
    this.content = content;
    this.container.appendChild(this.content);
  }

  clearContent() {
    this.content.remove();
    this.content = undefined;
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
