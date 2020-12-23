import {BAR_HEIGHT, StatisticsTypes, EmojiTypes} from "../../utils/constants";
import SmartView from "../smart";
import {createStatisticsTemplate} from "./templates/create-statistics-template";
import {renderChart} from './render-chart';

export default class Statistics extends SmartView {
  constructor(data) {
    super();

    this._data = data;
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

  _createPricingStructure() {
    const amount = this._data.reduce((collect, point) => {
      collect[point.type] = (collect[point.type] || 0) + point.price;
      return collect;
    }, {});

    return Object.entries(amount).map(([type, accumulate]) => ({type, accumulate, emoji: EmojiTypes[type]}));
  }

  _createTransportStructure() {
    const transport = this._data.reduce((collect, point) => {
      collect[point.type] = (collect[point.type] || 0) + 1;
      return collect;
    }, {});

    return Object.entries(transport).map(([type, accumulate]) => ({type, accumulate, emoji: EmojiTypes[type]}));
  }

  _getDataForChart(statsType) {
    const chartData = () => {
      const header = statsType;
      const collector = {
        [StatisticsTypes.MONEY]: this._createPricingStructure(),
        [StatisticsTypes.TRANSPORT]: this._createTransportStructure(),
      }[header];
      const format = {
        [StatisticsTypes.MONEY]: (val) => `€ ${val}`,
        [StatisticsTypes.TRANSPORT]: (val) => `€ ${val}x`,
      }[header];
      return {
        header,
        collector,
        format,
      };
    };

    return chartData();
  }

  _setCharts() {
    const ctxs = Object.values(StatisticsTypes).map((type) => this.getElement().querySelector(`.statistics__chart--${type}`));

    const preparedData = Object.values(StatisticsTypes).map((type) => this._getDataForChart(type));

    ctxs.forEach((ctx, index) => (ctx.height = BAR_HEIGHT * preparedData[index].collector.length));

    ctxs.forEach((ctx, index) => renderChart(ctx, preparedData[index]));
  }
}

// _setCharts:
// - получаем контекст всех необходимых тегов
// - подготавливаем данные для каждой таблицы
// - устанавливаем размер для каждой таблицы
// - передаём контекст и подготовленные данные в таблицу для отрисовки
