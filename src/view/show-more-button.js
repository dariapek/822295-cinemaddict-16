import AbstractView from './abstract';

const createShowMoreButtonTemplate = () => (
  '<button class="films-list__show-more">Show more</button>'
);

export default class ShowMoreButtonView extends AbstractView {
  get template() {
    return createShowMoreButtonTemplate();
  }

  setClickHandle = (callback) => {
    this._callbacks.onShowMoreButtonClick = callback;

    this.element.addEventListener('click', this.#clickHandle);
  }

  #clickHandle = (evt) => {
    evt.preventDefault();

    this._callbacks.onShowMoreButtonClick();
  }
}
