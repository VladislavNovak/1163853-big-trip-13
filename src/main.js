import {WarningTypes} from "./utils/constants";
import {getPoints} from "./temp/mocks";
import {render, RenderPosition} from "./utils/render";

import InfoView from "./view/info/info";
import TabsView from "./view/tabs/tabs";
import FiltersView from "./view/filters/filters";
import SortView from "./view/sort/sort";
import BoardView from "./view/board/board";
import WarningView from "./view/warning/warning";

const points = getPoints();
points.sort((a, b) => a.timeStart - b.timeStart);

const bodyElement = document.body;
const headerElement = bodyElement.querySelector(`.trip-main`);
const controlElement = headerElement.querySelector(`.trip-controls`);
const mainElement = bodyElement.querySelector(`.trip-events`);

render(headerElement, new InfoView(points).getElement(), RenderPosition.AFTERBEGIN);
render(controlElement, new TabsView().getElement());
render(controlElement, new FiltersView().getElement());

render(mainElement, new SortView(points).getElement());

if (points.length) {
  const boardComponent = new BoardView(points);
  render(mainElement, boardComponent.getElement());
  boardComponent.init();
} else {
  render(mainElement, new WarningView(WarningTypes.EMPTY_DATA_LIST).getElement());
}
