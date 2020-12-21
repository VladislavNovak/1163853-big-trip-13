import {getBlankPoint} from '../temp/mocks';
import {getID} from '../utils';
import {UpdateType, UserAction, SET_BLANK_MODE} from '../utils/constants';
import {remove, render, RenderPosition} from '../utils/render';
import EventEditView from '../view/event-edit/event-edit';

export default class Blank {
  constructor(routeContainer, changeData, offersModel) {
    this._routeContainer = routeContainer;
    this._changeData = changeData;
    this._offersModel = offersModel;

    this._blankEventEditComponent = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._resetButtonClickHandler = this._resetButtonClickHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._blankEventEditComponent !== null) {
      return;
    }

    this._blankEventEditComponent = new EventEditView(getBlankPoint(), this._offersModel, SET_BLANK_MODE);

    this._blankEventEditComponent.formSubmit(this._formSubmitHandler);
    this._blankEventEditComponent.resetButtonClick(this._resetButtonClickHandler);

    render(this._routeContainer, this._blankEventEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._blankEventEditComponent === null) {
      return;
    }

    remove(this._blankEventEditComponent);
    this._blankEventEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _formSubmitHandler(point) {
    this._changeData(UserAction.ADD_EVENT, UpdateType.MINOR, Object.assign({id: getID()}, point));
    this.destroy();
  }

  _resetButtonClickHandler() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
