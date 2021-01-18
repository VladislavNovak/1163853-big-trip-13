import Abstract from '../abstract';
import {createFiltersTemplate} from './templates/create-filters-template';

export default class Filters extends Abstract {
  constructor(activeFilter, eventsExistenceIdentifier) {
    super();

    this._activeFilter = activeFilter;
    this._eventsExistenceIdentifier = eventsExistenceIdentifier;

    this._filterChangeHandler = this._filterChangeHandler.bind(this);
  }

  getTemplate() {
    return createFiltersTemplate(this._activeFilter, this._eventsExistenceIdentifier);
  }

  _filterChangeHandler({target}) {
    if (!target.matches(`INPUT`)) {
      return;
    }

    this._callback.onFilterChange(target.value);
  }

  filterChange(callback) {
    this._callback.onFilterChange = callback;
    this.getElement().addEventListener(`change`, this._filterChangeHandler);
  }
}
