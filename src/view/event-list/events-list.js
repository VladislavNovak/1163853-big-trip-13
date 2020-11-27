import {createElement} from "../../utils/render";
import {createEventsList} from "./templates/create-events-list";

export default class EventsList {
  constructor(dataLength) {
    this._dataLength = dataLength;
    this._element = null;
  }

  getTemplate() {
    return createEventsList(this._dataLength);
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
