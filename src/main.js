import {renderTemplate, RenderPosition} from './render.js';
import {createUserProfileTemplate} from './view/user-profile';
import {createFiltersTemplate} from './view/filters';
import {createSortTemplate} from './view/sort';
import {createListTemplate} from './view/list';
import {createCardTemplate} from './view/card';
import {createShowMoreButtonTemplate} from './view/show-more-button';
import {createExtraContainerTemplate} from './view/extra-contaner';
import {createStatsTemplate} from './view/stats';
import {createDetailModal} from './view/detail-modal';
import {getMovie} from './mock/movie';
import {getComments} from './mock/comments';
import {getFilters} from './mock/filters';
import {START_INDEX} from './const';

const CARD_IN_LIST_COUNT = 45;
const MOVIE_COUNT_PER_STEP = 5;
const CARD_IN_EXTRA_COUNT = 2;
const EXTRA_CONTAINER_COUNT = 2;
const FIRST_EXTRA_CONTAINER = 0;
const SECOND_EXTRA_CONTAINER = 1;

const movies = Array.from({length: CARD_IN_LIST_COUNT}, getMovie);
const commentsIds = [].concat(...movies.map((movie) => (movie.commentsIds)));
const comments = getComments(commentsIds);
const filters = getFilters(movies);

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');

const createSomeFilmCards = (cont, container) => {
  for (let i = 0; i < cont; i++) {
    renderTemplate(container, createCardTemplate(movies[i]), RenderPosition.BEFOREEND);
  }
};

renderTemplate(headerElement, createUserProfileTemplate(movies), RenderPosition.BEFOREEND);
renderTemplate(mainElement, createFiltersTemplate(filters), RenderPosition.BEFOREEND);
renderTemplate(mainElement, createSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(mainElement, createListTemplate(), RenderPosition.BEFOREEND);

const filmElement = document.querySelector('.films');
const filmListElement = filmElement.querySelector('.films-list');
const filmContainerElement = filmListElement.querySelector('.films-list__container');

createSomeFilmCards(MOVIE_COUNT_PER_STEP, filmContainerElement);

for (let i = 0; i < EXTRA_CONTAINER_COUNT; i++) {
  renderTemplate(filmElement, createExtraContainerTemplate(), RenderPosition.BEFOREEND);
}

const extraContainersElement = filmElement.querySelectorAll('.films-list--extra .films-list__container');

createSomeFilmCards(CARD_IN_EXTRA_COUNT, extraContainersElement[FIRST_EXTRA_CONTAINER]);
createSomeFilmCards(CARD_IN_EXTRA_COUNT, extraContainersElement[SECOND_EXTRA_CONTAINER]);

const footer = document.querySelector('.footer');
const statisticsContainerElement = footer.querySelector('.footer__statistics');

renderTemplate(statisticsContainerElement, createStatsTemplate(movies), RenderPosition.BEFOREEND);
renderTemplate(footer, createDetailModal(movies[START_INDEX], comments), RenderPosition.AFTEREND);

if (movies.length > MOVIE_COUNT_PER_STEP) {
  let renderedTaskCount = MOVIE_COUNT_PER_STEP;

  renderTemplate(filmListElement, createShowMoreButtonTemplate(), RenderPosition.BEFOREEND);

  const loadMoreButton = filmListElement.querySelector('.films-list__show-more');

  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    movies
      .slice(renderedTaskCount, renderedTaskCount + MOVIE_COUNT_PER_STEP)
      .forEach((movie) => renderTemplate(filmContainerElement, createCardTemplate(movie), RenderPosition.BEFOREEND));

    renderedTaskCount += MOVIE_COUNT_PER_STEP;

    if (renderedTaskCount >= movies.length) {
      loadMoreButton.remove();
    }
  });
}
