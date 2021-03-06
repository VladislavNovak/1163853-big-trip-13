import {batchBind} from '../../utils';
import Abstract from '../abstract';
import {createEventTemplate} from './templates/create-event-template';

export default class Event extends Abstract {
  constructor(point) {
    super();
    this._point = point;

    batchBind(
        this,
        this._rollupButtonClickHandler,
        this._favoriteButtonClickHandler
    );
  }

  getTemplate() {
    return createEventTemplate(this._point);
  }

  _rollupButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.onRollupButtonClick();
  }

  _favoriteButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.onFavoriteButtonClick();
  }

  rollupButtonClick(callback) {
    this._callback.onRollupButtonClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, this._rollupButtonClickHandler);
  }

  favoriteButtonClick(callback) {
    this._callback.onFavoriteButtonClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, this._favoriteButtonClickHandler);
  }
}
