import {Destinations, OffersList} from '../../temp/mock-constants';
import {assign, getPlaces, getSomeOffers} from '../../utils';

import Smart from '../smart';
import {createEventEditTemplate} from './templates/create-event-edit-template';

export default class EventEdit extends Smart {
  constructor(point, isEditMode = true) {
    super();
    this._point = EventEdit.supplementData(point, isEditMode);

    this._rollupButtonClickHandler = this._rollupButtonClickHandler.bind(this);
    this._resetButtonClickHandler = this._resetButtonClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._offerCheckboxChangeHandler = this._offerCheckboxChangeHandler.bind(this);
    this._priceTextInputHandler = this._priceTextInputHandler.bind(this);
    this._destinationTextInputHandler = this._destinationTextInputHandler.bind(this);
    this._typeRadioInputHandler = this._typeRadioInputHandler.bind(this);

    this._setInnerHandlers();
  }

  reset(point) {
    this.updateData(EventEdit.improverishData(point));
  }

  getTemplate() {
    return createEventEditTemplate(this._point);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.rollupButtonClick(this._callback.onRollupButtonClick);
    this.resetButtonClick(this._callback.onResetButtonClick);
    this.formSubmit(this._callback.onFormSubmit);
  }

  _setInnerHandlers() {
    this._addListenerToAvailableOffers();

    this.getElement().querySelector(`.event__input--price`).addEventListener(`keyup`, this._priceTextInputHandler);
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`input`, this._destinationTextInputHandler);
    this.getElement().querySelector(`.event__type-list`).addEventListener(`change`, this._typeRadioInputHandler);
  }

  _addListenerToAvailableOffers() {
    const availableOffers = this.getElement().querySelector(`.event__available-offers`);
    if (!availableOffers) {
      return;
    }

    availableOffers.addEventListener(`change`, this._offerCheckboxChangeHandler);
  }

  _offerCheckboxChangeHandler({target}) {
    const {id, checked: isChecked} = target;

    if (!target.matches(`INPUT`)) {
      return;
    }

    const offers = this._point.offers.map((offer) => {
      if (offer.title === id.replace(/-/g, ` `)) {
        return assign(offer, {isChecked});
      }

      return offer;
    });

    this.updateData({offers});
  }

  _priceTextInputHandler(evt) {
    const price = evt.target.value;

    if ((evt.keyCode > 31 && (evt.keyCode < 48 || evt.keyCode > 57))) {
      evt.preventDefault();
      return;
    }

    this.updateData({price}, true);
  }

  _destinationTextInputHandler({target}) {
    if (!getPlaces().includes(target.value)) {
      return;
    }

    const {place, placeDescription, placePhotos} = Destinations[Destinations.findIndex((destination) => destination.place === target.value)];

    this.updateData({place, placeDescription, placePhotos});
  }

  _typeRadioInputHandler({target}) {
    const type = target.value;
    const offers = getSomeOffers(OffersList);
    this.updateData({type, offers});
  }

  _rollupButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.onRollupButtonClick();
  }

  _resetButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.onResetButtonClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.onFormSubmit(EventEdit.improverishData(this._point), evt);
  }

  rollupButtonClick(callback) {
    this._callback.onRollupButtonClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, this._rollupButtonClickHandler);
  }

  resetButtonClick(callback) {
    this._callback.onResetButtonClick = callback;
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, this._resetButtonClickHandler);
  }

  formSubmit(callback) {
    this._callback.onFormSubmit = callback;
    this.getElement().querySelector(`form`)
      .addEventListener(`submit`, this._formSubmitHandler);
  }

  static supplementData(data, payload) {
    return assign(data, {isEditMode: payload});
  }

  static improverishData(data) {
    data = assign(data);

    delete data.isEditMode;
    return data;
  }
}

// updateData:
// аргумент justDataUpdating указывает на то, что в компоненте нужно только обновить данные без перерисовки
// нужно, например, при вводе в инпуты
// - обновляет данные в свойстве _point,
// - вызывает обновление шаблона

// updateElement: при генерации нового элемента будет снова зачитано свойство _point.
// И если мы сперва обновим его, а потом шаблон, то в итоге получим элемент с новыми данными.
// - удаляет старый DOM элемент;
// - вызваtт генерацию нового;
// - заменяет один на другой;

// supplementData:
// - расширяет объект, добавляя к нему поле со значением, которое понадобится для взаимодействия с вью

// improverishData:
// - сокращает объект, удаляя ненужное для внешнего взаимодействия поле

// _setInnerHandlers: будет вызываться при инициализации класса и после перерисовки компонента - в restoreHandlers
// - навешиваются внутренние обработчики, вроде переключения выбора даты или повторения

// restoreHandlers: вызывается каждый раз, когда происходит перерисовка в updateElement
// Это необходимо, т.к. при перерисовке обработчики удаляются и нужно снова их восстановить
// - вызывает _setInnerHandlers, в котором навешиваются внутренние обработчики
// - привязывает все обработчики к соответствующим сохранённым _callback

// reset: вызывается в presenter/Event в случае выхода без сохранения, через ESC
// - аргументом передаются прежние данные, ведь в презентере находятся "бэкапные" данные
