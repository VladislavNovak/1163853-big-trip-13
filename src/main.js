import {createInfoTemplate} from "./view/info";
import {EVENTS_COUNT} from "./temp/constants";
import {render} from "./utils/render";

import {createTabsTemplate} from "./view/tabs";
import {createFiltersTemplate} from "./view/filters";
import {createSortTemplate} from "./view/sort";
import {createEventsList} from "./view/events-list";
import {createEventsItemTemplate} from "./view/events-item";
import {createEventTemplate} from "./view/event";
import {createEventEditTemplate} from "./view/event-edit";

const layoutBody = document.body;
const layoutHeader = layoutBody.querySelector(`.trip-main`);
const tabsPlace = layoutHeader.querySelector(`.trip-controls`).firstElementChild;
const filterPlace = layoutHeader.querySelector(`.trip-controls`).lastElementChild;
const layoutMain = layoutBody.querySelector(`.trip-events`);

render(layoutHeader, createInfoTemplate(), `afterbegin`);
render(tabsPlace, createTabsTemplate(), `afterend`);
render(filterPlace, createFiltersTemplate(), `afterend`);
render(layoutMain, createSortTemplate(), `beforeend`);
render(layoutMain, createEventsList(), `beforeend`);

const eventsList = layoutMain.querySelector(`.trip-events__list`);

render(eventsList, createEventEditTemplate(), `beforeend`);

for (let i = 0; i < EVENTS_COUNT; i++) {
  render(eventsList, createEventsItemTemplate(), `beforeend`);
}

const eventsItems = eventsList.querySelectorAll(`.trip-events__item`);
eventsItems.forEach((eventsItem) => {
  render(eventsItem, createEventTemplate(), `beforeend`);
});
