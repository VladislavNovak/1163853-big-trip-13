export default class Destinations {
  constructor() {
    this._destinations = null;
  }

  setDestinations(destinations) {
    this._destinations = destinations.slice();
  }

  getDestinations() {
    return this._destinations;
  }
}
