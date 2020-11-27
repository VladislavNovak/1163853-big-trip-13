import {WarningTypes} from "./utils/constants";
import {getPoints} from "./temp/mocks";
import {RenderPosition, renderElement} from "./utils/render";

import InfoView from "./view/info/info";
import TabsView from "./view/tabs/tabs";
import FiltersView from "./view/filters/filters";
import SortView from "./view/sort/sort";
import BoardView from "./view/event-list/board";
import EventView from "./view/event/event";
import EventEditView from "./view/event-edit/event-edit";
import WarningView from "./view/warning/warning";

const points = getPoints();
points.sort((a, b) => a.timeStart - b.timeStart);

const layoutBody = document.body;
const layoutHeader = layoutBody.querySelector(`.trip-main`);
const layoutControls = layoutHeader.querySelector(`.trip-controls`);
const layoutMain = layoutBody.querySelector(`.trip-events`);

renderElement(layoutHeader, new InfoView(points).getElement());
renderElement(layoutControls, new FiltersView().getElement());
renderElement(layoutControls, new TabsView().getElement());

if (points.length) {
  const boardComponent = new BoardView(points.length);
  renderElement(layoutMain, boardComponent.getElement());
  renderElement(layoutMain, new SortView(points.length).getElement());

  points.forEach((point) => {
    renderElement(boardComponent.getElement(), new EventView(point).getElement(), RenderPosition.BEFOREEND);
  });

  renderElement(boardComponent.getElement(), new EventEditView(points[0]).getElement());
} else {
  renderElement(layoutMain, new WarningView(WarningTypes.EMPTY_DATA_LIST).getElement());
}
