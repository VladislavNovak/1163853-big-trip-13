import Abstract from '../abstract';
import {createInfoTemplate} from './templates/create-info-template';

export default class Info extends Abstract {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createInfoTemplate(this._points);
  }
}
