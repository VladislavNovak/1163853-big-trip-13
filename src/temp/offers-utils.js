import {Proffers, RouteTypes} from "./constants";

const offersList = [
  {title: Proffers.ADD_BREAKFAST, expense: 50, isChecked: Math.random() > 0.5},
  {title: Proffers.ADD_LUGGAGE, expense: 30, isChecked: Math.random() > 0.5},
  {title: Proffers.ADD_MEAL, expense: 15, isChecked: Math.random() > 0.5},
  {title: Proffers.BOOK_TICKETS, expense: 40, isChecked: Math.random() > 0.5},
  {title: Proffers.CHOOSE_SEATS, expense: 5, isChecked: Math.random() > 0.5},
  {title: Proffers.LUNCH_IN_CITY, expense: 25, isChecked: Math.random() > 0.5},
  {title: Proffers.MUSICAL_ACCOMPANIMENT, expense: 25, isChecked: Math.random() > 0.5},
  {title: Proffers.ORDER_UBER, expense: 20, isChecked: Math.random() > 0.5},
  {title: Proffers.RENT_A_CAR, expense: 200, isChecked: Math.random() > 0.5},
  {title: Proffers.TRAVEL_BY_TRAIN, expense: 40, isChecked: Math.random() > 0.5},
  {title: Proffers.IMPROVE_CLASS, expense: 100, isChecked: Math.random() > 0.5},
  {title: Proffers.ARCHERY_EXCURSION, expense: 85, isChecked: Math.random() > 0.5},
  {title: Proffers.ORDER_THE_GUIDE, expense: 85, isChecked: Math.random() > 0.5},
];

const getOffersList = (...offersCollection) => offersList.filter(({title}) => offersCollection.includes(title));

export const getOffers = (routeType) => {
  const offers = new Map([
    [RouteTypes.TAXI, getOffersList(Proffers.CHOOSE_SEATS, Proffers.ORDER_UBER)],
    [RouteTypes.BUS, getOffersList(Proffers.LUNCH_IN_CITY, Proffers.IMPROVE_CLASS)],
    [RouteTypes.TRAIN, getOffersList(Proffers.BOOK_TICKETS, Proffers.IMPROVE_CLASS)],
    [RouteTypes.SHIP, getOffersList(Proffers.ADD_MEAL, Proffers.IMPROVE_CLASS, Proffers.ARCHERY_EXCURSION)],
    [RouteTypes.TRANSPORT, getOffersList(Proffers.TRAVEL_BY_TRAIN)],
    [RouteTypes.DRIVE, getOffersList(Proffers.RENT_A_CAR, Proffers.TRAVEL_BY_TRAIN)],
    [RouteTypes.FLIGHT, getOffersList(Proffers.ADD_BREAKFAST, Proffers.ADD_LUGGAGE, Proffers.ADD_MEAL, Proffers.BOOK_TICKETS)],
    [RouteTypes.CHECKIN, getOffersList(Proffers.ADD_BREAKFAST)],
    [RouteTypes.SIGHTSEEING, getOffersList(Proffers.LUNCH_IN_CITY, Proffers.ARCHERY_EXCURSION, Proffers.ORDER_THE_GUIDE)],
    [RouteTypes.RESTAURANT, getOffersList(Proffers.MUSICAL_ACCOMPANIMENT, Proffers.ORDER_UBER, Proffers.IMPROVE_CLASS)]
  ]);

  return offers.get(routeType);
};
