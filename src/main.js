import {getOffers, getPoints} from './temp/mocks';
import {RenderPosition, render} from './utils/render';

import EventsModel from './model/events';
import FilterModel from './model/filter';
import OffersModel from './model/offers';
import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter';
import {
  InfoView,
  TabsView,
} from './view/';

const points = getPoints();
const offers = getOffers();

const eventsModel = new EventsModel();
eventsModel.setEvents(points);
const offersModel = new OffersModel();
offersModel.setOffers(offers);
const filterModel = new FilterModel();

const bodyElement = document.body;
const headerElement = bodyElement.querySelector(`.trip-main`);
const controlElement = headerElement.querySelector(`.trip-controls`);
const mainElement = bodyElement.querySelector(`.page-body__page-main  .page-body__container`);

render(headerElement, new InfoView(points), RenderPosition.AFTERBEGIN);
const tabsComponent = new TabsView();
render(controlElement, tabsComponent);

const handleTabClick = (activeTab) => {
  throw new Error(`TODO implement switching by active tab: ${activeTab}`);
};

tabsComponent.tabClick(handleTabClick);

const tripPresenter = new TripPresenter(mainElement, eventsModel, filterModel, offersModel);
const filterPresenter = new FilterPresenter(controlElement, eventsModel, filterModel);

filterPresenter.init();
tripPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createEvent();
});
