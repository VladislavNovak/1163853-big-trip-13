import {createElement} from "../../utils/render";
import {createEventEditTemplate} from "./templates/create-event-edit-template";

export default class EventEdit {
  constructor({type, place, offers, placeDescription, placePhotos, timeStart, timeEnd}) {
    [this._type, this._place, this._offers, this._placeDescription, this._placePhotos, this._timeStart, this._timeEnd] = [type, place, offers, placeDescription, placePhotos, timeStart, timeEnd];
    this._element = null;
  }

  getTemplate() {
    return createEventEditTemplate(this._type, this._place, this._offers, this._placeDescription, this._placePhotos, this._timeStart, this._timeEnd);
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
