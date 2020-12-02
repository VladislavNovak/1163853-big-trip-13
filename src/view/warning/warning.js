import {createElement} from '../../utils/render';
import {createWarningTemplate} from './templates/create-warning-template';

export default class Warning {
  constructor(warning) {
    this._warning = warning;
    this._element = null;
  }

  getTemplate() {
    return createWarningTemplate(this._warning);
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
