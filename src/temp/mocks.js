import {CHANCE_EVENTS_COUNT, OffersList} from "./mock-constants";
import {getID, getSomeArrayValues} from "../utils";
import {getRamdomType, generateDate, getPlacePhotos, getRandomPlace, getPlaceDescription, getPointPrice, getFavoriteStatus} from "./mock-service";

const generateOffers = (isNotNew) => {
  const offers = isNotNew && getSomeArrayValues(OffersList) || [];
  return {
    offers,
  };
};

// type: string
// offers: array of shape {title: string, expense: number, isChecked: bool}

const generateRoute = (isNotNew) => {
  const place = getRandomPlace(isNotNew);
  const placeDescription = getPlaceDescription(place, isNotNew);
  const placePhotos = getPlacePhotos(isNotNew);
  return {
    place,
    placeDescription,
    placePhotos,
  };
};

// place: string
// placeDescription: string
// placePhotos: array of string

const generatePoint = (isNotNew = true) => {
  const id = getID();
  const type = getRamdomType(isNotNew);
  const offers = generateOffers(isNotNew);
  const {place, placeDescription, placePhotos} = generateRoute(isNotNew);
  const {timeStart, timeEnd} = generateDate(isNotNew);
  const price = getPointPrice(isNotNew);
  const isFavorite = getFavoriteStatus(isNotNew);
  return {
    id,
    type,
    offers,
    place,
    placeDescription,
    placePhotos,
    timeStart,
    timeEnd,
    price,
    isFavorite,
  };
};

// id: string
// type: string
// offers: array of shape {title: string, expense: number, isChecked: bool}
// place: string
// placeDescription: string
// placePhotos: array of string
// timeStart: object of Date
// timeEnd: object of Date
// price: number
// isFavorite: bool

export const getPoints = () => new Array(CHANCE_EVENTS_COUNT).fill().map(generatePoint);
