import {assign} from '../../utils';

import Abstract from '../abstract';
import {createEventEditTemplate} from './templates/create-event-edit-template';

export default class EventEdit extends Abstract {
  constructor(point, isEditMode = true) {
    super();
    this._point = EventEdit.supplementData(point, isEditMode);

    this._rollupButtonClickHandler = this._rollupButtonClickHandler.bind(this);
    this._resetButtonClickHandler = this._resetButtonClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._offerCheckboxChangeHandler = this._offerCheckboxChangeHandler.bind(this);
    this._priceTextInputHandler = this._priceTextInputHandler.bind(this);
    this._destinationTextInputHandler = this._destinationTextInputHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createEventEditTemplate(this._point);
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._point = assign(this._point, update);

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);
    this.restoreHandlers();
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.rollupButtonClick(this._callback.onRollupButtonClick);
    this.resetButtonClick(this._callback.onResetButtonClick);
    this.formSubmit(this._callback.onFormSubmit);
  }

  _setInnerHandlers() {
    this._addListenerToAvailableOffers();

    this.getElement().querySelector(`.event__input--price`).addEventListener(`input`, this._priceTextInputHandler);
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`input`, this._destinationTextInputHandler);
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
    evt.preventDefault();
    this.updateData({price: evt.target.value}, true);
  }

  _destinationTextInputHandler(evt) {
    evt.preventDefault();
    this.updateData({place: evt.target.value}, true);
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
