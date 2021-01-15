import {Mode, UserAction, UpdateType, State, WarningMsg} from '../utils/constants';
import {assign, batchBind, isOnline} from '../utils';
import {remove, render, replace} from '../utils/render';

import {
  EventEditView,
  EventView,
} from '../view';
import {toast} from '../utils/toast/toast';

export default class Event {
  constructor(routeContainer, changeData, changeMode, offersModel, destinationsModel) {
    this._routeContainer = routeContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;

    this._eventComponent = null;
    this._eventEditComponent = null;
    this._mode = Mode.DEFAULT;

    batchBind(
        this,
        this._handlEventRollupClick,
        this._handlEventEditRollupClick,
        this._handlEventEditFormSubmit,
        this._handleDeleteClick,
        this._escKeyDownHandler,
        this._handleFavoriteClick
    );
  }

  init(point) {
    this._point = point;

    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventView(point);
    this._eventEditComponent = new EventEditView(point, this._offersModel, this._destinationsModel);

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
      replace(this._eventComponent, prevEventEditComponent);
      this._mode = Mode.DEFAULT;
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

  setViewState(state) {
    const resetFormState = () => {
      this._eventEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    switch (state) {
      case State.SAVING:
        this._eventEditComponent.updateData({
          isDisabled: true,
          isSaving: true
        });
        break;
      case State.DELETING:
        this._eventEditComponent.updateData({
          isDeleting: true,
          isSaving: true
        });
        break;
      case State.ABORTING:
        this._eventComponent.shake(resetFormState);
        this._eventEditComponent.shake(resetFormState);
        break;
    }
  }

  _setEditMode() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
    this._eventEditComponent.createPickrs();
  }

  _setViewMode() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
    this._eventEditComponent.destroyPickrs();
  }

  _handlEventRollupClick() {
    if (!isOnline()) {
      toast(WarningMsg.OFFLINE_CANT_EDIT_EVENT);
      return;
    }

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
