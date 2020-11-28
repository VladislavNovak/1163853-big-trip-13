import {IS_NEW_MODE} from "../utils/constants";
import {CHANCE_EVENTS_COUNT, OffersList} from "./mock-constants";
import {getID, getSomeArrayValues} from "../utils";
import {getRamdomType, generateDate, getPlacePhotos, getRandomPlace, getPlaceDescription, getPointPrice, getFavoriteStatus} from "./mock-service";

const generateOffers = (isEditMode) => {
  const offers = isEditMode && getSomeArrayValues(OffersList) || [];
  return {
    offers,
  };
};

// type: string
// offers: array of shape {title: string, expense: number, isChecked: bool}

const generateRoute = (isEditMode) => {
  const place = getRandomPlace(isEditMode);
  const placeDescription = getPlaceDescription(place, isEditMode);
  const placePhotos = getPlacePhotos(isEditMode);
  return {
    place,
    placeDescription,
    placePhotos,
  };
};

// place: string
// placeDescription: string
// placePhotos: array of string

const generatePoint = (isEditMode = true) => {
  const id = getID();
  const type = getRamdomType(isEditMode);
  const {offers} = generateOffers(isEditMode);
  const {place, placeDescription, placePhotos} = generateRoute(isEditMode);
  const {timeStart, timeEnd} = generateDate(isEditMode);
  const price = getPointPrice(isEditMode);
  const isFavorite = getFavoriteStatus(isEditMode);
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
export const getBlankPoint = () => generatePoint(IS_NEW_MODE);
