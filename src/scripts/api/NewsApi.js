class NewsApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  getNews(keyword) {
    return fetch(
      `http://newsapi.org/v2/everything?q=${keyword}&from=2021-01-01&pageSize=10&apiKey=${this.apiKey}`,
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } return new Error();
      })
      .catch((err) => console.log(err));
  }
}

export default NewsApi;
