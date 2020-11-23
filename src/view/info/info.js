import {FormatTypes} from "../../utils/constants";
import {getEllipseString, getFormattedDate} from "../../utils";

export const createInfoTemplate = (dataPoints) => {

  const getTotal = () => dataPoints.map(({price}) => price).reduce((start, value) => start + value, 0);

  return (
    dataPoints.length && `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${getEllipseString(dataPoints.map(({place}) => place))}</h1>

        <p class="trip-info__dates">${getFormattedDate(dataPoints[0].timeStart, FormatTypes.MONTHS)}&nbsp;&mdash;&nbsp;${getFormattedDate(dataPoints[dataPoints.length - 1].timeEnd, FormatTypes.MONTHS)}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotal()}</span>
      </p>
    </section>` || ``
  );
};
