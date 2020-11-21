import {createInfoTemplate} from "./view/info";
import {CHANCE_EVENTS_COUNT} from "./temp/constants";
import {render, RenderPosition} from "./utils/render";
import {generatePoint} from "./temp/point";

import {createTabsTemplate} from "./view/tabs";
import {createFiltersTemplate} from "./view/filters";
import {createSortTemplate} from "./view/sort";
import {createEventsList} from "./view/events-list";
import {createEventTemplate} from "./view/event/event";
import {createEventEditTemplate} from "./view/event-edit";

const dataPoints = new Array(CHANCE_EVENTS_COUNT).fill().map(generatePoint);
dataPoints.sort((a, b) => a.timeStart - b.timeStart);
console.log(dataPoints);

const layoutBody = document.body;
const layoutHeader = layoutBody.querySelector(`.trip-main`);
const layoutControls = layoutHeader.querySelector(`.trip-controls`);
const layoutMain = layoutBody.querySelector(`.trip-events`);

render(layoutHeader, createInfoTemplate());
render(layoutControls, createFiltersTemplate());
render(layoutControls, createTabsTemplate());

render(layoutMain, createEventsList());
render(layoutMain, createSortTemplate());

const eventsList = layoutMain.querySelector(`.trip-events__list`);

for (let i = 1; i < CHANCE_EVENTS_COUNT; i++) {
  render(eventsList, createEventTemplate(dataPoints[i]), RenderPosition.BEFOREEND);
}

render(eventsList, createEventEditTemplate(dataPoints[0]));
