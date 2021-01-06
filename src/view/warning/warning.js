import Abstract from '../abstract';
import {createWarningTemplate} from './templates/create-warning-template';

export default class Warning extends Abstract {
  constructor() {
    super();
    this._warning = null;
  }

  getTemplate() {
    return createWarningTemplate(this._warning);
  }

  init(warning) {
    this._warning = warning;
  }
}
