import {ROUTE_TYPES} from "./constants";

const offersList = [
  {title: `Add breakfast`, expense: 50, isChecked: Math.random() > 0.5},
  {title: `Add luggage`, expense: 30, isChecked: Math.random() > 0.5},
  {title: `Add meal`, expense: 15, isChecked: Math.random() > 0.5},
  {title: `Book tickets`, expense: 40, isChecked: Math.random() > 0.5},
  {title: `Choose seats`, expense: 5, isChecked: Math.random() > 0.5},
  {title: `Lunch in city`, expense: 25, isChecked: Math.random() > 0.5},
  {title: `Musical accompaniment`, expense: 25, isChecked: Math.random() > 0.5},
  {title: `Order Uber`, expense: 20, isChecked: Math.random() > 0.5},
  {title: `Rent a car`, expense: 200, isChecked: Math.random() > 0.5},
  {title: `Travel by train`, expense: 40, isChecked: Math.random() > 0.5},
  {title: `Improve class`, expense: 100, isChecked: Math.random() > 0.5},
  {title: `Archery excursion`, expense: 85, isChecked: Math.random() > 0.5},
  {title: `Order the guide`, expense: 85, isChecked: Math.random() > 0.5},
];

const getCollectionOfOffers = (...offersCollection) => offersList.filter((_, index) => offersCollection.includes(index));

export const mapOfOffersByRouteTypes = [
  [ROUTE_TYPES[0], getCollectionOfOffers(4, 7)],
  [ROUTE_TYPES[1], getCollectionOfOffers(5, 10)],
  [ROUTE_TYPES[2], getCollectionOfOffers(3, 10)],
  [ROUTE_TYPES[3], getCollectionOfOffers(2, 10, 11)],
  [ROUTE_TYPES[4], getCollectionOfOffers(9)],
  [ROUTE_TYPES[5], getCollectionOfOffers(8, 9)],
  [ROUTE_TYPES[6], getCollectionOfOffers(0, 1, 2, 3)],
  [ROUTE_TYPES[7], getCollectionOfOffers(0)],
  [ROUTE_TYPES[8], getCollectionOfOffers(5, 11, 12)],
  [ROUTE_TYPES[9], getCollectionOfOffers(6, 7, 10)]
];

export const getRelatedOffers = (routeType) => mapOfOffersByRouteTypes.find((item) => item[0] === routeType)[1];
