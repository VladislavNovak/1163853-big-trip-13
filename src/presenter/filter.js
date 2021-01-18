import {batchBind} from '../utils';
import {FilterTypes, UpdateType} from '../utils/constants';
import {filter} from '../utils/filter';
import {remove, render, replace} from '../utils/render';

import FiltersView from '../view/filters/filters';

export default class Filter {
  constructor(filterContainer, eventsModel, filterModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._eventsModel = eventsModel;

    this._eventsExistenceIdentifier = {};

    this._currentFilter = null;

    this._filterComponent = null;

    batchBind(
        this,
        this._handleModelEvent,
        this._handleFilterTypeChange
    );

    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();
    const prevFilterComponent = this._filterComponent;
    const points = this._eventsModel.getEvents();

    this._eventsExistenceIdentifier[FilterTypes.EVERYTHING] = Boolean(points.length);
    this._eventsExistenceIdentifier[FilterTypes.PAST] = Boolean(filter[FilterTypes.PAST](points).length);
    this._eventsExistenceIdentifier[FilterTypes.FUTURE] = Boolean(filter[FilterTypes.FUTURE](points).length);

    this._filterComponent = new FiltersView(this._currentFilter, this._eventsExistenceIdentifier);
    this._filterComponent.filterChange(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }
}

// _handleModelEvent: единственной задачей будет перерисовка всего фильтра
// this._eventsExistenceIdentifier понадобится в view/Filter для disabled/подключения конкретного фильтра
