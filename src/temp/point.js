import {nanoid} from "nanoid";
import {ComponentType} from "../utils/constants";
import {getRandomInteger} from "./utils";
import {getRandomIntervalDate, getPlacePhotos, getPlacesDescriptions, getRandomRouteType, getRandomPlace, getCurrentDateForNewPoint} from "./point-utils";
import {getOffersByRouteType} from "./offers";

export const generatePoint = (isComponentRegular = ComponentType.REGULAR_AND_EDITABLE) => {
  const id = nanoid();
  const place = isComponentRegular ? getRandomPlace() : ``;
  const placeDescription = isComponentRegular ? getPlacesDescriptions(place) : ``;
  const placePhotos = isComponentRegular ? getPlacePhotos() : ``;
  const {timeStart, timeEnd} = isComponentRegular ? getRandomIntervalDate() : getCurrentDateForNewPoint();
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
// offers: array of shape {title: string, expense: number, isChecked: bool}
