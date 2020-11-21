import {nanoid} from "nanoid";
import {getRandomInteger} from "./utils";
import {getRandomIntervalDate, getPlacePhotos, getPlacesDescriptions, getRandomRouteType, getRandomPlace} from "./point-utils";
import {getOffersByRouteType} from "./offers";

export const generatePoint = () => {
  const id = nanoid();
  const place = getRandomPlace();
  const placeDescription = getPlacesDescriptions(place);
  const placePhotos = getPlacePhotos();
  const {timeStart, timeEnd} = getRandomIntervalDate();
  const price = getRandomInteger(100, 1000);
  const isFavorite = Boolean(getRandomInteger());
  const type = getRandomRouteType();
  const {offers} = getOffersByRouteType(type);
  return {
    id,
    place,
    placeDescription,
    placePhotos,
    timeStart,
    timeEnd,
    price,
    isFavorite,
    type,
    offers,
  };
};

// id: string
// place: string
// placeDescription: string
// placePhotos: array of string
// timeStart: object of Date
// timeEnd: object of Date
// price: number
// isFavorite: bool
// type: string
// offers: array of shape {title: string, price: number, isChecked: bool}
