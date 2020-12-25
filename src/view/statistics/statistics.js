import SmartView from "../smart";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import {renderChart} from './render-chart';

import {BAR_HEIGHT, Stats, EmojiTypes, ChartColors} from "../../utils/constants";
import {getMaxValueIndexFromObject, getMinValueIndexFromObject} from "../../utils";

import {createStatisticsTemplate} from "./templates/create-statistics-template";

export default class Statistics extends SmartView {
  constructor(data) {
    super();

    this._data = data;
    this._charts = new Array(Object.keys(Stats).length).fill(null);
    this._setCharts();
  }

  getTemplate() {
    return createStatisticsTemplate(this._point);
  }

  removeElement() {
    super.removeElement();

    if (this._charts[0] !== null) {
      this._charts = new Array(Object.keys(Stats).length).fill(null);
    }
  }

  restoreHandlers() {
    this._setCharts();
  }

  _createOptions(statsType) {
    const amount = this._data.reduce((collect, point) => {
      const value =
        ((statsType === Stats.MONEY) && point.price) ||
        ((statsType === Stats.TRANSPORT) && 1) ||
        ((statsType === Stats.TIME) && Math.ceil(dayjs.duration(dayjs(point.timeEnd).diff(point.timeStart)).hours() / 24));
      collect[point.type] = (collect[point.type] || 0) + value;
      return collect;
    }, {});

    const maxValueIndex = getMaxValueIndexFromObject(amount);
    const minValueIndex = getMinValueIndexFromObject(amount);

    return Object.entries(amount).map(([type, accumulate], index) => (
      {
        type,
        accumulate,
        emoji: EmojiTypes[type],
        color:
          (index === maxValueIndex) && ChartColors.SILVER ||
          (index === minValueIndex) && ChartColors.GAINSBORO ||
          ChartColors.WHITE,
      }
    ));
  }

  _getDataForChart(statsType) {
    const chartData = () => {
      const header = statsType.toUpperCase();
      const collector =
        ((statsType === Stats.MONEY) && this._createOptions(Stats.MONEY)) ||
        ((statsType === Stats.TRANSPORT) && this._createOptions(Stats.TRANSPORT)) ||
        ((statsType === Stats.TIME) && this._createOptions(Stats.TIME));
      const format =
        ((statsType === Stats.MONEY) && ((val) => `€ ${val}`)) ||
        ((statsType === Stats.MONEY) && ((val) => `${val}x`)) ||
        ((statsType === Stats.MONEY) && ((val) => `${val}D`));
      return {
        header,
        collector,
        format,
      };
    };

    return chartData();
  }

  _setCharts() {
    if (this._charts[0] !== null) {
      this._charts = new Array(Object.keys(Stats).length).fill(null);
    }

    dayjs.extend(duration);

    const ctxs = Object.values(Stats).map((type) => this.getElement().querySelector(`.statistics__chart--${type}`));

    const preparedData = Object.values(Stats).map((type) => this._getDataForChart(type));

    ctxs.forEach((ctx, index) => (ctx.height = BAR_HEIGHT * preparedData[index].collector.length));

    this._charts = ctxs.map((ctx, index) => renderChart(ctx, preparedData[index]));
  }
}

// _setCharts:
// - получаем контекст всех необходимых тегов
// - подготавливаем данные для каждой таблицы
// - устанавливаем размер для каждой таблицы
// - передаём контекст и подготовленные данные в таблицу для отрисовки
