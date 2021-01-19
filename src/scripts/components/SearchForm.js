import BaseForm from './BaseForm';

class SearchForm extends BaseForm {
  constructor(formElement, cardList, newsApi) {
    const submitFunc = (obj) => {
      this.keyword = obj.keyword;
      cardList.renderLoader();
      return newsApi.getNews(this.keyword);
    };

    const successFunc = (res) => {
      const { keyword } = this;
      const cardsData = res.articles.map((article) => ({
        keyword,
        title: article.title,
        text: article.description,
        date: article.publishedAt,
        source: article.source.name,
        link: 'http://sdfsfsd.df',
        image: article.urlToImage,
      }));

      cardList.cardsData = cardsData;
      cardList.renderResults(0, 3);
    };

    const errorFunc = (err) => {
      cardList.renderError(err);
    };

    super(formElement, submitFunc, successFunc, errorFunc);
  }
}

export default SearchForm;
