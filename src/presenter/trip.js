import {IS_NEW_MODE, WarningTypes} from "../utils/constants";
import {updateItem} from "../utils/";
import {render} from "../utils/render";
import {getBlankPoint} from "../temp/mocks";

import EventPresenter from "./event";

import {
  EventEditView,
  SortView,
  TimetableView,
  TripView,
  WarningView,
} from "../view";

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._eventPresenter = {};

    this._tripComponent = new TripView();
    this._sortComponent = new SortView();
    this._timetableComponent = new TimetableView();
    this._warningComponent = new WarningView(WarningTypes.EMPTY_DATA_LIST);
    this._blankComponent = new EventEditView(getBlankPoint(), IS_NEW_MODE);

    this._handleEventChange = this._handleEventChange.bind(this);
  }

  init(points) {
    this._points = points.slice();

    render(this._tripContainer, this._tripComponent);

    this._renderTrip();
  }

  _handleEventChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._eventPresenter[updatedPoint.id].init(updatedPoint);
  }

  _renderSort() {
    render(this._tripComponent, this._sortComponent);
  }

  _renderEvent(point) {
    const eventPresenter = new EventPresenter(this._timetableComponent);
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
    render(this._timetableComponent, this._blankComponent);
  }

  _clearTimetable() {
    Object.values(this._eventPresenter).forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
  }

  _renderTimetable() {
    render(this._tripComponent, this._timetableComponent);
    this._renderNewEvent();

    this._renderEvents();
  }

  _renderTrip() {
    if (this._points.length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderTimetable();
  }
}

// _handleEventChange: реализует связь от представления к данным.
// Т.е. каждая вью будет иметь данный метод и будет его вызывать в ответ на какое-либо действие
// - получает один элемент обновлённых данных;
// - обновляет список моковых данных;
// - передаёт в эвент-презентер обновлённый элемент данных для инициализации

// _renderEvent:
// - создаёт новый эвент-презентер;
// - инициализируется;
// - добавляет его в список эвент-презентеров

// _clearTimetable:
// - удаляет список всех эвент-презентеров
