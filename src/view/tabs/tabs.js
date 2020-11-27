import {createElement} from "../../utils/render";
import {createTabsTemplate} from "./templates/create-tabs-template";

export default class Tabs {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTabsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
