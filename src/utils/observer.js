export default class Observer {
  constructor() {
    this._subscribers = [];
  }

  addObserver(newObserver) {
    this._subscribers.push(newObserver);
  }

  removeObserver(removeSubscriber) {
    this._subscribers = this._subscribers.filter((subscriber) => subscriber !== removeSubscriber);
  }

  _notify(event, payload) {
    this._subscribers.forEach((subscriber) => subscriber(event, payload));
  }
}
