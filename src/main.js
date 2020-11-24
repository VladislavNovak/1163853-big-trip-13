import {WarningTypes} from "./utils/constants";
import {getPoints} from "./temp/data";
import {render, RenderPosition} from "./utils/render";

import {createInfoTemplate} from "./view/info/info";
import {createTabsTemplate} from "./view/tabs/tabs";
import {createFiltersTemplate} from "./view/filters/filters";
import {createSortTemplate} from "./view/sort/sort";
import {createEventsList} from "./view/event-list/events-list";
import {createEventTemplate} from "./view/event/event";
import {createEventEditTemplate} from "./view/event-edit/event-edit";
import {createWarningTemplate} from "./view/warning/warning";

const points = getPoints();
points.sort((a, b) => a.timeStart - b.timeStart);

const layoutBody = document.body;
const layoutHeader = layoutBody.querySelector(`.trip-main`);
const layoutControls = layoutHeader.querySelector(`.trip-controls`);
const layoutMain = layoutBody.querySelector(`.trip-events`);

render(layoutHeader, createInfoTemplate(points));
render(layoutControls, createFiltersTemplate());
render(layoutControls, createTabsTemplate());

if (points.length) {
  render(layoutMain, createEventsList(points.length));
  render(layoutMain, createSortTemplate(points.length));
  const eventsList = layoutMain.querySelector(`.trip-events__list`);

  points.forEach((point) => {
    render(eventsList, createEventTemplate(point), RenderPosition.BEFOREEND);
  });

  render(eventsList, createEventEditTemplate(points[0]));
} else {
  render(layoutMain, createWarningTemplate(WarningTypes.EMPTY_DATA_LIST));
}
