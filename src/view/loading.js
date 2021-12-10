import {createElement} from '../render';

export const createLoadingTemplate = () => (
  '<h2 class="films-list__title">Loading...</h2>'
);

export default class LoadingView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createLoadingTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
