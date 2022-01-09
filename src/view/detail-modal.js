import dayjs from 'dayjs';
import {createElement} from '../render';
import {controlType} from '../const';
import Smart from './smart';

const getStringOfElements = (elements) => (elements.join(', '));

const getGenres = (genres) => (
  genres.map((genre) => (`<span class="film-details__genre">${genre}</span>`)).join('')
);

const getComments = (comments) => comments.map((comment) => {
  const {text, emoji, author, date} = comment;
  const formattedDate = dayjs(date).format('YYYY/MM/DD HH:mm');

  return `
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
      </span>

      <div>
        <p class="film-details__comment-text">${text}</p>

        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>

          <span class="film-details__comment-day">${formattedDate}</span>

          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;
}).join(' ');

const getInfo = (movie) => (
  `<div class="film-details__info">
    <div class="film-details__info-head">
      <div class="film-details__title-wrap">
        <h3 class="film-details__title">${movie.name}</h3>
        <p class="film-details__title-original">Original: ${movie.originalName}</p>
      </div>

      <div class="film-details__rating">
        <p class="film-details__total-rating">${movie.rating}</p>
      </div>
    </div>

    <table class="film-details__table">
      <tr class="film-details__row">
        <td class="film-details__term">Director</td>
        <td class="film-details__cell">${movie.director}</td>
      </tr>

      <tr class="film-details__row">
        <td class="film-details__term">Writers</td>
        <td class="film-details__cell">${movie.writers}</td>
      </tr>

      <tr class="film-details__row">
        <td class="film-details__term">Actors</td>
        <td class="film-details__cell">${movie.actors}</td>
      </tr>

      <tr class="film-details__row">
        <td class="film-details__term">Release Date</td>
        <td class="film-details__cell">${movie.release}</td>
      </tr>

      <tr class="film-details__row">
        <td class="film-details__term">Runtime</td>
        <td class="film-details__cell">${movie.runtime}</td>
      </tr>

      <tr class="film-details__row">
        <td class="film-details__term">Country</td>
        <td class="film-details__cell">${movie.country}</td>
      </tr>

      <tr class="film-details__row">
        <td class="film-details__term">${movie.genresTitle}</td>
        <td class="film-details__cell">
          ${getGenres(movie.genres)}
        </td>
      </tr>
    </table>

    <p class="film-details__film-description">${movie.description}</p>
  </div>`);

const createDetailModal = (movie, currentMovieComments) => {
  if (Object.keys(movie).length === 0) {
    return;
  }

  const {
    ageRating,
    poster,
    isWatched,
    isFavorite,
    inWatchlist,
  } = movie;
  const infoBlock = getInfo(movie);
  const commentsCount = currentMovieComments.length;
  const commentsBlock = commentsCount > 0
    ? getComments(currentMovieComments)
    : '';

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>

        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

            <p class="film-details__age">${ageRating}</p>
          </div>

          ${infoBlock}
        </div>

        <section class="film-details__controls">
          <button
            type="button"
            class="
              film-details__control-button
              film-details__control-button--watchlist
              ${inWatchlist ? 'film-details__control-button--active' : ''}"
              id="watchlist"
              name="watchlist"
              data-control-type="${controlType.WATCHLIST}"
          >Add to watchlist</button>

          <button
            type="button"
            class="
              film-details__control-button
              film-details__control-button--watched
              ${isWatched ? 'film-details__control-button--active' : ''}"
              id="watched"
              name="watched"
              data-control-type="${controlType.WATCHED}"
          >Already watched</button>

          <button
            type="button"
            class="
              film-details__control-button
              film-details__control-button--favorite
              ${isFavorite ? 'film-details__control-button--active' : ''}"
              id="favorite"
              name="favorite"
              data-control-type="${controlType.FAVORITE}"
          >Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">
            Comments <span class="film-details__comments-count">${commentsCount}</span>
          </h3>

          <ul class="film-details__comments-list">
            ${commentsBlock}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea
                class="film-details__comment-input"
                placeholder="Select reaction below and write comment here"
                name="comment"
              ></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">

              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">

              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">

              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">

              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

export default class DetailModalView extends Smart {
  #movie = null;
  #currentComments = null;

  constructor(movie = {}, comments = []) {
    super();

    this._data = movie;
    this.#currentComments = this.getCurrentMovieComments(comments);
  }

  get template() {
    return createDetailModal(this._data, this.#currentComments);
  }

  update(value) {
    const {movie, comments} = value;
    this.#movie = movie;
    this._data = this.#parseDataToMovie(movie);
    this.#currentComments = this.getCurrentMovieComments(comments);
    this.element = createElement(this.template);
    this.restoreHandlers();
  }

  getCurrentMovieComments(allComments) {
    const {commentsIds} = this._data;

    return allComments.filter((comment) => (commentsIds.includes(comment.id)));
  }

  setCloseHandler = (callback) => {
    this._callbacks.onCloseClick = callback;

    this.element
      .querySelector('.film-details__close-btn')
      .addEventListener('click', this.#closeHandler);
  }

  setControlsClickHandler = (callback) => {
    this._callbacks.onModalControlsClick = callback;
    this.element
      .querySelector('.film-details__controls')
      .addEventListener('click', this.#controlsClickHandler);
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setControlsClickHandler(this._callbacks.onModalControlsClick);
    this.setCloseHandler(this._callbacks.onCloseClick);
  }

  #closeHandler = (evt) => {
    evt.preventDefault();

    this._callbacks.onCloseClick();
  }

  #controlsClickHandler = (evt) => {
    evt.preventDefault();
    this._callbacks.onModalControlsClick(evt);
  }

  #parseDataToMovie = (data) => {
    const {
      actors,
      genres,
      release,
      runtime,
      writers,
    } = data;

    return {
      ...data,
      release: release.format('DD MMMM YYYY'),
      runtime: runtime.format('H[h] m[m]'),
      actors: getStringOfElements(actors),
      writers:getStringOfElements(writers),
      genresTitle: genres.length === 1 ? 'Genre' : 'Genres',
    };
  }

  #parseMovieToData = () => ({
    ...this.#movie,
    commentsIds: this._data.commentsIds,
    inWatchlist: this._data.inWatchlist,
    isFavorite: this._data.isFavorite,
    isWatched: this._data.isWatched,
  })

  #emojiHandler = (evt) => {
    const emoji = evt.target.value;

    this.updateData({emoji});

    const container = this.element.querySelector('.film-details__add-emoji-label');
    const image = `<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji">`;
    const newElement = createElement(image);
    container.appendChild(newElement);
  }

  #setInnerHandlers = () => {
    this.element
      .querySelectorAll('.film-details__emoji-item')
      .forEach((emoji) => {
        emoji.addEventListener('click', this.#emojiHandler);
      });
  }
}
