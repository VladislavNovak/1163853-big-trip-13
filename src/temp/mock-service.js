import dayjs from 'dayjs';
import dayjsRandom from 'dayjs-random';
import {CHANCE_DAYS_GAP, CHANCE_PHOTOS_COUNT, GenerateMode, RouteTypes} from './mock-constants';
import {getRandomInteger} from '../utils';

export const getPhoto = () => {
  const rawPhotos = new Array(getRandomInteger(0, CHANCE_PHOTOS_COUNT)).fill().map(() => `http://picsum.photos/248/152?r=${Math.random()}`);

  return rawPhotos.map((photos) => {
    return {
      src: photos,
      description: ``,
    };
  });
};

export const getPointPrice = (mode) => (mode === GenerateMode.AS_EDIT_MODE) ? getRandomInteger(100, 1000) : 0;

export const getFavoriteStatus = (mode) => (mode === GenerateMode.AS_EDIT_MODE) ? Math.random() > 0.5 : false;

export const generateDate = (mode) => {
  dayjs.extend(dayjsRandom);
  const recent = dayjs.recent(CHANCE_DAYS_GAP).toDate();
  const soon = dayjs.soon(CHANCE_DAYS_GAP).toDate();
  const timeStart = (mode === GenerateMode.AS_EDIT_MODE) ? dayjs.between(recent, soon).toDate() : dayjs().toDate();
  const timeEnd = (mode === GenerateMode.AS_EDIT_MODE) ? dayjs.between(timeStart, dayjs().add(CHANCE_DAYS_GAP, `day`)).toDate() : dayjs().toDate();
  return {timeStart, timeEnd};
};

export const getRamdomType = (mode) => {
  return {
    [GenerateMode.AS_EDIT_MODE]: RouteTypes[getRandomInteger(0, RouteTypes.length - 1)],
    [GenerateMode.AS_NEW_COMPONENT]: RouteTypes[0],
  }[mode];
};
