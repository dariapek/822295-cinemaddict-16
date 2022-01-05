import {render, RenderPosition} from '../render';
import {CARD_IN_LIST_COUNT, sortType} from '../const';
import FiltersView from '../view/filters';
import StatsView from '../view/stats';
import UserProfileView from '../view/user-profile';
import {getMovie} from '../mock/movie';
import {getComments} from '../mock/comments';
import {getFilters} from '../mock/filters';
import MovieListPresenter from '../presenter/list';
import SortView from '../view/sort';
import {remove} from '../utils';

export default class MainPresenter {
  #movies = Array.from({length: CARD_IN_LIST_COUNT}, getMovie);
  #sourcedMovies = this.#movies.slice();
  #commentsIds = [].concat(...this.#movies.map((movie) => (movie.commentsIds)));
  #comments = getComments(this.#commentsIds);
  #filters = getFilters(this.#movies);

  #mainElement = document.querySelector('.main');

  listPresenter;
  #filterComponent = new FiltersView(this.#filters);
  #userProfileComponent = new UserProfileView(this.#movies);
  #sortComponent = new SortView();
  #statsComponent = new StatsView(this.#movies);

  #currentSort = sortType.DEFAULT;

  constructor() {
    this.renderPage();
    this.#initListPresenter(this.#movies);
  }

  renderPage = () => {
    this.#renderUserProfile();
    this.#renderFilters();
    this.#renderStats();

    if (this.#movies.length) {
      this.#renderSort();
    }
  }

  #handleDataChange = (movies) => {
    this.#movies = movies;
    this.#filters = getFilters(this.#movies);

    remove(this.#filterComponent);

    this.#filterComponent.update(this.#filters);
    this.#renderFilters();
  }

  #renderFilters = () => {
    render(this.#mainElement, this.#filterComponent, RenderPosition.AFTERBEGIN);
  }

  #sortByDefault = () => {
    this.#movies = this.#sourcedMovies.slice();
  }

  #sortByDate = () => {
    this.#movies = this.#movies.sort((a, b) => (a.release.diff(b.release)));
  }

  #sortByRating = () => {
    this.#movies = this.#movies.sort((a, b) => (b.rating - a.rating));
  }

  #sortHandle = (evt) => {
    const targetSort = evt.target.dataset.sortType;

    if (this.#currentSort === targetSort) {
      return;
    }

    this.#currentSort = targetSort;

    switch (targetSort) {
      case sortType.DEFAULT:
        this.#sortByDefault();
        break;
      case sortType.DATE:
        this.#sortByDate();
        break;
      case sortType.RATING:
        this.#sortByRating();
        break;
      default:
        return;
    }

    this.listPresenter.clearList();
    this.#initListPresenter(this.#movies);
  }

  #initListPresenter = (movies) => {
    this.listPresenter = new MovieListPresenter(this.#handleDataChange);
    this.listPresenter.init(movies, this.#comments);
  }

  #renderSort = () => {
    render(this.#mainElement, this.#sortComponent, RenderPosition.BEFOREEND);
    this.#sortComponent.setSortClickHandler(this.#sortHandle);
  }

  #renderStats = () => {
    const footer = document.querySelector('.footer');
    const statisticsContainerElement = footer.querySelector('.footer__statistics');
    render(statisticsContainerElement, this.#statsComponent, RenderPosition.BEFOREEND);
  }

  #renderUserProfile = () => {
    const headerElement = document.querySelector('.header');

    render(headerElement, this.#userProfileComponent, RenderPosition.BEFOREEND);
  }
}
