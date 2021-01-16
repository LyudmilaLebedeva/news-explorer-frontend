class Card {
  constructor(cardData, state, mainApi) {
    this.id = cardData._id;
    this.publishedAt = cardData.date;
    this.title = cardData.title;
    this.description = cardData.text;
    this.source = cardData.source;
    this.imageUrl = cardData.image;
    this.keyword = cardData.keyword;
    this.state = state;
    this.mainApi = mainApi;

    this._create();

    this.buttonClickHandler = () => {
      switch (this.state) {
        // case 'marked':
        // break;
        case 'notMarked':
          this.mainApi.createArticle({
            keyword: this.keyword,
            title: this.title,
            text: this.description,
            date: this.publishedAt,
            source: this.source,
            link: 'http://sdfsfsd.df',
            image: this.imageUrl,
          })
            .then(() => {
              this.state = 'marked';
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
  <article class="card">
  <img src="${this.imageUrl}" alt="Фото к статье"class="card__img" />
  <p class="card__hint card__hint_type_mark">Войдите, чтобы сохранять статьи</p>
  <button class="card__btn card__btn_type_bookmark"></button>
  <div class="card__text">
    <time datetime="${this.publishedAt}" class="card__date">${this.publishedAt}</time>
    <h3 class="card__title">${this.title}</h3>
    <p class="card__subtitle">
    ${this.description}
    </p>
    <cite class="card__source">${this.source}</cite>
  </div>
</article>
  `;
    template.insertAdjacentHTML('beforeend', cardLayot);
    this.cardElement = template.firstElementChild;
    this.cardButton = this.cardElement.querySelector('.card__btn');
    this.renderIcon();
  }

  renderIcon() {
    let buttonClass;
    switch (this.state) {
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
  }
}

export default Card;
