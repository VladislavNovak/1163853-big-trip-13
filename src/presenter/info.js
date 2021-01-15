import {FormatTypes} from "../utils/constants";
import {batchBind, getEllipseString, getFormattedDate} from "../utils";
import {remove, render, RenderPosition} from "../utils/render";

import {InfoView} from "../view";

export default class Info {
  constructor(headerContainer, eventsModel) {
    this._headerContainer = headerContainer;
    this._eventsModel = eventsModel;
    this._infoComponent = null;

    batchBind(this, this._handleModelEvent);
    this._eventsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderInfoComponent();
  }

  _renderInfoComponent() {
    const events = this._eventsModel.getEvents();
    const isDataExist = events.length;
    const total = isDataExist ? events.map(({price}) => price).reduce((start, value) => start + value, 0) : 0;

    const additionalSpanding = isDataExist ? events.reduce((sum, point) => {
      point.offers.forEach((offer) => {
        if (offer.isChecked) {
          sum += offer.expense;
        }
      });
      return sum;
    }, 0) : 0;

    const ellipse = isDataExist ? getEllipseString(events.map(({place}) => place)) : ``;
    const firstFormattedDate = isDataExist ? getFormattedDate(events[0].timeStart, FormatTypes.MONTHS) : ``;
    const lastFormattedDate = isDataExist ? getFormattedDate(events[events.length - 1].timeEnd, FormatTypes.MONTHS) : ``;

    this._infoComponent = new InfoView(isDataExist, total, additionalSpanding, ellipse, firstFormattedDate, lastFormattedDate);
    render(this._headerContainer, this._infoComponent, RenderPosition.AFTERBEGIN);
  }

  _destroyInfoComponent() {
    if (this._infoComponent === null) {
      return;
    }

    remove(this._infoComponent);
    this._infoComponent = null;
  }

  _handleModelEvent() {
    this._destroyInfoComponent();
    this._renderInfoComponent();
  }
}

// _handleModelEvent: обработчик-наблюдатель, который реагирует на изменение модели.
