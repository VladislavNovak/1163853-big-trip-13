import Observer from "../utils/observer";

export default class Events extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setEvents(points) {
    this._points = points.slice();
  }

  getEvents() {
    return this._points;
  }

  updateEvent(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`an't update unexisting task`);
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addEvent(updateType, update) {
    this._poitns = [
      update,
      ...this._points
    ];

    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`an't update unexisting task`);
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType);
  }
}
