import {WarningTypes} from "./utils/constants";
import {getPoints} from "./temp/data";
import {RenderPosition, renderElement} from "./utils/render";

import Info from "./view/info/info";
import Tabs from "./view/tabs/tabs";
import Filters from "./view/filters/filters";
import Sort from "./view/sort/sort";
import EventsList from "./view/event-list/events-list";
import Event from "./view/event/event";
import EventEdit from "./view/event-edit/event-edit";
import Warning from "./view/warning/warning";

const points = getPoints();
points.sort((a, b) => a.timeStart - b.timeStart);

const layoutBody = document.body;
const layoutHeader = layoutBody.querySelector(`.trip-main`);
const layoutControls = layoutHeader.querySelector(`.trip-controls`);
const layoutMain = layoutBody.querySelector(`.trip-events`);

renderElement(layoutHeader, new Info(points).getElement());
renderElement(layoutControls, new Filters().getElement());
renderElement(layoutControls, new Tabs().getElement());

if (points.length) {
  renderElement(layoutMain, new EventsList(points.length).getElement());
  renderElement(layoutMain, new Sort(points.length).getElement());
  const eventsList = layoutMain.querySelector(`.trip-events__list`);

  points.forEach((point) => {
    renderElement(eventsList, new Event(point).getElement(), RenderPosition.BEFOREEND);
  });

  renderElement(eventsList, new EventEdit(points[0]).getElement());
} else {
  renderElement(layoutMain, new Warning(WarningTypes.EMPTY_DATA_LIST).getElement());
}
