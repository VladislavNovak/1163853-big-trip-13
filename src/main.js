import {WarningTypes} from "./utils/constants";
import {getPoints} from "./temp/mocks";
import {RenderPosition, render} from "./utils/render";

import InfoView from "./view/info/info";
import TabsView from "./view/tabs/tabs";
import FiltersView from "./view/filters/filters";
import SortView from "./view/sort/sort";
import BoardView from "./view/board/board";
import EventView from "./view/event/event";
import EventEditView from "./view/event-edit/event-edit";
import WarningView from "./view/warning/warning";

const renderEvent = (boardElement, point) => {
  const eventComponent = new EventView(point);
  const eventEditComponent = new EventEditView(point);

  render(boardElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

const points = getPoints();
points.sort((a, b) => a.timeStart - b.timeStart);

const bodyElement = document.body;
const headerElement = bodyElement.querySelector(`.trip-main`);
const controlElement = headerElement.querySelector(`.trip-controls`);
const mainElement = bodyElement.querySelector(`.trip-events`);

render(headerElement, new InfoView(points).getElement());
render(controlElement, new FiltersView().getElement());
render(controlElement, new TabsView().getElement());

if (points.length) {
  const boardComponent = new BoardView(points.length);
  render(mainElement, boardComponent.getElement());
  render(mainElement, new SortView(points.length).getElement());

  points.forEach((point) => {
    renderEvent(boardComponent.getElement(), point);
  });
} else {
  render(mainElement, new WarningView(WarningTypes.EMPTY_DATA_LIST).getElement());
}
