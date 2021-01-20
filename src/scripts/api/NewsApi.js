class NewsApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  getNews(keyword) {
    const fromDateTimestamp = new Date(Date.now() - (24 * 3600 * 1000 * 7));
    const fromDate = `${fromDateTimestamp.getFullYear()}-${fromDateTimestamp.getMonth() + 1}-${fromDateTimestamp.getDate()}`;
    return fetch(
      `http://newsapi.org/v2/everything?q=${keyword}&from=${fromDate}&pageSize=10&apiKey=${this.apiKey}`,
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
