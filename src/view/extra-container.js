import AbstractView from "./abstract";

const createExtraContainerTemplate = (title) => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${title}</h2>
    <div class="films-list__container"></div>
  </section>`
);

export default class ExtraContainerView extends AbstractView {
  #title = null;

  constructor(title) {
    super();

    this.#title = title;
  }

  get template() {
    return createExtraContainerTemplate(this.#title);
  }
}
