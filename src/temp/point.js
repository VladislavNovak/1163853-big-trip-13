import {CHANCE_EVENTS_COUNT} from "./constants";
import {ComponentType} from "../utils/constants";
import {getID, getRandomInteger} from "./utils";
import {getRandomIntervalDate, getPlacePhotos, getPlacesDescriptions, getRandomRouteType, getRandomPlace, getCurrentDateForNewPoint, getRouteTypeForNewPoint} from "./point-utils";
import {getOffersByRouteType} from "./offers";

const generatePoint = (isComponentRegular = ComponentType.REGULAR_AND_EDITABLE) => {
  const id = getID();
  const place = isComponentRegular ? getRandomPlace() : ``;
  const placeDescription = isComponentRegular ? getPlacesDescriptions(place) : ``;
  const placePhotos = isComponentRegular ? getPlacePhotos() : ``;
  const {timeStart, timeEnd} = isComponentRegular ? getRandomIntervalDate() : getCurrentDateForNewPoint();
  const price = isComponentRegular ? getRandomInteger(100, 1000) : 0;
  const isFavorite = isComponentRegular ? Boolean(getRandomInteger()) : false;
  const type = isComponentRegular ? getRandomRouteType() : getRouteTypeForNewPoint();
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

export const points = new Array(CHANCE_EVENTS_COUNT).fill().map(generatePoint);

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
