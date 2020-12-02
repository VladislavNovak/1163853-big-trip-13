import dayjs from 'dayjs';
import dayjsRandom from 'dayjs-random';
import {CHANCE_DAYS_GAP, CHANCE_PHOTO_COUNT, Routes, RouteTypes} from './mock-constants';
import {getRandomInteger} from '../utils';

export const getPlaces = () => Object.keys(Routes);

export const getRandomPlace = (isEditMode) => isEditMode && getPlaces()[getRandomInteger(0, getPlaces().length - 1)] || ``;

export const getPlaceDescription = (place, isEditMode) => isEditMode && Routes[place] || ``;

export const getPlacePhotos = (isEditMode) => isEditMode && new Array(getRandomInteger(1, CHANCE_PHOTO_COUNT)).fill().map(() => `http://picsum.photos/248/152?r=${Math.random()}`) || ``;

export const getPointPrice = (isEditMode) => isEditMode && getRandomInteger(100, 1000) || 0;

export const getFavoriteStatus = (isEditMode) => isEditMode && Math.random() > 0.5 || false;

export const generateDate = (isEditMode) => {
  dayjs.extend(dayjsRandom);
  const timeStart = isEditMode && dayjs.recent(CHANCE_DAYS_GAP).toDate() || dayjs().toDate();
  const timeEnd = isEditMode && dayjs.between(timeStart, dayjs().add(CHANCE_DAYS_GAP, `day`)).toDate() || dayjs().toDate();
  return {timeStart, timeEnd};
};

export const getRamdomType = (isEditMode) => RouteTypes[isEditMode && getRandomInteger(0, RouteTypes.length - 1) || 0];
