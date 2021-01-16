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
        if (res.ok) return res.json();
        throw new Error(res.status);
      })
      .catch((err) => { throw err; });
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

  setToken(token) {
    this.options.headers.authorization = `Bearer ${token}`;
  }

  clearToken() {
    this.options.headers.authorization = '';
  }

  createArticle(body) {
    return this._fetchMask('/articles', 'POST', body);
  }

  getArticles() {
    return this._fetchMask('/articles');
  }

  deleteArticle(id) {
    return this._fetchMask(`/articles/${id}`, 'DELETE');
  }
}

export default MainApi;
