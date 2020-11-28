import {createElement} from "../../utils/render";
import {createEventEditTemplate} from "./templates/create-event-edit-template";

export default class EventEdit {
  constructor(point, isEditMode = true) {
    const {type, place, offers, placeDescription, placePhotos, timeStart, timeEnd} = point;

    [this._type,
      this._place,
      this._offers,
      this._placeDescription,
      this._placePhotos,
      this._timeStart,
      this._timeEnd] = [type, place, offers, placeDescription, placePhotos, timeStart, timeEnd];

    this._isEditMode = isEditMode;
    this._element = null;
  }

  getTemplate() {
    return createEventEditTemplate(this._type, this._place, this._offers, this._placeDescription, this._placePhotos, this._timeStart, this._timeEnd, this._isEditMode);
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
