import BaseForm from './BaseForm';

class SearchForm extends BaseForm {
  constructor(formElement, cardList, newsApi) {
    const submitFunc = (obj) => {
      cardList.renderLoader();
      return newsApi.getNews(obj.keyword);
    };

    const successFunc = (res) => {
      cardList.renderResults(res.articles);
    };

    const errorFunc = (err) => {
      cardList.renderError(err);
    };

    super(formElement, submitFunc, successFunc, errorFunc);
  }
}

export default SearchForm;
