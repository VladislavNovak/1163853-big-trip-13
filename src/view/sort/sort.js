import {createElement} from "../../utils/render";
import {createSortTemplate} from "./templates/create-sort-template";

export default class Sort {
  constructor(dataLength) {
    this._dataLength = dataLength;
    this._element = null;
  }

  getTemplate() {
    return createSortTemplate(this._dataLength);
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
