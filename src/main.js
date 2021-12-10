import {render, RenderPosition, renderTemplate} from './render.js';
import {createUserProfileTemplate} from './view/user-profile';
import {createFiltersTemplate} from './view/filters';
import SortView from './view/sort';
import {createListTemplate} from './view/list';
import {createCardTemplate} from './view/card';
import ShowMoreButtonView from './view/show-more-button';
import StatsView from './view/stats';
import {getMovie} from './mock/movie';
import {getComments} from './mock/comments';
import {getFilters} from './mock/filters';
import {START_INDEX} from './const';
import ExtraContainerView from './view/extra-container';
import {getExtraContainerTitle} from './mock/extra-title';

const CARD_IN_LIST_COUNT = 45;
const MOVIE_COUNT_PER_STEP = 5;
const CARD_IN_EXTRA_COUNT = 2;
const FIRST_EXTRA_CONTAINER = 0;
const SECOND_EXTRA_CONTAINER = 1;

const movies = Array.from({length: CARD_IN_LIST_COUNT}, getMovie);
const commentsIds = [].concat(...movies.map((movie) => (movie.commentsIds)));
const comments = getComments(commentsIds);
const filters = getFilters(movies);
const titlesForExtraContainerd = getExtraContainerTitle();

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');

const createSomeFilmCards = (cont, container) => {
  for (let i = 0; i < cont; i++) {
    renderTemplate(container, createCardTemplate(movies[i]), RenderPosition.BEFOREEND);
  }
};

renderTemplate(headerElement, createUserProfileTemplate(movies), RenderPosition.BEFOREEND);
renderTemplate(mainElement, createFiltersTemplate(filters), RenderPosition.BEFOREEND);
render(mainElement, new SortView().element, RenderPosition.BEFOREEND);
renderTemplate(mainElement, createListTemplate(), RenderPosition.BEFOREEND);

const filmElement = document.querySelector('.films');
const filmListElement = filmElement.querySelector('.films-list');
const filmContainerElement = filmListElement.querySelector('.films-list__container');

createSomeFilmCards(MOVIE_COUNT_PER_STEP, filmContainerElement);

titlesForExtraContainerd
  .forEach((title) => (
    render(filmElement, new ExtraContainerView(title).element, RenderPosition.BEFOREEND))
  );

const extraContainersElement = filmElement.querySelectorAll('.films-list--extra .films-list__container');

createSomeFilmCards(CARD_IN_EXTRA_COUNT, extraContainersElement[FIRST_EXTRA_CONTAINER]);
createSomeFilmCards(CARD_IN_EXTRA_COUNT, extraContainersElement[SECOND_EXTRA_CONTAINER]);

const footer = document.querySelector('.footer');
const statisticsContainerElement = footer.querySelector('.footer__statistics');

render(statisticsContainerElement, new StatsView(movies).element, RenderPosition.BEFOREEND);

if (movies.length > MOVIE_COUNT_PER_STEP) {
  let renderedTaskCount = MOVIE_COUNT_PER_STEP;

  renderTemplate(filmListElement, new ShowMoreButtonView().element, RenderPosition.BEFOREEND);

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
