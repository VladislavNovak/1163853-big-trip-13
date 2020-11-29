import {createElement} from "../../utils/render";
import {createSortTemplate} from "./templates/create-sort-template";

export default class Sort {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createSortTemplate(this._points);
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
