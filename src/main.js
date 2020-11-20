import {createInfoTemplate} from "./view/info";
import {CHANCE_EVENTS_COUNT} from "./temp/constants";
import {render, RenderPosition} from "./utils/render";
import {generatePoint} from "./temp/point";

import {createTabsTemplate} from "./view/tabs";
import {createFiltersTemplate} from "./view/filters";
import {createSortTemplate} from "./view/sort";
import {createEventsList} from "./view/events-list";
import {createEventsItemTemplate} from "./view/events-item";
import {createEventTemplate} from "./view/event";
import {createEventEditTemplate} from "./view/event-edit";

const points = new Array(CHANCE_EVENTS_COUNT).fill().map(generatePoint);
console.log(points);

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

for (let i = 0; i < CHANCE_EVENTS_COUNT; i++) {
  render(eventsList, createEventsItemTemplate(), RenderPosition.BEFOREEND);
}

render(eventsList, createEventEditTemplate());

const eventsItems = eventsList.querySelectorAll(`.trip-events__item`);
eventsItems.forEach((eventsItem) => {
  render(eventsItem, createEventTemplate(), RenderPosition.BEFOREEND);
});
