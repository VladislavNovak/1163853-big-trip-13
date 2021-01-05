import {FormatTypes} from '../../utils/constants';
import {getEllipseString, getFormattedDate} from '../../utils';

import Abstract from '../abstract';
import {createInfoTemplate} from './templates/create-info-template';

export default class Info extends Abstract {
  constructor(eventsModel) {
    super();
    this._events = eventsModel.getEvents();
    this._isExist = this._events.length;
    this._total = this._isExist ? this._events.map(({price}) => price).reduce((start, value) => start + value, 0) : 0;
    this._ellipse = this._isExist ? getEllipseString(this._events.map(({place}) => place)) : ``;
    this._firstFormattedDate = this._isExist ? getFormattedDate(this._events[0].timeStart, FormatTypes.MONTHS) : ``;
    this._lastFormattedDate = this._isExist ? getFormattedDate(this._events[this._events.length - 1].timeEnd, FormatTypes.MONTHS) : ``;
  }

  getTemplate() {
    return createInfoTemplate(this._isExist, this._total, this._ellipse, this._firstFormattedDate, this._lastFormattedDate);
  }
}
