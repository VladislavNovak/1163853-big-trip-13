import {capitalizeFirstLetter} from '../utils';
import Observer from '../utils/observer';

export default class Events extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setEvents(updateType, points) {
    this._points = points.slice();

    this._notify(updateType);
  }

  getEvents() {
    return this._points;
  }

  updateEvent(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`an't update unexisting event`);
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addEvent(updateType, update) {
    this._points = [
      update,
      ...this._points
    ];

    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`an't update unexisting event`);
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToServer({id, type, placePhotos, place, placeDescription, timeStart, timeEnd, price, offers, isFavorite}) {
    return {
      id,
      type: type.toLowerCase(),
      [`date_from`]: timeStart,
      [`date_to`]: timeEnd,
      destination: {
        name: place,
        description: placeDescription,
        pictures: placePhotos,
      },
      [`base_price`]: price,
      [`is_favorite`]: isFavorite,
      offers: offers.map(({title, expense, isChecked}) => ({
        title,
        price: expense,
        [`is_checked`]: isChecked
      })),
    };
  }

  static adaptToClient(data) {
    return {
      id: data.id,
      type: capitalizeFirstLetter(data.type),
      timeStart: data[`date_from`],
      timeEnd: data[`date_to`],
      place: data.destination.name,
      placeDescription: data.destination.description,
      placePhotos: data.destination.pictures,
      price: data[`base_price`],
      isFavorite: data[`is_favorite`],
      offers: data.offers.map((offer) => ({
        title: offer.title,
        expense: offer.price,
        isChecked: offer[`is_checked`] && true || false
      }))
    };
  }
}
