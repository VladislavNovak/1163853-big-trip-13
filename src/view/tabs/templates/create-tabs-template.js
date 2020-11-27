import {AddClassToTab, TabTypes} from "../../../utils/constants";

export const createTabsTemplate = () => {

  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  ${AddClassToTab.ACTIVE}" href="#">${TabTypes.TABLE}</a>
      <a class="trip-tabs__btn" ${AddClassToTab.DISACTIVE} href="#">${TabTypes.STATS}</a>
    </nav></template>`
  );
};
