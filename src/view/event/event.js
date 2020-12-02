import Abstract from '../abstract';
import {createEventTemplate} from './templates/create-event-template';

export default class Event extends Abstract {
  constructor(point) {
    super();
    this._point = point;
  }

  getTemplate() {
    return createEventTemplate(this._point);
  }
}
