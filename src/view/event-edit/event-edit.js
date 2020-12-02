import {createElement} from '../../utils/render';
import {createEventEditTemplate} from './templates/create-event-edit-template';

export default class EventEdit {
  constructor(point, isEditMode = true) {
    this._point = point;

    this._isEditMode = isEditMode;
    this._element = null;
  }

  getTemplate() {
    return createEventEditTemplate(this._point, this._isEditMode);
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
