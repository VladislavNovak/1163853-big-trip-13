import Abstract from '../abstract';
import {createEventEditTemplate} from './templates/create-event-edit-template';

export default class EventEdit extends Abstract {
  constructor(point, isEditMode = true) {
    super();
    this._point = point;

    this._isEditMode = isEditMode;

    this._rollupButtonClickHandler = this._rollupButtonClickHandler.bind(this);
    this._resetButtonClickHandler = this._resetButtonClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  getTemplate() {
    return createEventEditTemplate(this._point, this._isEditMode);
  }

  _rollupButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.onRollupButtonClick();
  }

  _resetButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.onResetButtonClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.onFormSubmit(evt);
  }

  rollupButtonClick(callback) {
    this._callback.onRollupButtonClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, this._rollupButtonClickHandler);
  }

  resetButtonClick(callback) {
    this._callback.onResetButtonClick = callback;
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, this._resetButtonClickHandler);
  }

  formSubmit(callback) {
    this._callback.onFormSubmit = callback;
    this.getElement().querySelector(`form`)
      .addEventListener(`submit`, this._formSubmitHandler);
  }
}
