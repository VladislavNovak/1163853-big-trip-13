import {FilterTypes, TabTypes, UpdateType} from './utils/constants';
import {getDestinations, getOffers, getPoints} from './temp/mocks';
import {RenderPosition, render} from './utils/render';

import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter';

import {EventsModel, FilterModel, OffersModel, DestinationsModel} from './model';
import {InfoView, TabsView, StatisticsView} from './view/';

const points = getPoints();
const offers = getOffers();
const destinations = getDestinations();

const eventsModel = new EventsModel();
eventsModel.setEvents(points);
const offersModel = new OffersModel();
offersModel.setOffers(offers);
const destinationsModel = new DestinationsModel();
destinationsModel.setDestinations(destinations);
const filterModel = new FilterModel();

const bodyElement = document.body;
const headerElement = bodyElement.querySelector(`.trip-main`);
const controlElement = headerElement.querySelector(`.trip-controls`);
const mainElement = bodyElement.querySelector(`.page-body__page-main  .page-body__container`);

render(headerElement, new InfoView(points), RenderPosition.AFTERBEGIN);
const tabsComponent = new TabsView();
render(controlElement, tabsComponent);

const tripPresenter = new TripPresenter(mainElement, eventsModel, filterModel, offersModel, destinationsModel);
const filterPresenter = new FilterPresenter(controlElement, eventsModel, filterModel);

const handleTabClick = (activeTab) => {
  switch (activeTab) {
    case TabTypes.TABLE:
      tripPresenter.init();
      break;
    case TabTypes.STATS:
      tripPresenter.destroy();
      break;
  }
};

tabsComponent.tabClick(handleTabClick);

filterPresenter.init();
// Временно отключаем, чтобы было проще работать с вью статистики:
// tripPresenter.init();
render(mainElement, new StatisticsView(eventsModel));

const newEventButton = document.querySelector(`.trip-main__event-add-btn`);

newEventButton.addEventListener(`click`, ({target}) => {
  tripPresenter.destroy();
  filterModel.setFilter(UpdateType.MAJOR, FilterTypes.EVERYTHING);
  tripPresenter.init();
  target.disabled = true;
  tabsComponent.tabResetView();
  tripPresenter.createEvent(() => (target.disabled = false));
});
