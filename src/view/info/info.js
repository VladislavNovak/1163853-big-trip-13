import Abstract from '../abstract';
import {createInfoTemplate} from './templates/create-info-template';

export default class Info extends Abstract {
  constructor(isDataExist, total, ellipse, firstFormattedDate, lastFormattedDate) {
    super();
    this._isDataExist = isDataExist;
    this._total = total;
    this._ellipse = ellipse;
    this._firstFormattedDate = firstFormattedDate;
    this._lastFormattedDate = lastFormattedDate;
  }

  getTemplate() {
    return createInfoTemplate(this._isDataExist, this._total, this._ellipse, this._firstFormattedDate, this._lastFormattedDate);
  }
}
