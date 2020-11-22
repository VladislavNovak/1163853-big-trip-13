import {ViewTypes} from "../../utils/constants";
import {getEllipseString, getFormattedDate} from "../../utils";

export const createInfoTemplate = (dataPoints) => {

  const getTotal = () => {
    return dataPoints.map(({price}) => price).reduce((start, value) => start + value, 0);
  };

  if (!dataPoints.length) {
    return ``;
  }

  const places = dataPoints.map(({place}) => place);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${getEllipseString(places)}</h1>

        <p class="trip-info__dates">${getFormattedDate(dataPoints[0].timeStart, ViewTypes.MONTHS)}&nbsp;&mdash;&nbsp;${getFormattedDate(dataPoints[dataPoints.length - 1].timeEnd, ViewTypes.MONTHS)}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotal()}</span>
      </p>
    </section>`
  );
};
