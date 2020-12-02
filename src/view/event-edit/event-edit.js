import Abstract from '../abstract';
import {createEventEditTemplate} from './templates/create-event-edit-template';

export default class EventEdit extends Abstract {
  constructor(point, isEditMode = true) {
    super();
    this._point = point;

    this._isEditMode = isEditMode;
  }

  getTemplate() {
    return createEventEditTemplate(this._point, this._isEditMode);
  }
}
