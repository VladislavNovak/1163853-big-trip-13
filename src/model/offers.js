import {capitalizeFirstLetter} from "../utils";

export default class Offers {
  constructor() {
    this._offers = null;
  }

  setOffers(offers) {
    this._offers = offers.slice();
  }

  getOffers() {
    return this._offers;
  }

  static adaptToClient(data) {
    return {
      type: capitalizeFirstLetter(data.type),
      offers: data.offers.map(({title, price}) => ({
        title,
        expense: price
      })),
    };
  }
}
