import {render, RenderPosition} from '../render';
import {CARD_IN_LIST_COUNT} from '../const';
import FiltersView from '../view/filters';
import StatsView from '../view/stats';
import UserProfileView from '../view/user-profile';
import {getMovie} from '../mock/movie';
import {getComments} from '../mock/comments';
import {getFilters} from '../mock/filters';
import MovieListPresenter from '../presenter/list';
import SortView from '../view/sort';
import {remove} from "../utils";

export default class MainPresenter {
  #movies = Array.from({length: CARD_IN_LIST_COUNT}, getMovie);
  #commentsIds = [].concat(...this.#movies.map((movie) => (movie.commentsIds)));
  #comments = getComments(this.#commentsIds);
  #filters = getFilters(this.#movies);

  #mainElement = document.querySelector('.main');

  #filterComponent = new FiltersView(this.#filters);
  #userProfileComponent = new UserProfileView(this.#movies);
  #sortComponent = new SortView();
  #statsComponent = new StatsView(this.#movies);

  constructor() {
    this.renderPage();
    new MovieListPresenter(this.#handleDataChange).init(this.#movies, this.#comments);
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

  #renderSort = () => {
    render(this.#mainElement, this.#sortComponent, RenderPosition.BEFOREEND);
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
