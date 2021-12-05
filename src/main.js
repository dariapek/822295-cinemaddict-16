import {renderTemplate, RenderPosition} from './render.js';
import {createUserProfileTemplate} from './view/user-profile';
import {createMenuTemplate} from './view/menu';
import {createSortTemplate} from './view/sort';
import {createListTemplate} from './view/list';
import {createCardTemplate} from './view/card';
import {createShowMoreButtonTemplate} from './view/show-more-button';
import {createExtraContainerTemplate} from './view/extra-contaner';
import {createStatsTemplate} from './view/stats';
import {createDetailModal} from './view/detail-modal';
import {getMovie} from './mock/movie';
import {getComments} from './mock/comments';
import {FIRST} from './const';

const CARD_IN_LIST_COUNT = 5;
const CARD_IN_EXTRA_COUNT = 2;
const EXTRA_CONTAINER_COUNT = 2;
const FIRST_EXTRA_CONTAINER = 0;
const SECOND_EXTRA_CONTAINER = 1;

const movies = Array.from({length: CARD_IN_LIST_COUNT}, getMovie);
const commentsIds = [].concat(...movies.map((movie) => (movie.commentsIds)));
const comments = getComments(commentsIds);

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');

const createSomeFilmCards = (cont, container) => {
  for (let i = 0; i < cont; i++) {
    renderTemplate(container, createCardTemplate(movies[i]), RenderPosition.BEFOREEND);
  }
};

renderTemplate(headerElement, createUserProfileTemplate(), RenderPosition.BEFOREEND);
renderTemplate(mainElement, createMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(mainElement, createSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(mainElement, createListTemplate(), RenderPosition.BEFOREEND);

const filmElement = document.querySelector('.films');
const filmListElement = filmElement.querySelector('.films-list');
const filmContainerElement = filmListElement.querySelector('.films-list__container');

createSomeFilmCards(CARD_IN_LIST_COUNT, filmContainerElement);
renderTemplate(filmListElement, createShowMoreButtonTemplate(), RenderPosition.BEFOREEND);

for (let i = 0; i < EXTRA_CONTAINER_COUNT; i++) {
  renderTemplate(filmElement, createExtraContainerTemplate(), RenderPosition.BEFOREEND);
}

const extraContainersElement = filmElement.querySelectorAll('.films-list--extra .films-list__container');

createSomeFilmCards(CARD_IN_EXTRA_COUNT, extraContainersElement[FIRST_EXTRA_CONTAINER]);
createSomeFilmCards(CARD_IN_EXTRA_COUNT, extraContainersElement[SECOND_EXTRA_CONTAINER]);

const footer = document.querySelector('.footer');
const statisticsContainerElement = footer.querySelector('.footer__statistics');

renderTemplate(statisticsContainerElement, createStatsTemplate(), RenderPosition.BEFOREEND);
renderTemplate(footer, createDetailModal(movies[FIRST], comments), RenderPosition.AFTEREND);
