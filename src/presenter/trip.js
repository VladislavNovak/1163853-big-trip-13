import {IS_NEW_MODE, WarningTypes} from "../utils/constants";
import {render, replace} from "../utils/render";
import {getBlankPoint} from "../temp/mocks";

import {
  EventEditView,
  EventView,
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
    const eventComponent = new EventView(point);
    const eventEditComponent = new EventEditView(point);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        setViewMode();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const setEditMode = () => replace(eventEditComponent, eventComponent);

    const setViewMode = () => replace(eventComponent, eventEditComponent);

    const formSubmitDummy = ({type, submitter}) => {
      throw new Error(`Need to implement a handler ${type} in "${submitter.className}"`);
    };

    eventComponent.rollupButtonClick(() => {
      setEditMode();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    eventEditComponent.rollupButtonClick(() => {
      setViewMode();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    eventEditComponent.resetButtonClick(() => {
      setViewMode();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    eventEditComponent.formSubmit((evt) => {
      formSubmitDummy(evt);
    });

    render(this._timetableElement, eventComponent);
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
