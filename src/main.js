import {IS_NEW_MODE, WarningTypes} from "./utils/constants";
import {getBlankPoint, getPoints} from "./temp/mocks";
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

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      setViewMode();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const setEditMode = () => {
    boardElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const setViewMode = () => {
    boardElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, () => {
      setEditMode();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  eventEditComponent.getElement().querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, () => {
      setViewMode();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  eventEditComponent.getElement().querySelector(`.event__reset-btn`)
    .addEventListener(`click`, () => {
      setViewMode();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

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

  render(boardComponent.getElement(), new EventEditView(getBlankPoint(), IS_NEW_MODE).getElement());
} else {
  render(mainElement, new WarningView(WarningTypes.EMPTY_DATA_LIST).getElement());
}
