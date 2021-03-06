import dayjs from 'dayjs';
import {SortTypes, State, UpdateType, UserAction, WarningMsg} from '../utils/constants';
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
  constructor(tripContainer, eventsModel, filterModel, offersModel, destinationsModel, api) {
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._api = api;
    this._tripContainer = tripContainer;
    this._eventPresenter = {};
    this._currentSortType = SortTypes.SORT_DAY;
    this._isLoading = true;

    this._tripComponent = new TripView();
    this._sortComponent = null;
    this._routeComponent = new RouteView();
    this._warningComponent = new WarningView();

    batchBind(
        this,
        this._handleViewAction,
        this._handleModelEvent,
        this._handleModeChange,
        this._handleSortTypeChange
    );

    this._blankPresenter = new BlankPresenter(this._routeComponent, this._handleViewAction, this._offersModel, this._destinationsModel);
  }

  init() {
    render(this._tripContainer, this._tripComponent);
    render(this._tripComponent, this._routeComponent);

    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderTrip();
  }

  destroy() {
    this._clearTrip({resetSortType: true});

    remove(this._routeComponent);
    remove(this._tripComponent);

    this._eventsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createEvent(onDestroyBlank) {
    this._blankPresenter.init(onDestroyBlank);
  }

  _getEvents() {
    const filterType = this._filterModel.getFilter();
    const points = this._eventsModel.getEvents();
    const filteredPoints = filter[filterType](points);

    return {
      [SortTypes.SORT_DAY]: () => filteredPoints.sort((a, b) => dayjs(a.timeStart) - dayjs(b.timeStart)),
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
      [UserAction.UPDATE_EVENT]: () => {
        this._eventPresenter[update.id].setViewState(State.SAVING);
        this._api.updatePoints(update)
          .then((response) => {
            this._eventsModel.updateEvent(updateType, response);
          })
          .catch(() => {
            this._eventPresenter[update.id].setViewState(State.ABORTING);
          });
      },
      [UserAction.ADD_EVENT]: () => {
        this._blankPresenter.setSaving();
        this._api.addPoint(update)
          .then((response) => {
            this._eventsModel.addEvent(updateType, response);
          })
          .catch(() => {
            this._blankPresenter.setAborting();
          });
      },
      [UserAction.DELETE_EVENT]: () => {
        this._eventPresenter[update.id].setViewState(State.DELETING);
        this._api.deletePoint(update)
          .then(() => {
            this._eventsModel.deleteEvent(updateType, update);
          })
          .catch(() => {
            this._eventPresenter[update.id].setViewState(State.ABORTING);
          });
      },
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
      [UpdateType.INIT]: () => {
        this._isLoading = false;
        remove(this._warningComponent);
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
    const eventPresenter = new EventPresenter(this._routeComponent, this._handleViewAction, this._handleModeChange, this._offersModel, this._destinationsModel);
    eventPresenter.init(point);
    this._eventPresenter[point.id] = eventPresenter;
  }

  _renderEvents() {
    this._getEvents().forEach((point) => this._renderEvent(point));
  }

  _renderLoading() {
    this._warningComponent.init(WarningMsg.WAITING_FOR_DOWNLOADING);
    render(this._tripComponent, this._warningComponent);
  }

  _renderNoEvents() {
    this._warningComponent.init(WarningMsg.EMPTY_DATA_LIST);
    render(this._tripComponent, this._warningComponent);
  }

  _clearTrip(resetSortType = false) {
    this._blankPresenter.destroy();
    Object.values(this._eventPresenter).forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};

    remove(this._sortComponent);
    if (this._warningComponent) {
      remove(this._warningComponent);
    }

    if (resetSortType) {
      this._currentSortType = SortTypes.SORT_DAY;
    }
  }

  _renderTrip() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

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
