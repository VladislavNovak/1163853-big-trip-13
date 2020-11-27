import {createElement} from "../../utils/render";
import {createEventTemplate} from "./templates/create-event-template";

export default class Event {
  constructor({timeStart, timeEnd, type, place, price, isFavorite, offers}) {
    [this._timeStart, this._timeEnd, this._type, this._place, this._price, this._isFavorite, this._offers] = [timeStart, timeEnd, type, place, price, isFavorite, offers];
    this._element = null;
  }

  getTemplate() {
    return createEventTemplate(this._timeStart, this._timeEnd, this._type, this._place, this._price, this._isFavorite, this._offers);
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
