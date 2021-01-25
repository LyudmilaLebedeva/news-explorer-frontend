import MainAPI from './MainApi';

class MainApiExtended extends MainAPI {
  constructor(options, onLoginSuccess, onLoginFail) {
    super(options);
    this.onLoginSuccess = onLoginSuccess;
    this.onLoginFail = onLoginFail;
  }

  getUserData(token) {
    this.setToken(token);
    super.getUserData()
      .then(this.onLoginSuccess)
      .catch(this.onLoginFail);
  }
}

export default MainApiExtended;
