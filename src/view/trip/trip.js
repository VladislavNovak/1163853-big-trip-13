import {createElement} from "../../utils/render";
import {createTripTemplate} from "./templates/create-trip-template";

export default class Trip {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
