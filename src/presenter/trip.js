import {IS_NEW_MODE, WarningTypes} from "../utils/constants";
import {getBlankPoint} from "../temp/mocks";

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
  }

  _renderSort() {
    // Метод для рендеринга сортировки
  }

  _renderEvent() {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов эвента/эдит-эвента,
    // текущая функция renderTask в main.js
  }

  _renderEvents() {
    // Метод для рендеринга всего списка эвентов за раз
  }

  _renderEmptyEvents() {
    // Метод для рендеринга заглушки
  }

  _renderTrip() {
    // Метод для инициализации (начала работы) модуля,
  }
}
