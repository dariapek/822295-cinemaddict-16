import {render, RenderPosition} from './render.js';
import {CARD_IN_LIST_COUNT,} from './const';
import FiltersView from './view/filters';
import StatsView from './view/stats';
import UserProfileView from './view/user-profile';
import {getMovie} from './mock/movie';
import {getComments} from './mock/comments';
import {getFilters} from './mock/filters';
import MovieListPresenter from './presenter/list';

const movies = Array.from({length: CARD_IN_LIST_COUNT}, getMovie);
const commentsIds = [].concat(...movies.map((movie) => (movie.commentsIds)));
const comments = getComments(commentsIds);
const filters = getFilters(movies);

const mainElement = document.querySelector('.main');

const renderPage = () => {
  const headerElement = document.querySelector('.header');
  const footer = document.querySelector('.footer');
  const statisticsContainerElement = footer.querySelector('.footer__statistics');

  render(headerElement, new UserProfileView(movies), RenderPosition.BEFOREEND);
  render(mainElement, new FiltersView(filters), RenderPosition.BEFOREEND);
  render(statisticsContainerElement, new StatsView(movies), RenderPosition.BEFOREEND);
};

renderPage();
new MovieListPresenter().init(movies, comments);
