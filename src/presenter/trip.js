import dayjs from 'dayjs';
import {FilterTypes, SortTypes, UpdateType, UserAction, WarningTypes} from '../utils/constants';
import {filter} from '../utils/filter';
import {batchBind} from '../utils';
import {remove, render, RenderPosition} from '../utils/render';

import EventPresenter from './event';
import BlankPresenter from './blank';

import {
  SortView,
  RouteView,
  TripView,
  WarningView,
} from '../view';

export default class Trip {
  constructor(tripContainer, eventsModel, filterModel, offersModel) {
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._offersModel = offersModel;
    this._tripContainer = tripContainer;
    this._eventPresenter = {};
    this._currentSortType = SortTypes.SORT_DAY;

    this._tripComponent = new TripView();
    this._sortComponent = null;
    this._routeComponent = new RouteView();
    this._warningComponent = new WarningView(WarningTypes.EMPTY_DATA_LIST);

    batchBind(
        this,
        this._handleViewAction,
        this._handleModelEvent,
        this._handleModeChange,
        this._handleSortTypeChange
    );

    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._blankPresenter = new BlankPresenter(this._routeComponent, this._handleViewAction, this._offersModel);
  }

  init() {
    render(this._tripContainer, this._tripComponent);
    render(this._tripComponent, this._routeComponent);

    this._renderTrip();
  }

  createEvent() {
    this._currentSortType = SortTypes.SORT_DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterTypes.EVERYTHING);
    this._blankPresenter.init();
  }

  _getEvents() {
    const filterType = this._filterModel.getFilter();
    const points = this._eventsModel.getEvents();
    const filteredPoints = filter[filterType](points);

    return {
      [SortTypes.SORT_DAY]: () => filteredPoints.sort((a, b) => a.timeStart - b.timeStart),
      [SortTypes.SORT_TIME]: () => filteredPoints.sort((a, b) => dayjs(b.timeEnd).diff(b.timeStart) - dayjs(a.timeEnd).diff(a.timeStart)),
      [SortTypes.SORT_PRICE]: () => filteredPoints.sort((a, b) => b.price - a.price),
    }[this._currentSortType]();
  }

  _handleModeChange() {
    this._blankPresenter.destroy();
    Object.values(this._eventPresenter).forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    return {
      [UserAction.UPDATE_EVENT]: () => (this._eventsModel.updateEvent(updateType, update)),
      [UserAction.ADD_EVENT]: () => (this._eventsModel.addEvent(updateType, update)),
      [UserAction.DELETE_EVENT]: () => (this._eventsModel.deleteEvent(updateType, update)),
    }[actionType]();
  }

  _handleModelEvent(updateType, data) {
    return {
      [UpdateType.PATCH]: () => (this._eventPresenter[data.id].init(data)),
      [UpdateType.MINOR]: () => {
        this._clearTrip();
        this._renderTrip();
      },
      [UpdateType.MAJOR]: () => {
        this._clearTrip({resetSortType: true});
        this._renderTrip();
      },
    }[updateType]();
  }

  _handleSortTypeChange(activeSort) {
    if (this._currentSortType === activeSort) {
      return;
    }

    this._currentSortType = activeSort;
    this._clearTrip();
    this._renderTrip();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.sortClick(this._handleSortTypeChange);

    render(this._tripComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEvent(point) {
    const eventPresenter = new EventPresenter(this._routeComponent, this._handleViewAction, this._handleModeChange, this._offersModel);
    eventPresenter.init(point);
    this._eventPresenter[point.id] = eventPresenter;
  }

  _renderEvents() {
    this._getEvents().forEach((point) => this._renderEvent(point));
  }

  _renderNoEvents() {
    render(this._tripComponent, this._warningComponent);
  }

  _clearTrip(resetSortType = false) {
    Object.values(this._eventPresenter).forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};

    remove(this._sortComponent);
    remove(this._warningComponent);

    if (resetSortType) {
      this._currentSortType = SortTypes.SORT_DAY;
    }
  }

  _renderTrip() {
    if (this._getEvents().length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderEvents();
  }
}

// _handleModeChange: будем передавать в каждый эвент-презентер.
// - перебирает список со всеми презентерами и сбрасывает их вид до начального посредством их же метода .resetView

// _handleViewAction: Здесь будем вызывать обновление модели
// передаётся в каждый нужный презентер под наименованием changeData и уже там будет передаваться в необходимый обработчик
// При срабатывании обработчика, данные, например флаг isFavorite, изменятся и будут переданы changeData
// - actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
// - updateType - тип изменений, нужно чтобы понять, что после нужно обновить
// - updateItem - обновленные данные

// _handleModelEvent: обработчик-наблюдатель, который реагирует на изменение модели.
// В зависимости от типа изменений решаем, что делать:
// - обновляет часть списка эвентов. Например, когда поменялось описание.
// - обновляет весь список эвентов. Например, когда удалили/добавили эвент или при переключении фильтра.

// _renderEvent:
// - создаёт новый эвент-презентер;
// - инициализируется;
// - добавляет его в список эвент-презентеров

// _clearRoute:
// - удаляет список всех эвент-презентеров

// _handleSortTypeChange:
// - сортирует данные;
// - очищает поле с эвентами;
// - отрисовывает поле с эвентами;

// _getEvents: обертка над методом модели для получения задач
// - в будущем позволит удобнее получать из модели данные в презенторе
