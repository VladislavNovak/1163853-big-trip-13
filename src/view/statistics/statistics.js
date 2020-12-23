import {BAR_HEIGHT, StatisticsTypes, EmojiTypes} from "../../utils/constants";
import SmartView from "../smart";
import {createStatisticsTemplate} from "./templates/create-statistics-template";
import {renderChart} from './render-chart';

export default class Statistics extends SmartView {
  constructor(data) {
    super();

    this._data = data;
    this._charts = Object.values(StatisticsTypes).map(() => null);
    this._isCharstCreated = false;
    this._setCharts();
  }

  getTemplate() {
    return createStatisticsTemplate(this._point);
  }

  removeElement() {
    super.removeElement();
  }

  restoreHandlers() {
    this._setCharts();
  }

  _sumByTypes() {
    const amount = this._data.reduce((collect, point) => {
      collect[point.type] = (collect[point.type] || 0) + point.price;
      return collect;
    }, {});

    return Object.entries(amount).map(([type, sum]) => ({type, sum, emoji: EmojiTypes[type]}));
  }

  _getDataForChart(statsType) {
    const chartData = () => {
      const type = statsType;
      const collector = this._sumByTypes();
      const format = (val) => `€ ${val}`;
      return {
        type,
        collector,
        format,
      };
    };

    return chartData();
  }

  _setCharts() {
    if (this._isCharstCreated) {
      this._charts = Object.values(StatisticsTypes).map(() => null);
    }

    const ctxs = Object.values(StatisticsTypes).map((type) => this.getElement().querySelector(`.statistics__chart--${type}`));

    const money = this._getDataForChart(StatisticsTypes.MONEY);

    ctxs.forEach((ctx) => (ctx.height = BAR_HEIGHT * money.collector.length));
    this._charts[0] = renderChart(ctxs[0], money);

    this._isCharstCreated = true;
  }
}
