import dayjs from "dayjs";
import dayjsRandom from "dayjs-random";
import {CHANCE_DAYS_GAP, CHANCE_PHOTO_COUNT, Routes, RouteTypes} from "./mock-constants";
import {getRandomInteger} from "../utils";

export const getPlaces = () => Object.keys(Routes);

export const getRandomPlace = (isNotNew) => isNotNew && getPlaces()[getRandomInteger(0, getPlaces().length - 1)] || ``;

export const getPlaceDescription = (place, isNotNew) => isNotNew && Routes[place] || ``;

export const getPlacePhotos = (isNotNew) => isNotNew && new Array(getRandomInteger(1, CHANCE_PHOTO_COUNT)).fill().map(() => `http://picsum.photos/248/152?r=${Math.random()}`) || ``;

export const getPointPrice = (isNotNew) => isNotNew && getRandomInteger(100, 1000) || 0;

export const getFavoriteStatus = (isNotNew) => isNotNew && Math.random() > 0.5 || false;

export const generateDate = (isNotNew) => {
  dayjs.extend(dayjsRandom);
  const timeStart = isNotNew && dayjs.recent(CHANCE_DAYS_GAP).toDate() || dayjs().toDate();
  const timeEnd = isNotNew && dayjs.between(timeStart, dayjs().add(CHANCE_DAYS_GAP, `day`)).toDate() || dayjs().toDate();
  return {timeStart, timeEnd};
};

export const getRamdomType = (isNotNew) => RouteTypes[isNotNew && getRandomInteger(0, RouteTypes.length - 1) || 0];
