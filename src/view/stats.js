import AbstractView from './abstract';

const createStatsTemplate = (movies) => (
  `<p>${movies.length} movies inside</p>`
);

export default class StatsView extends AbstractView {
  #movies = null;

  constructor(movies) {
    super();

    this.#movies = movies;
  }

  get template() {
    return createStatsTemplate(this.#movies);
  }
}
