import {routeTypes} from "./constants";

const offersList = [
  {title: `Add breakfast`, price: 50, isChecked: false},
  {title: `Add luggage`, price: 30, isChecked: false},
  {title: `Add meal`, price: 15, isChecked: false},
  {title: `Book tickets`, price: 40, isChecked: false},
  {title: `Choose seats`, price: 5, isChecked: false},
  {title: `Lunch in city`, price: 25, isChecked: false},
  {title: `Musical accompaniment`, price: 25, isChecked: false},
  {title: `Order Uber`, price: 20, isChecked: false},
  {title: `Rent a car`, price: 200, isChecked: false},
  {title: `Travel by train`, price: 40, isChecked: false},
  {title: `Improve class`, price: 100, isChecked: false},
  {title: `Archery excursion`, price: 85, isChecked: false},
  {title: `Order the guide`, price: 85, isChecked: false},
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
