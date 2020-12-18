import dayjs from 'dayjs';
import {SortTypes, WarningTypes} from "../utils/constants";
// 021 импортировать константу IS_NEW_MODE
import {render} from "../utils/render";
// 022: импортировать функцию getBlankPoint

import EventPresenter from "./event";

import {
  // 023: импортировать компонент
  SortView,
  RouteView,
  TripView,
  WarningView,
} from "../view";

export default class Trip {
  constructor(tripContainer, eventsModel) {
    this._eventsModel = eventsModel;
    this._tripContainer = tripContainer;
    this._eventPresenter = {};
    this._currentSortType = SortTypes.SORT_DAY;

    this._tripComponent = new TripView();
    this._sortComponent = new SortView();
    this._routeComponent = new RouteView();
    this._warningComponent = new WarningView(WarningTypes.EMPTY_DATA_LIST);
    // 024: подключить компонент new

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._eventsModel.addObserver(this._handleModelEvent);
  }

  init() {
    render(this._tripContainer, this._tripComponent);

    this._renderTrip();
  }

  _getEvents() {
    return {
      [SortTypes.SORT_DAY]: () => (this._eventsModel.getEvents().sort((a, b) => a.timeStart - b.timeStart)),
      [SortTypes.SORT_TIME]: () => this._eventsModel.getEvents().sort((a, b) => dayjs(b.timeEnd).diff(b.timeStart) - dayjs(a.timeEnd).diff(a.timeStart)),
      [SortTypes.SORT_PRICE]: () => this._eventsModel.getEvents().sort((a, b) => b.price - a.price),
    }[this._currentSortType]();
  }

  _handleModeChange() {
    Object.values(this._eventPresenter).forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, updatedPoint) {
    console.log(actionType, updateType, updatedPoint);
  }

  _handleModelEvent(updateType, data) {
    console.log(updateType, data);
  }

  _handleSortTypeChange(activeSort) {
    this._currentSortType = activeSort;
    this._clearRoute();
    this._renderRoute();
  }

  _renderSort() {
    render(this._tripComponent, this._sortComponent);
    this._sortComponent.sortClick(this._handleSortTypeChange);
  }

  _renderEvent(point) {
    const eventPresenter = new EventPresenter(this._routeComponent, this._handleViewAction, this._handleModeChange);
    eventPresenter.init(point);
    this._eventPresenter[point.id] = eventPresenter;
  }

  _renderEvents() {
    this._getEvents().forEach((point) => this._renderEvent(point));
  }

  _renderNoEvents() {
    render(this._tripComponent, this._warningComponent);
  }

  _renderNewEvent() {
    // 025: отрисовать компонент new
  }

  _clearRoute() {
    Object.values(this._eventPresenter).forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
  }

  _renderRoute() {
    render(this._tripComponent, this._routeComponent);
    this._renderNewEvent();

    this._renderEvents();
  }

  _renderTrip() {
    if (this._getEvents().length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderRoute();
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

// 021 - import {IS_NEW_MODE} from "../utils/constants";
// 022 - import {getBlankPoint} from "../temp/mocks";
// 023 - EventEditView,
// 024 - this._blankComponent = new EventEditView(getBlankPoint(), IS_NEW_MODE);
// 025 - render(this._routeComponent, this._blankComponent)
