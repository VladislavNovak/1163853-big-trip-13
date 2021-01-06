import {assign, getPlaces, batchBind} from '../../utils';

import flatpickr from 'flatpickr';
import ConfirmDatePlugin from 'flatpickr/dist/plugins/confirmDate/confirmDate.js';
import 'flatpickr/dist/themes/dark.css';
import 'flatpickr/dist/plugins/confirmDate/confirmDate.css';
import '../../../node_modules/flatpickr/dist/flatpickr.min';

import Smart from '../smart';
import {createEventEditTemplate} from './templates/create-event-edit-template';

export default class EventEdit extends Smart {
  constructor(point, offersModel, destinationsModel, isEditMode = true) {
    super();
    this._point = EventEdit.supplementData(point, isEditMode);
    this._offersModel = offersModel;
    this._destinations = destinationsModel.getDestinations();

    batchBind(
        this,
        this._rollupButtonClickHandler,
        this._resetButtonClickHandler,
        this._formSubmitHandler,
        this._offerCheckboxChangeHandler,
        this._priceTextInputHandler,
        this._destinationTextInputHandler,
        this._typeRadioInputHandler
    );

    this._setInnerHandlers();
  }

  removeElement() {
    super.removeElement();

    this.destroyPickrs(this._pickrStart, this._pickrEnd);
  }

  reset(point) {
    this.updateData(EventEdit.improverishData(point));
  }

  getTemplate() {
    return createEventEditTemplate(this._point, this._destinations);
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
    if (isNaN(parseFloat(evt.target.value))) {
      evt.preventDefault();
      return;
    }

    this.updateData({price: Number(evt.target.value)}, true);
  }

  _destinationTextInputHandler({target}) {
    if (!getPlaces().includes(target.value)) {
      return;
    }

    const {
      place,
      placeDescription,
      placePhotos
    } = this._destinations[this._destinations.findIndex((destination) => destination.place === target.value)];

    this.updateData({place, placeDescription, placePhotos});
  }

  _typeRadioInputHandler({target}) {
    const {type, offers} = this._offersModel
        .getOffers().find((offer) => offer.type === target.value);

    this.updateData({type, offers});
  }

  _rollupButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.onRollupButtonClick();
  }


  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.onFormSubmit(EventEdit.improverishData(this._point), evt);
  }

  rollupButtonClick(callback) {
    this._callback.onRollupButtonClick = callback;
    if (!this._point.isEditMode) {
      return;
    }

    this.getElement().querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, this._rollupButtonClickHandler);
  }

  formSubmit(callback) {
    this._callback.onFormSubmit = callback;
    this.getElement().querySelector(`form`)
    .addEventListener(`submit`, this._formSubmitHandler);
  }

  _resetButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.onResetButtonClick(EventEdit.improverishData(this._point));
  }

  resetButtonClick(callback) {
    this._callback.onResetButtonClick = callback;
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, this._resetButtonClickHandler);
  }

  static supplementData(data, payload) {
    return assign(data, {isEditMode: payload});
  }

  static improverishData(data) {
    data = assign(data);

    delete data.isEditMode;
    return data;
  }

  destroyPickrs() {
    if (this._pickrStart) {
      this._pickrStart.destroy();
      this._pickrStart = null;
    }
    if (this._pickrEnd) {
      this._pickrEnd.destroy();
      this._pickrEnd = null;
    }
  }

  createPickrs() {
    this._pickrStart = null;
    this._pickrEnd = null;

    batchBind(
        this,
        this._onPickrStartHandler,
        this._onPickrEndHandler
    );

    this._setPickrs();
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
    this.destroyPickrs(this._pickrStart, this._pickrEnd);

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
// - аргументом передаются прежние данные, ведь в презентере находятся 'бэкапные' данные

// Цепочка обработки при датабиндинге состоит из двух больших частей
// I - ОТ ПРЕДСТАВЛЕНИЯ К МОДЕЛИ:
// 1 - добавляем подписку на кнопку. Например, resetButtonClick на .event__reset-btn
// 2 - сохраняем в переменную this._resetButtonClickHandler и биндим её к этому классу как .bind
// 3 - теперь в презентере Event посредством this._eventEditComponent.resetButtonClick(this._handleDeleteClick)
// передаём коллбэком обработчик this._handleDeleteClick.
// 4 - this._handleDeleteClick, в свою очередь, вызывает функцию изменения данных _changeData,
// где указываем нужные параметры для actionType, updateType, update
// 5 - в действительности, _changeData - это коллбэк из презентера Trip, который знает о эвентах всё -
// _handleViewAction и именно в неё попадают аргументами actionType, updateType, update. Именно тут определяется,
// какой тип функций модели вызывается, например model.updateEvent
// 6 - в модель попадает updateType, который нужен только для второй части цепочки, и update, т.е. конкретные данные
// 7 - модель обрабатывает данные указанным способом - updateEvent, addEvent или deleteEvent и
// спускает данные в notify для оповещения всех подписавшихся наблюдателей
// II - ОТ МОДЕЛИ К ПРЕЗЕНТЕРУ
// 1 - наблюдатель только один - Trip._handleModelEvent - который решает, на основе ранее
// указанного updateType - PATCH, MINOR, MAJOR , как перерисовывать компоненты.
