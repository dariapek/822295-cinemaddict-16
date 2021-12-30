import {RANDOM_STRINGS} from './const';
import AbstractView from './view/abstract';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomElement = (array) => {
  const integer = getRandomInteger(0, array.length - 1);

  return array[integer];
};

export const getText = (min, max) => {
  const stringsCount = getRandomInteger(min, max);

  return new Array(stringsCount).fill('').map(() => getRandomElement(RANDOM_STRINGS)).join(' ');
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractView)) {
    throw new Error('Can remove only components');
  }

  component.element.remove();
  component.removeElement();
};
