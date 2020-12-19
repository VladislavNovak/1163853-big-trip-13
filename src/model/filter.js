import {FilterTypes} from "../utils/constants";
import Observer from "../utils/observer";

export default class Filter extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterTypes.EVERYTHING;
  }

  setFiter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
