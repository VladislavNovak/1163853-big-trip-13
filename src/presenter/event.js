import {Mode, UserAction, UpdateType} from "../utils/constants";
import {assign} from "../utils";
import {remove, render, replace} from "../utils/render";

import {
  EventEditView,
  EventView,
} from "../view";

export default class Event {
  constructor(routeContainer, changeData, changeMode) {
    this._routeContainer = routeContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._eventComponent = null;
    this._eventEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handlEventRollupClick = this._handlEventRollupClick.bind(this);
    this._handlEventEditRollupClick = this._handlEventEditRollupClick.bind(this);
    this._handlEventEditFormSubmit = this._handlEventEditFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(point) {
    this._point = point;

    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventView(point);
    this._eventEditComponent = new EventEditView(point);

    this._eventComponent.rollupButtonClick(this._handlEventRollupClick);
    this._eventComponent.favoriteButtonClick(this._handleFavoriteClick);
    this._eventEditComponent.rollupButtonClick(this._handlEventEditRollupClick);
    this._eventEditComponent.formSubmit(this._handlEventEditFormSubmit);
    this._eventEditComponent.resetButtonClick(this._handleDeleteClick);

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this._routeContainer, this._eventComponent);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._setViewMode();
    }
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }

  _setEditMode() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _setViewMode() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _handlEventRollupClick() {
    this._setEditMode();
  }

  _handlEventEditRollupClick() {
    this._setViewMode();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._eventEditComponent.reset(this._point);
      this._setViewMode();
    }
  }

  _handleFavoriteClick() {
    this._changeData(UserAction.UPDATE_EVENT, UpdateType.MINOR, assign(this._point, {isFavorite: !this._point.isFavorite}));
  }

  _handlEventEditFormSubmit(point) {
    this._changeData(UserAction.UPDATE_EVENT, UpdateType.MINOR, point);
    this._setViewMode();
  }

  _handleDeleteClick(point) {
    this._changeData(UserAction.DELETE_EVENT, UpdateType.MINOR, point);
  }
}

// changeMode: коллбэк, который получает из tripPresenter._handleModeChange каждый эвент-презентер
// - перебирает список со всеми презентерами и сбрасывает их вид до начального посредством их же метода .resetView

// changeData: коллбэк, который получает из tripPresenter._handleViewAction каждый эвент-презентер
// - получает один элемент обновлённых данных;
// - обновляет список моковых данных;
// - передаёт в эвент-презентер обновлённый элемент данных для инициализации
