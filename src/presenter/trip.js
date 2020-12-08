import {IS_NEW_MODE, WarningTypes} from "../utils/constants";
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

    this._tripComponent = new TripView();
    this._sortComponent = new SortView();
    this._timetableComponent = new TimetableView();
    this._warningComponent = new WarningView(WarningTypes.EMPTY_DATA_LIST);
    this._blankComponent = new EventEditView(getBlankPoint(), IS_NEW_MODE);
  }

  init(points) {
    this._points = points.slice();

    render(this._tripContainer, this._tripComponent);

    this._renderTrip();
  }

  _renderSort() {
    render(this._tripComponent, this._sortComponent);
  }

  _renderEvent(point) {
    const eventPresenter = new EventPresenter(this._timetableComponent);
    eventPresenter.init(point);
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
