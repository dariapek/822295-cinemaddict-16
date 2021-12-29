import MovieCardView from '../view/card';
import {render, RenderPosition} from '../render';
import ListView from '../view/list';
import {getExtraContainerTitle} from '../mock/extra-title';
import ExtraContainerView from '../view/extra-container';
import {
  CARD_IN_EXTRA_COUNT,
  FIRST_EXTRA_CONTAINER,
  MOVIE_COUNT_PER_STEP,
  SECOND_EXTRA_CONTAINER,
  START_INDEX
} from '../const';
import ShowMoreButtonView from '../view/show-more-button';
import DetailModalView from '../view/detail-modal';
import {updateItem} from "../utils";

export default class MovieListPresenter {
  #movies = [];
  #sourcedMovies = [];
  #comments = [];

  #modalComponent = new DetailModalView();
  #showMoreButtonComponent = new ShowMoreButtonView();
  #listComponent;

  #changeData;

  #body = document.querySelector('body');
  #filmsContainer;

  constructor(changeData) {
    this.#changeData = changeData;
  }


  init = (movies, comments) => {
    this.#movies = movies;
    this.#sourcedMovies = movies;
    this.#comments = comments;

    this.#listComponent = new ListView(this.#movies);
    this.#filmsContainer = this.#listComponent.element.closest('.films');

    this.renderList();

    if (this.#movies.length) {
      this.#renderExtras(this.#filmsContainer);
    }
  }

  #openModal = (modalElement) => {
    this.#body.classList.add('hide-overflow');
    this.#body.appendChild(modalElement);
  };

  #closeModal = (modalElement) => {
    this.#body.classList.remove('hide-overflow');
    this.#body.removeChild(modalElement);
  };

  #renderModal = (movie, comments) => {
    this.#modalComponent.update({movie, comments});
    const modalElement = this.#modalComponent.element;
    const closeButton = modalElement.querySelector('.film-details__close-btn');

    const onClickClose = () => {
      this.#closeModal(modalElement);
      closeButton.removeEventListener('click', onClickClose);
    };

    const onEscClose = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        this.#closeModal(modalElement);
        document.removeEventListener('keydown', onEscClose);
      }
    };

    const onModalControlsClick = (evt) => {
      const updatedMovie = this.#getUpdatedMovie(evt, movie);
      this.#updateMovie(updatedMovie);
      this.#clearList();
      this.renderList();
      this.#removeModal();
      this.#renderModal(updatedMovie, comments);
    }

    this.#modalComponent.setCloseHandler(onClickClose);
    this.#modalComponent.setControlsClickHandler(onModalControlsClick);

    document.addEventListener('keydown', onEscClose);
    this.#openModal(modalElement);
  }

  #renderMovie = (movie, comments, container) => {
    const movieComponent = new MovieCardView(movie);
    const movieElement = movieComponent.element;

    const onCardControlsClick = (evt) => {
      const updatedMovie = this.#getUpdatedMovie(evt, movie);

      this.#updateMovie(updatedMovie);
      this.#clearList();
      this.renderList();
    }

    movieComponent.setControlsClickHandler(onCardControlsClick);
    movieComponent.setCardClickHandler(() => (this.#renderModal(movie, comments)));

    render(container, movieElement, RenderPosition.BEFOREEND);
  }

  #getUpdatedMovie = (evt, movie) => {
    const controlType = evt.target.dataset.controlType;

    return {...movie, [controlType]: !movie[controlType]};
  }

  #updateMovie = (updatedMovie) => {
    const updatedMovies = updateItem(this.#movies, updatedMovie);

    this.#movies = updatedMovies;
    this.#sourcedMovies = updatedMovies;
    this.#changeData(updatedMovies);
  }

  #renderMovies = (container) => {
    this.#movies
      .slice(START_INDEX, MOVIE_COUNT_PER_STEP)
      .forEach((movie) => this.#renderMovie(movie, this.#comments, container));

    if (this.#movies.length > MOVIE_COUNT_PER_STEP) {
      let renderedMovieCount = MOVIE_COUNT_PER_STEP;

      render(container, this.#showMoreButtonComponent, RenderPosition.AFTEREND);

      this.#showMoreButtonComponent.setClickHandle(() => {
        this.#movies
          .slice(renderedMovieCount, renderedMovieCount + MOVIE_COUNT_PER_STEP)
          .forEach((movie) => this.#renderMovie(movie, this.#comments, container));

        renderedMovieCount += MOVIE_COUNT_PER_STEP;

        if (renderedMovieCount >= this.#movies.length) {
          this.#showMoreButtonComponent.element.remove();
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

  #clearList = () => {
    const cards = this.#listComponent.element
      .querySelector('.films-list')
      .querySelectorAll('.film-card');
    cards.forEach((card) => (card.remove()));
  }

  #removeModal = () => {
    this.#modalComponent.element.remove();
  }

  renderList() {
    const mainElement = document.querySelector('.main');
    const moviesContainer = this.#filmsContainer.querySelector('.films-list__container');

    render(mainElement, this.#listComponent, RenderPosition.BEFOREEND);

    if (this.#movies.length) {
      this.#renderMovies(moviesContainer);
    }
  }
}


