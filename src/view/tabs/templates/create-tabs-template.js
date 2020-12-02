import {AddClassName, TabTypes} from "../../../utils/constants";

export const createTabsTemplate = () => {

  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  ${AddClassName.ACTIVE_TAB}" href="#">${TabTypes.TABLE}</a>
      <a class="trip-tabs__btn" ${AddClassName.DISACTIVE} href="#">${TabTypes.STATS}</a>
    </nav>`
  );
};
