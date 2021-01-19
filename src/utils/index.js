import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getID = () => {
  return `xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === `x` ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
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
 * @param {string[]} items - in the case of this project, it is a listing of destinations
 * @return {string} returns the collected string
 */
export const getEllipseString = (items) => (items.length > 3)
  ? `${items[0]} &mdash; ... &mdash; ${items[items.length - 1]}`
  : items.reduce((phrase, word, index) => (index === 0) ? `${phrase}${word}` : `${phrase} &mdash; ${word}`, ``);

export const getMaxValueIndexFromObject = (structure) => Object.values(structure)
  .reduce((bestIndexSoFar, currentlyTestedValue, currentlyTestedIndex, items) => currentlyTestedValue > items[bestIndexSoFar] ? currentlyTestedIndex : bestIndexSoFar, 0);

export const getMinValueIndexFromObject = (structure) => Object.values(structure)
  .reduce((bestIndexSoFar, currentlyTestedValue, currentlyTestedIndex, items) => currentlyTestedValue < items[bestIndexSoFar] ? currentlyTestedIndex : bestIndexSoFar, 0);

export const assign = (expandable, ...payload) => Object.assign({}, expandable, ...payload);

/**
 * This function retrieves a specific list from an object
 * @param {Object} structure - the object from which to get the list
 * @param {string} type - an enumeration by the type of which the list is formed
 * @return {string[]} returns an array of strings
 */
export const getListByType = (structure, type) => structure.map((item) => item[type]);

export const batchBind = (self, ...methods) => methods.forEach((method) => (self[method.name] = method.bind(self)));

export const capitalizeFirstLetter = (item) => (!item) ? item : item[0].toUpperCase() + item.slice(1);

export const isOnline = () => window.navigator.onLine;
