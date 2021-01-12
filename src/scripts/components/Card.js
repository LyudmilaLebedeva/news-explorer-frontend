class Card {
  constructor(cardData) {
    this.publishedAt = cardData.publishedAt;
    this.title = cardData.title;
    this.description = cardData.description;
    this.source = cardData.source.name;
    this.imageUrl = cardData.urlToImage;

    this._create();
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
  }
}

export default Card;
