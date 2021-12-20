import AbstractView from './abstract';

const getTitle = (movies) => (
  movies.length
    ? '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>'
    : '<h2 class="films-list__title">There are no movies in our database</h2>'
);

const createListTemplate = (movies) => (
  `<section class="films">
    <section class="films-list">
        ${getTitle(movies)}

      <div class="films-list__container"></div>
    </section>
  </section>`
);

export default class ListView extends AbstractView {
  #movies = null;

  constructor(movies) {
    super();

    this.#movies = movies;
  }

  get template() {
    return createListTemplate(this.#movies);
  }
}
