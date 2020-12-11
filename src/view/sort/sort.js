import {SortTypes} from '../../utils/constants';
import Abstract from '../abstract';
import {createSortTemplate} from './templates/create-sort-template';

export default class Sort extends Abstract {
  constructor() {
    super();

    this._activeSort = SortTypes.SORT_DAY;
    this._prevActiveSort = SortTypes.SORT_DAY;

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

    if (this._activeSort === this._prevActiveSort) {
      return;
    }

    this._prevActiveSort = this._activeSort;
    this._callback.onSortClick(this._activeSort);
  }

  sortClick(callback) {
    this._callback.onSortClick = callback;
    this.getElement()
      .addEventListener(`click`, this._sortClickHandler);
  }
}
