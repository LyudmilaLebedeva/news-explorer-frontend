// import Popup from './Popup';

// class popupMessage extends Popup {
//   constructor(popupElement, closeButton, messageElement) {
//     super(popupElement, closeButton);
//     this.element = messageElement;
//   }

//   open() {
//     super.setContent(this.element);
//     super.open();
//   }

//   close() {
//     super.clearContent();
//     super.close();
//   }
// }

class popupMessage {
  constructor(popup, messageElement) {
    this.popup = popup;
    this.messageElement = messageElement;
  }

  showInPopup() {
    this.popup.clearContent();
    this.popup.setContent(this.messageElement);
    this.popup.open();
  }

  closeInPopup() {
    this.popup.clearContent(this.messageElement);
    this.popup.close();
  }
}

export default popupMessage;
