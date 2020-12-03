import {IS_NEW_MODE, WarningTypes} from './utils/constants';
import {getBlankPoint, getPoints} from './temp/mocks';
import {RenderPosition, render, replace} from './utils/render';

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

const renderEvent = (timetableElement, point) => {
  const eventComponent = new EventView(point);
  const eventEditComponent = new EventEditView(point);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      setViewMode();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const setEditMode = () => replace(eventEditComponent, eventComponent);

  const setViewMode = () => replace(eventComponent, eventEditComponent);

  const formSubmitDummy = ({type, submitter}) => {
    throw new Error(`Need to implement a handler ${type} in "${submitter.className}"`);
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

  eventEditComponent.formSubmit((evt) => {
    formSubmitDummy(evt);
  });

  render(timetableElement, eventComponent);
};

const points = getPoints();
points.sort((a, b) => a.timeStart - b.timeStart);

const bodyElement = document.body;
const headerElement = bodyElement.querySelector(`.trip-main`);
const controlElement = headerElement.querySelector(`.trip-controls`);
const mainElement = bodyElement.querySelector(`.page-body__page-main  .page-body__container`);

render(headerElement, new InfoView(points), RenderPosition.AFTERBEGIN);
render(controlElement, new TabsView());
render(controlElement, new FiltersView());

const renderTrip = (tripContainer, tripPoints) => {
  const tripComponent = new TripView();

  render(tripContainer, tripComponent);

  if (tripPoints.length === 0) {
    render(tripComponent, new WarningView(WarningTypes.EMPTY_DATA_LIST));
    return;
  }

  render(tripComponent, new SortView());
  const timetableComponent = new TimetableView();
  render(tripComponent, timetableComponent);
  render(timetableComponent, new EventEditView(getBlankPoint(), IS_NEW_MODE));


  tripPoints.forEach((point) => renderEvent(timetableComponent, point));
};

renderTrip(mainElement, points);
