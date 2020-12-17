import {Destinations, OffersList} from "../../temp/mock-constants";
import {assign, getPlaces, getSomeOffers} from "../../utils";

import flatpickr from "flatpickr";
import ConfirmDatePlugin from "flatpickr/dist/plugins/confirmDate/confirmDate.js";
import "flatpickr/dist/themes/dark.css";
import "flatpickr/dist/plugins/confirmDate/confirmDate.css";
import "../../../node_modules/flatpickr/dist/flatpickr.min";

import Smart from '../smart';
import {createEventEditTemplate} from './templates/create-event-edit-template';

export default class EventEdit extends Smart {
  constructor(point, isEditMode = true) {
    super();
    this._point = EventEdit.supplementData(point, isEditMode);
    this._pickrStart = null;
    this._pickrEnd = null;

    this._rollupButtonClickHandler = this._rollupButtonClickHandler.bind(this);
    this._resetButtonClickHandler = this._resetButtonClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._offerCheckboxChangeHandler = this._offerCheckboxChangeHandler.bind(this);
    this._priceTextInputHandler = this._priceTextInputHandler.bind(this);
    this._destinationTextInputHandler = this._destinationTextInputHandler.bind(this);
    this._typeRadioInputHandler = this._typeRadioInputHandler.bind(this);

    this._onPickrStartHandler = this._onPickrStartHandler.bind(this);
    this._onPickrEndHandler = this._onPickrEndHandler.bind(this);

    this._setInnerHandlers();
    this._setPickrs();
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
    this._setPickrs();
  }

  _setInnerHandlers() {
    this._addListenerToAvailableOffers();

    this.getElement().querySelector(`.event__input--price`).addEventListener(`change`, this._priceTextInputHandler);
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

    if (isNaN(parseFloat(price))) {
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

  _onPickrStartHandler([newStartTime]) {
    if (newStartTime === undefined) {
      return;
    }

    if (newStartTime > this._point.timeEnd) {
      this._pickrEnd.set(`defaultDate`, newStartTime);
      this.updateData({timeEnd: newStartTime});
    }

    this.updateData({timeStart: newStartTime});
  }

  _onPickrEndHandler([newEndTime]) {
    if (newEndTime === undefined) {
      return;
    }

    this.updateData({timeEnd: newEndTime});
  }

  _setPickrs() {
    if (this._pickrStart) {
      this._pickrStart.destroy();
      this._pickrStart = null;
    }

    if (this._pickrEnd) {
      this._pickrEnd.destroy();
      this._pickrEnd = null;
    }

    const pickrDefaultConfig = {
      'dateFormat': `d/m/y H:i`,
      'time_24hr': true,
      'enableTime': true,
      'plugins': [new ConfirmDatePlugin({
        confirmText: `DONE `,
        theme: `dark`,
        confirmIcon: `<div class='fa fa-check'>&emsp; &#10004;</div>`
      })],
    };

    const pickrStartConfig = assign(pickrDefaultConfig, {'defaultDate': this._point.timeStart, 'onClose': this._onPickrStartHandler});
    const pickrEndConfig = assign(pickrDefaultConfig, {'defaultDate': this._point.timeEnd, 'onClose': this._onPickrEndHandler});

    this._pickrStart = flatpickr(this.getElement().querySelector(`#event-start-time-1`), pickrStartConfig);
    this._pickrEnd = flatpickr(this.getElement().querySelector(`#event-end-time-1`), pickrEndConfig);
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
