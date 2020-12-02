import {createElement} from '../../utils/render';
import {createInfoTemplate} from './templates/create-info-template';

export default class Info {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createInfoTemplate(this._points);
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
