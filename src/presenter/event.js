import {render, replace} from "../utils/render";

import {
  EventEditView,
  EventView,
} from "../view";

export default class Event {
  constructor(timetableContainer) {
    this._timetableContainer = timetableContainer;

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._handlEventRollupClick = this._handlEventRollupClick.bind(this);
    this._handlEventEditRollupClick = this._handlEventEditRollupClick.bind(this);
    this._handlEventEditResetClick = this._handlEventEditResetClick.bind(this);
    this._handlEventEditFormSubmit = this._handlEventEditFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(point) {
    this._point = point;

    this._eventComponent = new EventView(point);
    this._eventEditComponent = new EventEditView(point);

    this._eventComponent.rollupButtonClick(this._handlEventRollupClick);
    this._eventEditComponent.rollupButtonClick(this._handlEventEditRollupClick);
    this._eventEditComponent.resetButtonClick(this._handlEventEditResetClick);
    this._eventEditComponent.formSubmit(this._handlEventEditFormSubmit);

    render(this._timetableContainer, this._eventComponent);
  }

  _setEditMode() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _setViewMode() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _formSubmitDummy({type, submitter}) {
    throw new Error(`Need to implement a handler ${type} in "${submitter.className}"`);
  }

  _handlEventRollupClick() {
    this._setEditMode();
  }

  _handlEventEditRollupClick() {
    this._setViewMode();
  }

  _handlEventEditResetClick() {
    this._setViewMode();
  }

  _handlEventEditFormSubmit(evt) {
    this._formSubmitDummy(evt);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._setViewMode();
    }
  }
}
