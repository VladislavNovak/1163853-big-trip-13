import {routeTypes} from "./constants";
import {getRandomInteger} from "./utils";

const offersList = [
  {title: `Add breakfast`, expense: 50, isChecked: Boolean(getRandomInteger())},
  {title: `Add luggage`, expense: 30, isChecked: Boolean(getRandomInteger())},
  {title: `Add meal`, expense: 15, isChecked: Boolean(getRandomInteger())},
  {title: `Book tickets`, expense: 40, isChecked: Boolean(getRandomInteger())},
  {title: `Choose seats`, expense: 5, isChecked: Boolean(getRandomInteger())},
  {title: `Lunch in city`, expense: 25, isChecked: Boolean(getRandomInteger())},
  {title: `Musical accompaniment`, expense: 25, isChecked: Boolean(getRandomInteger())},
  {title: `Order Uber`, expense: 20, isChecked: Boolean(getRandomInteger())},
  {title: `Rent a car`, expense: 200, isChecked: Boolean(getRandomInteger())},
  {title: `Travel by train`, expense: 40, isChecked: Boolean(getRandomInteger())},
  {title: `Improve class`, expense: 100, isChecked: Boolean(getRandomInteger())},
  {title: `Archery excursion`, expense: 85, isChecked: Boolean(getRandomInteger())},
  {title: `Order the guide`, expense: 85, isChecked: Boolean(getRandomInteger())},
];

const getCollectionOfOffers = (...offersCollection) => offersList.filter((_, index) => offersCollection.includes(index));

export const mapOfOffersByRouteTypes = [
  [routeTypes[0], getCollectionOfOffers(4, 7)],
  [routeTypes[1], getCollectionOfOffers(5, 10)],
  [routeTypes[2], getCollectionOfOffers(3, 10)],
  [routeTypes[3], getCollectionOfOffers(2, 10, 11)],
  [routeTypes[4], getCollectionOfOffers(9)],
  [routeTypes[5], getCollectionOfOffers(8, 9)],
  [routeTypes[6], getCollectionOfOffers(0, 1, 2, 3)],
  [routeTypes[7], getCollectionOfOffers(0)],
  [routeTypes[8], getCollectionOfOffers(5, 11, 12)],
  [routeTypes[9], getCollectionOfOffers(6, 7, 10)]
];

export const getRelatedOffers = (routeType) => mapOfOffersByRouteTypes.find((item) => item[0] === routeType)[1];
