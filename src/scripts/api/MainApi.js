class MainApi {
  constructor(options) {
    this.options = options;
  }

  _fetchMask(rout, method = 'GET', body) {
    return fetch(this.options.baseUrl + rout, {
      method,
      headers: this.options.headers,
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  signup(body) {
    return this._fetchMask('/signup', 'POST', body);
  }

  signin(body) {
    return this._fetchMask('/signin', 'POST', body);
  }

  getUserData() {
    return this._fetchMask('/users/me');
  }
}

export default MainApi;
