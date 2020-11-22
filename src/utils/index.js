import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

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
