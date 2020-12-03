import Abstract from '../abstract';
import {createEventTemplate} from './templates/create-event-template';

export default class Event extends Abstract {
  constructor(point) {
    super();
    this._point = point;

    this._rollupButtonClickHandler = this._rollupButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createEventTemplate(this._point);
  }

  _rollupButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.onRollupButtonClick();
  }

  rollupButtonClick(callback) {
    this._callback.onRollupButtonClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._rollupButtonClickHandler);
  }
}
