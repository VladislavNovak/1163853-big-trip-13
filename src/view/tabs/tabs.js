import {TabAddedClassTypes, TabTypes} from "../../utils/constants";

export const createTabsTemplate = () => {

  return (
    `<h2 class="visually-hidden">Switch trip view</h2>
    <!-- Меню -->
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  ${TabAddedClassTypes.ACTIVE}" href="#">${TabTypes.TABLE}</a>
      <a class="trip-tabs__btn" ${TabAddedClassTypes.DISACTIVE} href="#">${TabTypes.STATS}</a>
    </nav>`
  );
};
