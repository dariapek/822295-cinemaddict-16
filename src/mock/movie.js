import {getRandomElement, getRandomInteger, getText} from '../utils';
import dayjs from 'dayjs';

const actors = [
  'Carole Lombard',
  'James Stewart',
  'Charles Coburn',
  'Eddie Quillan',
  'John Wayne',
  'Lane Chandler',
  'Nancy Shubert',
  'Nancy Carroll',
  'Dorothy Revier',
  'Hal Skelly',
];
const ages = ['0+', '6+', '13+', '16+', '18+'];
const countries = ['USA', 'Russia', 'Spain', 'France', 'England'];
const directors = [
  'John Cromwell',
  'A. Edward Sutherland',
  'Armand Schaefer',
  'John Cromwell',
];
const genres = [
  'Action',
  'Comedy',
  'Sci-Fi',
  'Documentary',
  'Drama',
  'Entertainment',
  'Horror',
];
const names = [
  'Made for each other',
  'Popeye meets sinbad',
  'Sagebrush trail',
  'Santa claus conquers the martians',
  'The dance of life',
  'The great flamarion',
  'The man with the golden arm',
];
const posters = {
  'Made for each other': 'made-for-each-other.png',
  'Popeye meets sinbad': 'popeye-meets-sinbad.png',
  'Sagebrush trail': 'sagebrush-trail.jpg',
  'Santa claus conquers the martians': 'santa-claus-conquers-the-martians.jpg',
  'The dance of life': 'the-dance-of-life.jpg',
  'The great flamarion': 'the-great-flamarion.jpg',
  'The man with the golden arm': 'the-man-with-the-golden-arm.jpg',
};
const writers = [
  'Lindsley Parsons',
  'Will Beale',
  'Jo Swerling',
  'Frank Ryan',
  'Rose Franken',
];
let movieCount = 0;
let commentIdCount = 0;

const getRating = () => {
  const integer = getRandomInteger(0, 10);
  const decimalPoint = getRandomInteger(0, 10);

  return `${integer}.${decimalPoint}`;
};

const getRuntime = () => {
  const hour = getRandomInteger(1, 3);
  const minute = getRandomInteger(0, 59);

  return dayjs().hour(hour).minute(minute);
};

const getRelease = () => {
  const minYear = 1960;
  const maxYear = 1960;
  const minMonth = 1;
  const maxMonth = 12;
  const minDay = 1;
  const maxDay = 28;

  const year = getRandomInteger(minYear, maxYear);
  const month = getRandomInteger(minMonth, maxMonth);
  const day = getRandomInteger(minDay, maxDay);

  return dayjs().day(day).month(month).year(year);
};

const getArrayOfElements = (elements, minCount = 1, maxCount = 5) => {
  const count = getRandomInteger(minCount, maxCount);
  const randomElement = new Array(count)
    .fill('')
    .map(() => getRandomElement(elements));

  return Array.from(new Set(randomElement));
};

const getMovieId = () => {
  movieCount++;

  return `movie_${movieCount}`;
};

const getCommentId = () => {
  commentIdCount++;

  return `comment_${commentIdCount}`;
};

export const getMovie = () => {
  const commentsCount = getRandomInteger(0, 5);
  const name = getRandomElement(names);

  return {
    id: getMovieId(),
    name,
    originalName: name,
    poster: posters[name],
    description: getText(1, 5),
    commentsIds: new Array(commentsCount).fill('').map(() => getCommentId()),
    ageRating: getRandomElement(ages),
    rating: getRating(),
    release: getRelease(),
    runtime: getRuntime(),
    genres: getArrayOfElements(genres, 1, 4),
    director: getRandomElement(directors),
    writers: getArrayOfElements(writers, 1, 4),
    actors: getArrayOfElements(actors, 1, 7),
    country: getRandomElement(countries),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    inWatchlist: Boolean(getRandomInteger(0, 1)),
  };
};

