import {IS_NEW_MODE, WarningTypes} from './utils/constants';
import {getBlankPoint, getPoints} from './temp/mocks';
import {RenderPosition, render} from './utils/render';

import {
  EventView,
  EventEditView,
  FiltersView,
  InfoView,
  SortView,
  TabsView,
  TimetableView,
  TripView,
  WarningView,
} from './view/';

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

  const formSubmitDummy = () => {
    eventEditComponent.getElement().querySelector(`.event__save-btn`).textContent =
      (eventEditComponent.getElement().querySelector(`.event__save-btn`).textContent === `Submitted`) ? `Save` : `Submitted`;
  };

  eventComponent.rollupButtonClick(() => {
    setEditMode();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.rollupButtonClick(() => {
    setViewMode();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.resetButtonClick(() => {
    setViewMode();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.formSubmit(() => {
    formSubmitDummy();
  });

  render(boardElement, eventComponent.getElement());
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
