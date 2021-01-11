import Popup from './Popup';

class popupMessage {
  constructor(popup, messageElement) {
    this.popup = popup;
    this.messageElement = messageElement;
  }

  showInPopup() {
    this.popup.setContent(this.messageElement);
    this.popup.open();
  }

  closeInPopup() {
    this.popup.clearContent(this.messageElement);
    this.popup.open();
  }
}

export default popupMessage;
