import {createElement} from "../../utils/render";
import {createEventTemplate} from "./templates/create-event-template";

export default class Event {
  constructor(point) {

    this._point = point;

    this._element = null;
  }

  getTemplate() {
    return createEventTemplate(this._point);
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
