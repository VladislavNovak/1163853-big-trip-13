import {RouteTypes} from "./constants";

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

const getOffersList = (...offersCollection) => offersList.filter((_, index) => offersCollection.includes(index));

export const getOffers = (routeType) => {
  const offers = new Map([
    [RouteTypes.TAXI, getOffersList(4, 7)],
    [RouteTypes.BUS, getOffersList(5, 10)],
    [RouteTypes.TRAIN, getOffersList(3, 10)],
    [RouteTypes.SHIP, getOffersList(2, 10, 11)],
    [RouteTypes.TRANSPORT, getOffersList(9)],
    [RouteTypes.DRIVE, getOffersList(8, 9)],
    [RouteTypes.FLIGHT, getOffersList(0, 1, 2, 3)],
    [RouteTypes.CHECKIN, getOffersList(0)],
    [RouteTypes.SIGHTSEEING, getOffersList(5, 11, 12)],
    [RouteTypes.RESTAURANT, getOffersList(6, 7, 10)]
  ]);

  return offers.get(routeType);
};
