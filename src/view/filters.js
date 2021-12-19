import AbstractView from "./abstract";

const FILTER = {
  all: 'All movies',
  watchlist: 'Watchlist',
  history: 'History',
  favorites: 'Favorites',
};

const getNavigationItem = (filters) =>
  filters.map((filter) => {
    if (filter.name === 'all') {
      return `<a
                href="#${filter.name}"
                class="main-navigation__item">
                ${FILTER[filter.name]}
            </a>`;
    }

    return `<a
                href="#${filter.name}"
                class="main-navigation__item">
                ${FILTER[filter.name]}
                <span class="main-navigation__item-count">${filter.count}</span>
            </a>`;
  }).join(' ');

const createFiltersTemplate = (filters) => {
  const filtersBlock = getNavigationItem(filters);

  return `<nav class="main-navigation">
            <div class="main-navigation__items">
              ${filtersBlock}
            </div>
            <a href="#stats" class="main-navigation__additional">Stats</a>
          </nav>`;
};

export default class FiltersView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();

    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}
