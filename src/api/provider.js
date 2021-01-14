import {StoredType} from './constants';
import {isOnline} from '../utils/';
import {DestinationsModel, EventsModel, OffersModel} from '../model/';
import {createStoreStructure, getSyncedPoints} from './utils';

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getPoints() {
    if (isOnline()) {
      return this._api.getPoints()
        .then((points) => {
          const items = createStoreStructure(points.map(EventsModel.adaptToServer));
          this._store.setItems(StoredType.POINT, items);
          return points;
        });
    }

    const storePoints = Object.values(this._store.getItems(StoredType.POINT));

    return Promise.resolve(storePoints.map(EventsModel.adaptToClient));
  }

  getOffers() {
    if (isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          this._store.setItems(StoredType.OFFER, offers);
          return offers;
        });
    }

    const storeOffers = Object.values(this._store.getItems(StoredType.OFFER));

    return Promise.resolve(storeOffers.map(OffersModel.adaptToClient));
  }

  getDestinations() {
    if (isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          this._store.setItems(StoredType.DESTINATION, destinations);
          return destinations;
        });
    }

    const storePoints = Object.values(this._store.getItems(StoredType.DESTINATION));

    return Promise.resolve(storePoints.map(DestinationsModel.adaptToClient));
  }

  updatePoints(point) {
    if (isOnline()) {
      return this._api.updatePoints(point)
        .then((updatedPoint) => {
          this._store.setItem(StoredType.POINT, updatedPoint.id, EventsModel.adaptToServer(updatedPoint));
          return updatedPoint;
        });
    }

    this._store.setItem(StoredType.POINT, point.id, EventsModel.adaptToServer(Object.assign({}, point)));

    return Promise.resolve(point);
  }

  addPoint(point) {
    if (isOnline()) {
      return this._api.addPoint(point)
        .then((newPoint) => {
          this._store.setItem(StoredType.POINT, newPoint.id, EventsModel.adaptToServer(newPoint));
          return newPoint;
        });
    }

    return Promise.reject(new Error(`Add point failed`));
  }

  deletePoint(point) {
    if (isOnline()) {
      return this._api.deletePoint(point)
        .then(() => this._store.removeItem(StoredType.POINT, point.id));
    }

    return Promise.reject(new Error(`Delete point failed`));
  }

  sync() {
    if (isOnline()) {
      const storePoints = Object.values(this._store.getItems());

      return this._api.sync(storePoints)
        .then((response) => {
          // Забираем из ответа синхронизированные задачи
          const createdPoints = getSyncedPoints(response.created);
          const updatedPoints = getSyncedPoints(response.updated);

          // Добавляем синхронизированные задачи в хранилище.
          // Хранилище должно быть актуальным в любой момент.
          const items = createStoreStructure([...createdPoints, ...updatedPoints]);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }
}
