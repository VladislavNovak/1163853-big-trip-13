import Abstract from '../abstract';
import {createWarningTemplate} from './templates/create-warning-template';

export default class Warning extends Abstract {
  constructor(warning) {
    super();
    this._warning = warning;
  }

  getTemplate() {
    return createWarningTemplate(this._warning);
  }
}
