import dayjs from 'dayjs';
import {batchBind} from '../utils';
import {UpdateType, UserAction, SET_BLANK_MODE} from '../utils/constants';
import {remove, render, RenderPosition} from '../utils/render';
import EventEditView from '../view/event-edit/event-edit';

const getBlankPoint = (offersModel) => {
  const _type = offersModel.getOffers().map(({type}) => type)[0];
  const {offers} = offersModel.getOffers().find((offer) => offer.type === _type);
  return {
    type: _type,
    timeStart: dayjs().toISOString(),
    timeEnd: dayjs().toISOString(),
    place: ``,
    placeDescription: ``,
    placePhotos: null,
    price: 0,
    isFavorite: false,
    offers,
  };
};

export default class Blank {
  constructor(routeContainer, changeData, offersModel, destinationsModel) {
    this._routeContainer = routeContainer;
    this._changeData = changeData;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._onDestroyBlank = null;

    this._blankEventEditComponent = null;

    batchBind(
        this,
        this._formSubmitHandler,
        this._resetButtonClickHandler,
        this._escKeyDownHandler
    );
  }

  init(onDestroyBlank) {
    this._onDestroyBlank = onDestroyBlank;

    if (this._blankEventEditComponent !== null) {
      return;
    }

    this._blankEventEditComponent = new EventEditView(getBlankPoint(this._offersModel), this._offersModel, this._destinationsModel, SET_BLANK_MODE);

    this._blankEventEditComponent.formSubmit(this._formSubmitHandler);
    this._blankEventEditComponent.resetButtonClick(this._resetButtonClickHandler);
    this._blankEventEditComponent.createPickrs();
    render(this._routeContainer, this._blankEventEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._blankEventEditComponent === null) {
      return;
    }

    if (this._onDestroyBlank !== null) {
      this._onDestroyBlank();
    }

    remove(this._blankEventEditComponent);
    this._blankEventEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _formSubmitHandler(point) {
    this._changeData(UserAction.ADD_EVENT, UpdateType.MINOR, point);
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
