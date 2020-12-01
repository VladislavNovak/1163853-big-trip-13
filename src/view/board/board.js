import {createElement} from "../../utils/render";
import {createBoard} from "./templates/create-board";

export default class Board {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createBoard(this._points);
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

