const USER_RATING = {
  NOVICE: 'novice',
  FAN: 'fan',
  MOVIE_BUFF: 'movie buff',
};

const getUserRating = (count) => {
  if (count < 11) {
    return USER_RATING.NOVICE;
  } else if (count < 21) {
    return USER_RATING.FAN;
  } else {
    return USER_RATING.MOVIE_BUFF;
  }
};

export const createUserProfileTemplate = (movies) => {
  const watchedMoviesCount = movies.filter((movie) => (movie.isWatched)).length;
  const userRatingTitle = watchedMoviesCount > 0 ? getUserRating(watchedMoviesCount) : '';

  return `
    <section class="header__profile profile">
      <p class="profile__rating">${userRatingTitle}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
};


