import Abstract from '../abstract';
import {createSortTemplate} from './templates/create-sort-template';

export default class Sort extends Abstract {
  constructor(activeSort) {
    super();

    this._activeSort = activeSort;

    this._sortClickHandler = this._sortClickHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate(this._activeSort);
  }

  _sortClickHandler({target}) {
    if (!target.matches(`INPUT`)) {
      return;
    }

    this._activeSort = target.value;
    this._callback.onSortClick(this._activeSort);
  }

  sortClick(callback) {
    this._callback.onSortClick = callback;
    this.getElement()
      .addEventListener(`click`, this._sortClickHandler);
  }
}
