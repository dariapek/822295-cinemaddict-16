import MovieCardView from '../view/card';
import {render, RenderPosition} from '../render';
import SortView from '../view/sort';
import ListView from '../view/list';
import {getExtraContainerTitle} from '../mock/extra-title';
import ExtraContainerView from '../view/extra-container';
import {CARD_IN_EXTRA_COUNT, FIRST_EXTRA_CONTAINER, SECOND_EXTRA_CONTAINER, START_INDEX} from '../const';
import ShowMoreButtonView from '../view/show-more-button';
import DetailModalView from '../view/detail-modal';

export default class MovieListPresenter {
  #listContainer = null;

  #movies = [];
  #comments = [];

  #modalComponent = new DetailModalView();

  #body = document.querySelector('body');

  constructor(listContainer) {
    this.#listContainer = listContainer;
  }

  init = (movies, comments) => {
    this.#movies = movies;
    this.#comments = comments;

    this.renderList();
  }

  #renderMovie = (movie, comments, container) => {
    const movieComponent = new MovieCardView(movie);
    const movieElement = movieComponent.element;

    const openModal = (modalElement) => {
      this.#body.classList.add('hide-overflow');
      this.#body.appendChild(modalElement);
    };

    const closeModal = (modalElement) => {
      this.#body.classList.remove('hide-overflow');
      this.#body.removeChild(modalElement);
    };

    movieComponent.setClickHandler(() => {
      this.#modalComponent.update({movie, comments});
      const modalElement = this.#modalComponent.element;
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

      this.#modalComponent.setCloseHandler(onClickClose);

      document.addEventListener('keydown', onEscClose);
      openModal(modalElement);
    });

    render(container, movieElement, RenderPosition.BEFOREEND);
  }

  #renderMovies = (container) => {
    const MOVIE_COUNT_PER_STEP = 5;

    this.#movies
      .slice(START_INDEX, MOVIE_COUNT_PER_STEP)
      .forEach((movie) => this.#renderMovie(movie, this.#comments, container));

    if (this.#movies.length > MOVIE_COUNT_PER_STEP) {
      let renderedMovieCount = MOVIE_COUNT_PER_STEP;

      const showMoreButtonComponent = new ShowMoreButtonView();

      render(container, showMoreButtonComponent, RenderPosition.AFTEREND);

      showMoreButtonComponent.setClickHandle(() => {
        this.#movies
          .slice(renderedMovieCount, renderedMovieCount + MOVIE_COUNT_PER_STEP)
          .forEach((movie) => this.#renderMovie(movie, this.#comments, container));

        renderedMovieCount += MOVIE_COUNT_PER_STEP;

        if (renderedMovieCount >= this.#movies.length) {
          showMoreButtonComponent.element.remove();
        }
      });
    }
  }

  #renderExtras = (container) => {
    const titlesForExtraContainer = getExtraContainerTitle();

    titlesForExtraContainer
      .forEach((title) => (
        render(container, new ExtraContainerView(title), RenderPosition.BEFOREEND))
      );

    const extraContainersElement = container.querySelectorAll('.films-list--extra .films-list__container');

    this.#movies.slice(START_INDEX, CARD_IN_EXTRA_COUNT)
      .forEach((movie) => this.#renderMovie(movie, this.#comments, extraContainersElement[FIRST_EXTRA_CONTAINER]));

    this.#movies.slice(START_INDEX, CARD_IN_EXTRA_COUNT)
      .forEach((movie) => this.#renderMovie(movie, this.#comments, extraContainersElement[SECOND_EXTRA_CONTAINER]));
  }

  renderList() {
    const mainElement = document.querySelector('.main');
    if (this.#movies.length) {
      render(mainElement, new SortView(), RenderPosition.BEFOREEND);
    }

    const listElement = new ListView(this.#movies).element;
    const films = listElement.closest('.films');
    const moviesContainer = films.querySelector('.films-list__container');

    render(mainElement, listElement, RenderPosition.BEFOREEND);

    if (this.#movies.length) {
      this.#renderMovies(moviesContainer);
      this.#renderExtras(films);
    }
  }
}


