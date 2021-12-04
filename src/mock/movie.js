import {getRandomInteger} from '../utils';
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
const strings = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];
const writers = [
  'Lindsley Parsons',
  'Will Beale',
  'Jo Swerling',
  'Frank Ryan',
  'Rose Franken',
];
let movieIdCount = 0;
let commentIdCount = 0;

const getRandomElement = (array) => {
  const integer = getRandomInteger(0, array.length - 1);

  return array[integer];
};

const getRating = () => {
  const integer = getRandomInteger(0, 10);
  const decimalPoint = getRandomInteger(0, 10);

  return `${integer}.${decimalPoint}`;
};

const getRuntime = () => {
  const hour = getRandomInteger(1, 3);
  const minute = getRandomInteger(0, 59);

  return dayjs().hour(hour).minute(minute).format('H[h] m[m]');
};

const getRelease = () => {
  const year = getRandomInteger(1920, 1960);
  const month = getRandomInteger(1, 12);
  const day = getRandomInteger(1, 28);

  return dayjs().day(day).month(month).year(year);
};

const getArrayOfElements = (elements, minCount = 1, maxCount = 5) => {
  const count = getRandomInteger(minCount, maxCount);
  const randomElement = new Array(count)
    .fill('')
    .map(() => getRandomElement(elements));

  return new Set(randomElement);
};

const getMovieId = () => {
  movieIdCount++;

  return `movie_${movieIdCount}`;
};

const getCommentId = () => {
  commentIdCount++;

  return `comment_${commentIdCount}`;
};

export const getMovie = () => {
  const stringsCount = getRandomInteger(1, 5);
  const commentsCount = getRandomInteger(1, 5);
  const name = getRandomElement(names);

  return {
    id: getMovieId(),
    name,
    originalName: name,
    poster: posters[name],
    description: new Array(stringsCount).fill('').map(() => getRandomElement(strings)).join(' '),
    comments: new Array(commentsCount).fill('').map(() => getCommentId()),
    ageRating: getRandomElement(ages),
    rating: getRating(),
    release: getRelease(),
    runtime: getRuntime(),
    genres: getArrayOfElements(genres, 1, 4),
    director: getRandomElement(directors),
    writers: getArrayOfElements(writers, 1, 4),
    actors: getArrayOfElements(actors, 1, 7),
    country: getRandomElement(countries),
  };
};

