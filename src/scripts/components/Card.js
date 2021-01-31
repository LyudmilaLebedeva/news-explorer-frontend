const dateParsing = (date) => {
  const dateObj = new Date(date);
  const months = ['января', 'февраля', 'марта', 'апреля',
    'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  return `${dateObj.getDate()} ${months[dateObj.getMonth()]}, ${dateObj.getFullYear()}`;
};

class Card {
  constructor(cardData, state, mainApi) {
    this.id = cardData._id;
    this.publishedAt = cardData.date;
    this.title = cardData.title;
    this.description = cardData.text;
    this.source = cardData.source;
    this.imageUrl = cardData.image;
    this.keyword = cardData.keyword;
    this.link = cardData.link;
    this.state = state;
    this.mainApi = mainApi;

    this._create();

    this.buttonClickHandler = (event) => {
      event.preventDefault();
      switch (this.state.type) {
        case 'marked':
          this.mainApi.deleteArticle(this.id)
            .then(() => {
              this.state.type = 'notMarked';
              this.renderIcon();
            });
          break;
        case 'notMarked':
          this.mainApi.createArticle({
            keyword: this.keyword,
            title: this.title,
            text: this.description,
            date: this.publishedAt,
            source: this.source,
            link: this.link,
            image: this.imageUrl,
          })
            .then((res) => {
              this.id = res.id;
              this.state.type = 'marked';
              this.renderIcon();
            })
            .catch((err) => console.log(err));
          break;
        case 'saved':
          this.mainApi.deleteArticle(this.id)
            .then(() => this.cardElement.remove())
            .catch((err) => console.log(err));
          break;
        default:
          break;
      }
    };
    this.cardButton.addEventListener('click', this.buttonClickHandler);
  }

  _create() {
    const template = document.createElement('div');
    const cardLayot = `
  <a class="card", href="${this.link}", target="blank">
  <img src="${this.imageUrl}" alt="Фото к статье"class="card__img" />
  <p class="card__keyword">${this.keyword}</p>
  <button class="card__btn card__btn_type_bookmark"></button>
  <p class="card__hint card__hint_type_mark">Войдите, чтобы сохранять статьи</p>
  <div class="card__text">
    <time datetime="${this.publishedAt}" class="card__date">${dateParsing(this.publishedAt)}</time>
    <h3 class="card__title">${this.title}</h3>
    <p class="card__subtitle">
    ${this.description}
    </p>
    <cite class="card__source">${this.source}</cite>
  </div>
</a>
  `;
    template.insertAdjacentHTML('beforeend', cardLayot);
    this.cardElement = template.firstElementChild;
    this.cardButton = this.cardElement.querySelector('.card__btn');
    this.hint = this.cardElement.querySelector('.card__hint');
    this.hint.textContent = this.state.type === 'saved' ? 'Нажмите, чтобы удалить' : 'Войдите, чтобы сохранить';
    this.keywordElement = this.cardElement.querySelector('.card__keyword');
    this.keywordElement.setAttribute(
      'style', `display: ${this.state.type === 'saved' ? 'block' : 'none'};`,
    );
    this.renderIcon();
  }

  renderIcon() {
    let buttonClass;
    switch (this.state.type) {
      case 'marked':
        buttonClass = 'card__btn card__btn_type_marked';
        break;
      case 'notMarked':
        buttonClass = 'card__btn card__btn_type_bookmark';
        break;
      case 'saved':
        buttonClass = 'card__btn card__btn_type_delete';
        break;
      default:
        buttonClass = 'card__btn';
    }
    this.cardButton.setAttribute('class', buttonClass);

    if (this.state.active) {
      this.cardButton.removeAttribute('disabled');
    } else this.cardButton.setAttribute('disabled', 'disabled');
  }
}

export default Card;
