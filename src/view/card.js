import {controlType, START_INDEX} from '../const';
import AbstractView from './abstract';

const getCommentLength = (comments) => {
  const length = comments.length;
  const commentString = length > 1 ? 'comments' : 'comment';

  return `${length} ${commentString}`;
};

const getShortDescription = (description) => {
  const descriptionArr = description.split('');
  const length = descriptionArr.length;
  const MAX_LENGTH = 139;

  if (length < MAX_LENGTH) {
    return description;
  }

  const last = descriptionArr[MAX_LENGTH] === ('.' || ' ' || ',') ? MAX_LENGTH - 1 : MAX_LENGTH;
  const shortDescription = description.slice(START_INDEX, last);

  return `${shortDescription}…`;
};

const createCardTemplate = (movie) => {
  const {
    name,
    rating,
    release,
    runtime,
    genres,
    poster,
    description,
    commentsIds,
    isWatched,
    isFavorite,
    inWatchlist,
  } = movie;
  const year = release.get('year');
  const formattedRuntime = runtime.format('H[h] m[m]');
  const shortDescription = getShortDescription(description);
  const commentLength = getCommentLength(commentsIds);

  return `<article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${formattedRuntime}</span>
        <span class="film-card__genre">${genres[START_INDEX]}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${shortDescription}</p>
      <span class="film-card__comments">${commentLength}</span>
    </a>
    <div class="film-card__controls">
      <button
        class="
          film-card__controls-item
          film-card__controls-item--add-to-watchlist
          ${inWatchlist ? 'film-card__controls-item--active' : ''}"
        data-control-type="${controlType.WATCHLIST}"
        type="button"
      >Add to watchlist</button>
      <button
        class="
          film-card__controls-item
          film-card__controls-item--mark-as-watched
          ${isWatched ? 'film-card__controls-item--active' : ''}"
        data-control-type="${controlType.WATCHED}"
        type="button">Mark as watched</button>
      <button
        class="
          film-card__controls-item
          film-card__controls-item--favorite
          ${isFavorite ? 'film-card__controls-item--active' : ''}"
        data-control-type="${controlType.FAVORITE}"
        type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class MovieCardView extends AbstractView {
  #movie = null;

  constructor(movie) {
    super();

    this.#movie = movie;
  }

  get template() {
    return createCardTemplate(this.#movie);
  }

  setCardClickHandler = (callback) => {
    this._callbacks.onCardClick = callback;
    this.element.addEventListener('click', this.#cardClickHandler);
  }

  #cardClickHandler = (evt) => {
    evt.preventDefault();

    const classNames = evt.target.className.split(/\s* \s*/);
    const exception = 'film-card__controls-item';
    const hasException = classNames.some((className) => (className === exception));

    if (hasException) {
      return;
    }

    this._callbacks.onCardClick();
  }

  setControlsClickHandler = (callback) => {
    this._callbacks.onCardControlsClick = callback;
    this.element
      .querySelector('.film-card__controls')
      .addEventListener('click', this.#controlsClickHandler);
  }

  #controlsClickHandler = (evt) => {
    evt.preventDefault();
    this._callbacks.onCardControlsClick(evt);
  }
}
