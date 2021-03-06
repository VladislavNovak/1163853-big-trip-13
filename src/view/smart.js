import {assign} from '../utils';
import Abstract from './abstract';

export default class Smart extends Abstract {
  constructor() {
    super();
    this._point = {};
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._point = assign(this._point, update);

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;

    if (!parent) {
      return;
    }

    this.removeElement();

    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);
    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: resetHandlers`);
  }
}
