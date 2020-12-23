import SmartView from "../smart";
import {createStatisticsTemplate} from "./templates/create-statistics-template";

export default class Statistics extends SmartView {
  constructor() {
    super();
  }

  getTemplate() {
    return createStatisticsTemplate(this._point);
  }
}
