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


export default class MainPresenter {
  #movies = [];
  #commentsIds = [];
  #comments = [];
  #filters = [];

  constructor() {
    this.#movies = Array.from({length: CARD_IN_LIST_COUNT}, getMovie);
    this.#commentsIds = [].concat(...this.#movies.map((movie) => (movie.commentsIds)));
    this.#comments = getComments(this.#commentsIds);
    this.#filters = getFilters(this.#movies);

    this.renderPage();
    new MovieListPresenter().init(this.#movies, this.#comments);
  }

  renderPage() {
    const headerElement = document.querySelector('.header');
    const mainElement = document.querySelector('.main');
    const footer = document.querySelector('.footer');
    const statisticsContainerElement = footer.querySelector('.footer__statistics');

    render(headerElement, new UserProfileView(this.#movies), RenderPosition.BEFOREEND);
    render(mainElement, new FiltersView(this.#filters), RenderPosition.BEFOREEND);
    render(statisticsContainerElement, new StatsView(this.#movies), RenderPosition.BEFOREEND);

    if (this.#movies.length) {
      render(mainElement, new SortView(), RenderPosition.BEFOREEND);
    }
  }
}
