import {AddClass, TabTypes} from '../../../utils/constants';

export const createTabsTemplate = (activeTab) => {

  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${Object.values(TabTypes)
        .map((value) => (`<a href="#" class="trip-tabs__btn  ${activeTab === value ? AddClass.ACTIVE_TAB : AddClass.DISACTIVE}" data-tab-type="${value}">${value}</a>`))
        .join(``)}
    </nav>`
  );
};
