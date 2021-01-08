import {render, RenderPosition} from "../utils/render";
import {InfoView} from "../view";

export default class Info {
  constructor(headerContainer, eventsModel) {
    this._headerContainer = headerContainer;
    this._eventsModel = eventsModel;
    this._infoComponent = null;
  }

  init() {
    this._infoComponent = new InfoView(this._eventsModel);
    render(this._headerContainer, this._infoComponent, RenderPosition.AFTERBEGIN);
  }
}
