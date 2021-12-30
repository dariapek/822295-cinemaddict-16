import AbstractView from './abstract';
import {sortType} from '../const';

export const createSortTemplate = () => (
  `<ul class="sort">
    <li>
      <a
        href="#"
        class="sort__button"
        data-sort-type="${sortType.DEFAULT}"
      >
        Sort by default
      </a>
    </li>
    <li>
      <a
        href="#"
        class="sort__button"
        data-sort-type="${sortType.DATE}"
      >
        Sort by date
      </a>
    </li>
    <li>
      <a
        href="#"
        class="sort__button sort__button--active"
        data-sort-type="${sortType.RATING}"
      >
        Sort by rating
      </a>
    </li>
  </ul>`
);

export default class SortView extends AbstractView {
  get template() {
    return createSortTemplate();
  }

  setSortClickHandler = (callback) => {
    this._callbacks.onSortClick = callback;
    this.element.addEventListener('click', this.#sortClickHandler);
  }

  #sortClickHandler = (evt) => {
    evt.preventDefault();
    this._callbacks.onSortClick(evt);
  }
}
