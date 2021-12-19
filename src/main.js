import {render, RenderPosition} from './render.js';
import {
  CARD_IN_LIST_COUNT,
  START_INDEX,
  CARD_IN_EXTRA_COUNT,
  FIRST_EXTRA_CONTAINER,
  SECOND_EXTRA_CONTAINER,
} from './const';
import DetailModalView from './view/detail-modal';
import ExtraContainerView from './view/extra-container';
import FiltersView from './view/filters';
import SortView from './view/sort';
import ListView from './view/list';
import MovieCardView from './view/card';
import ShowMoreButtonView from './view/show-more-button';
import StatsView from './view/stats';
import UserProfileView from './view/user-profile';
import {getMovie} from './mock/movie';
import {getComments} from './mock/comments';
import {getFilters} from './mock/filters';
import {getExtraContainerTitle} from './mock/extra-title';

const movies = Array.from({length: CARD_IN_LIST_COUNT}, getMovie);
const commentsIds = [].concat(...movies.map((movie) => (movie.commentsIds)));
const comments = getComments(commentsIds);
const filters = getFilters(movies);

const body = document.querySelector('body');
const mainElement = document.querySelector('.main');
const modalComponent = new DetailModalView();

const renderMovie = (movie, container) => {
  const movieComponent = new MovieCardView(movie);
  const movieElement = movieComponent.element;
  const card = movieElement.closest('.film-card');

  const openModal = (modalElement) => {
    body.classList.add('hide-overflow');
    body.appendChild(modalElement);
  };

  const closeModal = (modalElement) => {
    body.classList.remove('hide-overflow');
    body.removeChild(modalElement);
  };

  card.addEventListener('click', () => {
    modalComponent.update({movie, comments});
    const modalElement = modalComponent.element;
    const closeButton = modalElement.querySelector('.film-details__close-btn');

    const onClickClose = () => {
      closeModal(modalElement);
      closeButton.removeEventListener('click', onClickClose);
    };

    const onEscClose = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closeModal(modalElement);
        document.removeEventListener('keydown', onEscClose);
      }
    };

    closeButton.addEventListener('click', onClickClose);
    document.addEventListener('keydown', onEscClose);
    openModal(modalElement);
  });

  render(container, movieElement, RenderPosition.BEFOREEND);
};

const renderMovies = (container) => {
  const MOVIE_COUNT_PER_STEP = 5;

  movies
    .slice(START_INDEX, MOVIE_COUNT_PER_STEP)
    .forEach((movie) => renderMovie(movie, container));

  if (movies.length > MOVIE_COUNT_PER_STEP) {
    let renderedMovieCount = MOVIE_COUNT_PER_STEP;

    const showMoreButtonElement = new ShowMoreButtonView().element;

    render(container, showMoreButtonElement, RenderPosition.AFTEREND);

    showMoreButtonElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      movies
        .slice(renderedMovieCount, renderedMovieCount + MOVIE_COUNT_PER_STEP)
        .forEach((movie) => renderMovie(movie, container));

      renderedMovieCount += MOVIE_COUNT_PER_STEP;

      if (renderedMovieCount >= movies.length) {
        showMoreButtonElement.remove();
      }
    });
  }
};

const renderExtras = (container) => {
  const titlesForExtraContainer = getExtraContainerTitle();

  titlesForExtraContainer
    .forEach((title) => (
      render(container, new ExtraContainerView(title).element, RenderPosition.BEFOREEND))
    );

  const extraContainersElement = container.querySelectorAll('.films-list--extra .films-list__container');

  movies.slice(START_INDEX, CARD_IN_EXTRA_COUNT)
    .forEach((movie) => renderMovie(movie, extraContainersElement[FIRST_EXTRA_CONTAINER]));

  movies.slice(START_INDEX, CARD_IN_EXTRA_COUNT)
    .forEach((movie) => renderMovie(movie, extraContainersElement[SECOND_EXTRA_CONTAINER]));
};

const renderPage = () => {
  const headerElement = document.querySelector('.header');
  const footer = document.querySelector('.footer');
  const statisticsContainerElement = footer.querySelector('.footer__statistics');

  render(headerElement, new UserProfileView(movies).element, RenderPosition.BEFOREEND);
  render(mainElement, new FiltersView(filters).element, RenderPosition.BEFOREEND);
  render(statisticsContainerElement, new StatsView(movies).element, RenderPosition.BEFOREEND);
};

const renderList = () => {
  if (movies.length) {
    render(mainElement, new SortView().element, RenderPosition.BEFOREEND);
  }

  const listElement = new ListView(movies).element;
  const films = listElement.closest('.films');
  const moviesContainer = films.querySelector('.films-list__container');

  render(mainElement, listElement, RenderPosition.BEFOREEND);

  if (movies.length) {
    renderMovies(moviesContainer);
    renderExtras(films);
  }
};

renderPage();
renderList();
