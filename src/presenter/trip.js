import dayjs from 'dayjs';
import {SortTypes, WarningTypes} from "../utils/constants";
// 021 импортировать константу IS_NEW_MODE
import {updateItem} from "../utils/";
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

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(points) {
    points.sort((a, b) => a.timeStart - b.timeStart);

    this._points = points.slice();
    this._clonedPoints = this._points.slice();

    render(this._tripContainer, this._tripComponent);

    this._renderTrip();
  }

  _getEvents() {
    return this._eventsModel.getEvents();
  }

  _handleModeChange() {
    Object.values(this._eventPresenter).forEach((presenter) => presenter.resetView());
  }

  _handleEventChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._eventPresenter[updatedPoint.id].init(updatedPoint);
  }

  _sortPoints(activeSort) {
    this._currentSortType = activeSort;

    return {
      [SortTypes.SORT_DAY]: () => (this._points = this._clonedPoints.slice()),
      [SortTypes.SORT_TIME]: () => this._points.sort((a, b) => dayjs(b.timeEnd).diff(b.timeStart) - dayjs(a.timeEnd).diff(a.timeStart)),
      [SortTypes.SORT_PRICE]: () => this._points.sort((a, b) => b.price - a.price),
    }[activeSort]();
  }

  _handleSortTypeChange(activeSort) {
    this._sortPoints(activeSort);
    this._clearRoute();
    this._renderRoute();
  }

  _renderSort() {
    render(this._tripComponent, this._sortComponent);
    this._sortComponent.sortClick(this._handleSortTypeChange);
  }

  _renderEvent(point) {
    const eventPresenter = new EventPresenter(this._routeComponent, this._handleEventChange, this._handleModeChange);
    eventPresenter.init(point);
    this._eventPresenter[point.id] = eventPresenter;
  }

  _renderEvents() {
    this._points.forEach((point) => this._renderEvent(point));
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
    if (this._points.length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderRoute();
  }
}

// _handleModeChange: будем передавать в каждый эвент-презентер.
// - перебирает список со всеми презентерами и сбрасывает их вид до начального посредством их же метода .resetView

// _handleEventChange: будем передавать в каждый эвент-презентер под наименованием changeData и уже там будет передаваться в необходимый обработчик
// При срабатывании обработчика, данные, например флаг isFavorite, изменятся и будут переданы changeData
// Данные изменятся и обновят конкретный презентер через this._eventPresenter[updatedPoint.id].init(updatedPoint)
// Т.е. каждая вью будет иметь данный метод и будет его вызывать в ответ на какое-либо действие и реализуется связь от представления к данным.
// - получает один элемент обновлённых данных;
// - обновляет список моковых данных;
// - передаёт в эвент-презентер обновлённый элемент данных для инициализации

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

// 021 - import {IS_NEW_MODE} from "../utils/constants";
// 022 - import {getBlankPoint} from "../temp/mocks";
// 023 - EventEditView,
// 024 - this._blankComponent = new EventEditView(getBlankPoint(), IS_NEW_MODE);
// 025 - render(this._routeComponent, this._blankComponent)
