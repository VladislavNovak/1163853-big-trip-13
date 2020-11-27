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

const points = getPoints();
points.sort((a, b) => a.timeStart - b.timeStart);

const layoutBody = document.body;
const layoutHeader = layoutBody.querySelector(`.trip-main`);
const layoutControls = layoutHeader.querySelector(`.trip-controls`);
const layoutMain = layoutBody.querySelector(`.trip-events`);

render(layoutHeader, new InfoView(points).getElement());
render(layoutControls, new FiltersView().getElement());
render(layoutControls, new TabsView().getElement());

if (points.length) {
  const boardComponent = new BoardView(points.length);
  render(layoutMain, boardComponent.getElement());
  render(layoutMain, new SortView(points.length).getElement());

  const board = layoutMain.querySelector(`.trip-events__list`);

  points.forEach((point) => {
    render(board, new EventView(point).getElement(), RenderPosition.BEFOREEND);
    // render(boardComponent.getElement(), new EventView(point).getElement(), RenderPosition.BEFOREEND);
  });

  render(board, new EventEditView(points[0]).getElement());
  // render(boardComponent.getElement(), new EventEditView(points[0]).getElement());
} else {
  render(layoutMain, new WarningView(WarningTypes.EMPTY_DATA_LIST).getElement());
}
