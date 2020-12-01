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
  const eventElement = new EventView(point).getElement();
  const eventEditElement = new EventEditView(point).getElement();

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      setViewMode();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const setEditMode = () => {
    boardElement.replaceChild(eventEditElement, eventElement);
  };

  const setViewMode = () => {
    boardElement.replaceChild(eventElement, eventEditElement);
  };

  eventElement.querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, () => {
      setEditMode();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  eventEditElement.querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, () => {
      setViewMode();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  eventEditElement.querySelector(`.event__reset-btn`)
    .addEventListener(`click`, () => {
      setViewMode();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  eventEditElement.querySelector(`form`)
    .addEventListener(`submit`, (evt) => {
      evt.preventDefault();
    });

  render(boardElement, eventElement);
}

const points = getPoints();
points.sort((a, b) => a.timeStart - b.timeStart);

const bodyElement = document.body;
const headerElement = bodyElement.querySelector(`.trip-main`);
const controlElement = headerElement.querySelector(`.trip-controls`);
const mainElement = bodyElement.querySelector(`.trip-events`);

render(headerElement, new InfoView(points).getElement(), RenderPosition.AFTERBEGIN);
render(controlElement, new TabsView().getElement());
render(controlElement, new FiltersView().getElement());

if (points.length === 0) {
  render(mainElement, new WarningView(WarningTypes.EMPTY_DATA_LIST).getElement());
} else {
  render(mainElement, new SortView().getElement());
  const boardComponent = new BoardView(points);
  render(mainElement, boardComponent.getElement());

  render(boardComponent.getElement(), new EventEditView(getBlankPoint(), IS_NEW_MODE).getElement());
  points.forEach((point) => renderEvent(boardComponent.getElement(), point));
}
