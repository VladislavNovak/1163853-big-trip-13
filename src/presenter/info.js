import {batchBind} from "../utils";
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
    this._infoComponent = new InfoView(this._eventsModel);
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
    console.log(`FIRE`);

    this._destroyInfoComponent();
    this._renderInfoComponent();
  }
}

// _handleModelEvent: обработчик-наблюдатель, который реагирует на изменение модели.
