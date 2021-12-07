const movieToFilterMap = {
  all: (movies) => movies.length,
  watchlist: (movies) => movies
    .filter((movie) => movie.inWatchlist).length,
  favorites: (movies) => movies
    .filter((movie) => movie.isFavorite).length,
  history: (movies) => movies
    .filter((movie) => movie.isWatched).length,
};

export const getFilters = (movies) => Object.entries(movieToFilterMap).map(
  ([filterName, countMovies]) => ({
    name: filterName,
    count: countMovies(movies),
  }),
);
