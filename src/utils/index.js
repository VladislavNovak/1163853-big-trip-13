import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getID = () => {
  return `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0;
    let v = c === `x` ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * This function shuffles a copy of the original array and truncates it at random
 * @param {string[]} arr - in the case of this project, it is a listing of offers
 * @return {string[]} returns an array of several random values of the original array
 */
export const getSomeArrayValues = (arr) => {
  const clone = arr.slice(0);
  for (let i = clone.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }

  const sliceArr = clone.slice(0, getRandomInteger(0, 5));

  return sliceArr;
};

/**
 * This function formats the date according to a certain condition
 * @param {Object} time - the date to be converted
 * @param {string} view - one of the variants of the FormatTypes object
 * @return {string} returns the collected formatted string
 */
export const getFormattedDate = (time, view) => {
  return dayjs(time).format(view);
};

export const getFormattedDuration = (start, end) => {
  dayjs.extend(duration);
  let humanizer = ``;

  const ms = dayjs(end).diff(dayjs(start));

  const asDay = Math.floor(dayjs.duration(ms).asDays());
  const asHour = Math.floor((dayjs.duration(ms).asHours()) % 24);
  const asMinute = Math.floor((dayjs.duration(ms).asMinutes()) % 60);

  if (asDay) {
    humanizer += (asDay >= 10) ? `${asDay}D ` : `0${asDay}D `;
  }
  humanizer += (asHour >= 10) ? `${asHour}H ` : `0${asHour}H `;
  humanizer += (asMinute >= 10) ? `${asMinute}M ` : `0${asMinute}M`;

  return humanizer;
};

/**
 * This function depending on the number of arguments returns different kinds of string
 * @param {string[]} arr - in the case of this project, it is a listing of destinations
 * @return {string} returns the collected string
 */
export const getEllipseString = (arr) => (arr.length > 3) ? `${arr[0]} &mdash; ... &mdash; ${arr[arr.length - 1]}` : arr.reduce((phrase, word, index) => (index === 0) ? `${phrase}${word}` : `${phrase} &mdash; ${word}`, ``);

/**
 * This function replaces one found element in the array
 * @param {Object[]} items - array to update
 * @param {Object} update - the object to update
 * @return {Object[]} returns an array with the updated object
 */
export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

export const assign = (a, ...b) => Object.assign({}, a, ...b);
