import {FilterTypes, TabTypes, UpdateType} from './utils/constants';
import {AUTH, LINK} from './api/constants';
import {render, remove} from './utils/render';
import Api from './api/api';

import {FilterPresenter, InfoPresenter, TripPresenter} from './presenter/';
import {EventsModel, FilterModel, OffersModel, DestinationsModel} from './model/';
import {TabsView, StatisticsView} from './view/';

const api = new Api(LINK, AUTH);

const eventsModel = new EventsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();

const bodyElement = document.body;
const headerElement = bodyElement.querySelector(`.trip-main`);
const controlElement = headerElement.querySelector(`.trip-controls`);
const mainElement = bodyElement.querySelector(`.page-body__page-main  .page-body__container`);
const newEventButton = document.querySelector(`.trip-main__event-add-btn`);

const infoPresenter = new InfoPresenter(headerElement, eventsModel);
infoPresenter.init();
const tabsComponent = new TabsView();

const tripPresenter = new TripPresenter(mainElement, eventsModel, filterModel, offersModel, destinationsModel, api);
const filterPresenter = new FilterPresenter(controlElement, eventsModel, filterModel);

let statisticsComponent = null;

const handleTabClick = (activeTab) => {
  switch (activeTab) {
    case TabTypes.TABLE:
      remove(statisticsComponent);
      tripPresenter.init();
      newEventButton.disabled = false;
      if (mainElement.classList.contains(`no-after`)) {
        mainElement.classList.remove(`no-after`);
      }
      break;
    case TabTypes.STATS:
      tripPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterTypes.EVERYTHING);
      newEventButton.disabled = true;
      statisticsComponent = new StatisticsView(eventsModel.getEvents());
      render(mainElement, statisticsComponent);
      if (!mainElement.classList.contains(`no-after`)) {
        mainElement.classList.add(`no-after`);
      }
      break;
  }
};

const handleNewEventButtonClick = ({target}) => {
  tripPresenter.destroy();
  filterModel.setFilter(UpdateType.MAJOR, FilterTypes.EVERYTHING);
  tripPresenter.init();
  target.disabled = true;
  tabsComponent.tabResetView();
  tripPresenter.createEvent(() => (target.disabled = false));
};

filterPresenter.init();
tripPresenter.init();


const enableControls = () => {
  newEventButton.disabled = false;
  newEventButton.addEventListener(`click`, handleNewEventButtonClick);
  tabsComponent.tabClick(handleTabClick);
  render(controlElement, tabsComponent);
};

Promise.all([api.getPoints(), api.getOffers(), api.getDestinations()])
  .then(([apiPoints, apiOffers, apiDestination]) => {
    offersModel.setOffers(apiOffers);
    destinationsModel.setDestinations(apiDestination);
    eventsModel.setEvents(UpdateType.INIT, apiPoints);
    enableControls();
  })
  .catch(() => {
    eventsModel.setEvents(UpdateType.INIT, []);
    enableControls();
  });
