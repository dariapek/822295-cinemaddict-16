import {createElement} from '../render';

const createStatsTemplate = (movies) => (
  `<p>${movies.length} movies inside</p>`
);

export default class StatsView {
  #element = null;
  #movies = null;

  constructor(movies) {
    this.#movies = movies;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createStatsTemplate(this.#movies);
  }

  removeElement() {
    this.#element = null;
  }
}
