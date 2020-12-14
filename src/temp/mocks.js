import {CHANCE_EVENTS_COUNT, emptyDestination, Destinations, GenerateMode, OffersList} from './mock-constants';
import {getID, getRandomInteger, getSomeOffers} from '../utils';
import {getRamdomType, generateDate, getPointPrice, getFavoriteStatus} from './mock-service';

const generateOffers = (mode) => {
  const offers = (mode === GenerateMode.AS_EDIT_MODE) ? getSomeOffers(OffersList) : [];
  return {
    offers,
  };
};

// offers: array of shape {title: string, expense: number, isChecked: bool}

const generateDestination = (mode) => {
  const {place, placeDescription, placePhotos} = {
    [GenerateMode.AS_EDIT_MODE]: Destinations[getRandomInteger(0, Destinations.length - 1)],
    [GenerateMode.AS_NEW_COMPONENT]: emptyDestination,
  }[mode];

  return {
    place,
    placeDescription,
    placePhotos,
  };
};

// place: string
// placeDescription: string
// placePhotos: array of string

const generatePoint = (mode) => {
  const id = getID();
  const type = getRamdomType(mode);
  const {offers} = generateOffers(mode);
  const {place, placeDescription, placePhotos} = generateDestination(mode);
  const {timeStart, timeEnd} = generateDate(mode);
  const price = getPointPrice(mode);
  const isFavorite = getFavoriteStatus(mode);
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

export const getPoints = () => new Array(CHANCE_EVENTS_COUNT).fill().map(() => generatePoint(GenerateMode.AS_EDIT_MODE));
export const getBlankPoint = () => generatePoint(GenerateMode.AS_NEW_COMPONENT);
