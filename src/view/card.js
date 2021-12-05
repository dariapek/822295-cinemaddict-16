import {FIRST} from '../const';

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

  const last = descriptionArr[MAX_LENGTH] === ('.' || ' ' || ',') ? 138 : 139;
  const shortDescription = description.slice(FIRST, last);

  return `${shortDescription}…`;
};

export const createCardTemplate = (movie) => {
  const {name, rating, release, runtime, genres, poster, description, comments} = movie;
  const year = release.get('year');
  const shortDescription = getShortDescription(description);
  const commentLength = getCommentLength(comments);

  return `
    <article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${name}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${year}</span>
          <span class="film-card__duration">${runtime}</span>
          <span class="film-card__genre">${genres[FIRST]}</span>
        </p>
        <img src="./images/posters/${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${shortDescription}</p>
        <span class="film-card__comments">${commentLength}</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
      </div>
    </article>`;
};

