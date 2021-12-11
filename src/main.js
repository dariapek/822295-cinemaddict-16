import {render, RenderPosition} from './render.js';
import UserProfileView from './view/user-profile';
import FiltersView from './view/filters';
import SortView from './view/sort';
import ListView from './view/list';
import MovieCardView from './view/card';
import ShowMoreButtonView from './view/show-more-button';
import StatsView from './view/stats';
import {getMovie} from './mock/movie';
import {getComments} from './mock/comments';
import {getFilters} from './mock/filters';
import ExtraContainerView from './view/extra-container';
import {getExtraContainerTitle} from './mock/extra-title';
import DetailModalView from './view/detail-modal';

const CARD_IN_LIST_COUNT = 45;

const movies = Array.from({length: CARD_IN_LIST_COUNT}, getMovie);
const commentsIds = [].concat(...movies.map((movie) => (movie.commentsIds)));
const comments = getComments(commentsIds);
const filters = getFilters(movies);

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footer = document.querySelector('.footer');
const statisticsContainerElement = footer.querySelector('.footer__statistics');

render(headerElement, new UserProfileView(movies).element, RenderPosition.BEFOREEND);
render(mainElement, new FiltersView(filters).element, RenderPosition.BEFOREEND);
render(mainElement, new SortView().element, RenderPosition.BEFOREEND);
render(mainElement, new ListView().element, RenderPosition.BEFOREEND);
render(statisticsContainerElement, new StatsView(movies).element, RenderPosition.BEFOREEND);

const filmElement = document.querySelector('.films');
const filmListElement = filmElement.querySelector('.films-list');
const filmContainerElement = filmListElement.querySelector('.films-list__container');
const modal = new DetailModalView().element;

const renderMovie = (movie, container) => {
  const movieElement = new MovieCardView(movie).element;
  render(container, movieElement, RenderPosition.BEFOREEND);

  const card = movieElement.querySelector('.film-card');

  card.addEventListener('click', () => {
    render(footer, modal.update(movie, comments), RenderPosition.AFTEREND);
  });
};

const renderMovieList = () => {
  const MOVIE_COUNT_PER_STEP = 5;
  const CARD_IN_EXTRA_COUNT = 2;
  const FIRST_EXTRA_CONTAINER = 0;
  const SECOND_EXTRA_CONTAINER = 1;

  const titlesForExtraContainer = getExtraContainerTitle();

  const createSomeFilmCards = (cont, container) => {
    for (let i = 0; i < cont; i++) {
      renderMovie(movies[i], container);
    }
  };

  createSomeFilmCards(MOVIE_COUNT_PER_STEP, filmContainerElement);

  if (movies.length > MOVIE_COUNT_PER_STEP) {
    let renderedTaskCount = MOVIE_COUNT_PER_STEP;

    render(filmListElement, new ShowMoreButtonView().element, RenderPosition.BEFOREEND);

    const loadMoreButton = filmListElement.querySelector('.films-list__show-more');

    loadMoreButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      movies
        .slice(renderedTaskCount, renderedTaskCount + MOVIE_COUNT_PER_STEP)
        .forEach((movie) => render(filmContainerElement, new MovieCardView(movie).element, RenderPosition.BEFOREEND));

      renderedTaskCount += MOVIE_COUNT_PER_STEP;

      if (renderedTaskCount >= movies.length) {
        loadMoreButton.remove();
      }
    });
  }

  titlesForExtraContainer
    .forEach((title) => (
      render(filmElement, new ExtraContainerView(title).element, RenderPosition.BEFOREEND))
    );

  const extraContainersElement = filmElement.querySelectorAll('.films-list--extra .films-list__container');

  createSomeFilmCards(CARD_IN_EXTRA_COUNT, extraContainersElement[FIRST_EXTRA_CONTAINER]);
  createSomeFilmCards(CARD_IN_EXTRA_COUNT, extraContainersElement[SECOND_EXTRA_CONTAINER]);
};

renderMovieList();
