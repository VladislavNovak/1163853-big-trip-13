import {nanoid} from "nanoid";
import {pointType, pointPlace, pointPlaceDescription, getRandomInteger, getRandomIntervalDate, getPlacePhotos} from "./utils";

export const generatePoint = () => {
  const id = nanoid();
  const type = pointType;
  const place = pointPlace;
  const placeDescription = pointPlaceDescription;
  const placePhotos = getPlacePhotos();
  const {startTime, endTime} = getRandomIntervalDate();
  const price = getRandomInteger(100, 1000);
  const isFavorite = Boolean(getRandomInteger());
  return {
    id,
    type,
    place,
    placeDescription,
    placePhotos,
    startTime,
    endTime,
    price,
    isFavorite,
  };
};
