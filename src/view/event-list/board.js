import {createElement} from "../../utils/render";
import {createBoard} from "./templates/create-board";

export default class Board {
  constructor(dataLength) {
    this._dataLength = dataLength;
    this._element = null;
  }

  getTemplate() {
    return createBoard(this._dataLength);
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
