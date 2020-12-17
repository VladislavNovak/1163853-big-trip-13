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
}
