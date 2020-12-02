import {IS_NEW_MODE, WarningTypes} from "./utils/constants";
import {getBlankPoint, getPoints} from "./temp/mocks";
import {RenderPosition, render} from "./utils/render";

import InfoView from "./view/info/info";
import TabsView from "./view/tabs/tabs";
import FiltersView from "./view/filters/filters";
import SortView from "./view/sort/sort";
import TimetableView from "./view/timetable/timetable";
import EventView from "./view/event/event";
import EventEditView from "./view/event-edit/event-edit";
import WarningView from "./view/warning/warning";
import TripView from "./view/trip/trip";

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
};

const points = getPoints();
points.sort((a, b) => a.timeStart - b.timeStart);

const bodyElement = document.body;
const headerElement = bodyElement.querySelector(`.trip-main`);
const controlElement = headerElement.querySelector(`.trip-controls`);
const mainElement = bodyElement.querySelector(`.page-body__page-main  .page-body__container`);

render(headerElement, new InfoView(points).getElement(), RenderPosition.AFTERBEGIN);
render(controlElement, new TabsView().getElement());
render(controlElement, new FiltersView().getElement());

const renderTrip = (tripContainer, tripPoints) => {
  const tripComponent = new TripView();

  render(tripContainer, tripComponent.getElement());

  if (tripPoints.length === 0) {
    render(tripComponent.getElement(), new WarningView(WarningTypes.EMPTY_DATA_LIST).getElement());
    return;
  }

  render(tripComponent.getElement(), new SortView().getElement());
  const timetableComponent = new TimetableView();
  render(tripComponent.getElement(), timetableComponent.getElement());
  render(timetableComponent.getElement(), new EventEditView(getBlankPoint(), IS_NEW_MODE).getElement());


  tripPoints.forEach((point) => renderEvent(timetableComponent.getElement(), point));
};

renderTrip(mainElement, points);
