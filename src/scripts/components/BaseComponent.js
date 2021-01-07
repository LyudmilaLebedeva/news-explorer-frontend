class BaseComponent {
  constructor(handlers) {
    this.handlers = handlers;
    this._setHandlers();
  }

  _setHandlers() {
    console.log(this.handlers);
  }
}

export default BaseComponent;
