import {StatisticsType} from "../../../utils/constants";

export const createStatisticsTemplate = () => {

  const setStatistic = () => {
    return Object.values(StatisticsType).map((statsName) => {
      return (
        `<div class="statistics__item statistics__item--${statsName}">
          <canvas class="statistics__chart  statistics__chart--${statsName}" width="900"></canvas>
        </div>`
      );
    }).join(``);
  };

  return (
    `<section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>${setStatistic()}</section>`
  );
};
