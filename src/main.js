import {getPoints} from './temp/mocks';
import {RenderPosition, render} from './utils/render';

import TripPresenter from './presenter/trip';
import {
  FiltersView,
  InfoView,
  TabsView,
} from './view/';

const points = getPoints();
points.sort((a, b) => a.timeStart - b.timeStart);

const bodyElement = document.body;
const headerElement = bodyElement.querySelector(`.trip-main`);
const controlElement = headerElement.querySelector(`.trip-controls`);
const mainElement = bodyElement.querySelector(`.page-body__page-main  .page-body__container`);

render(headerElement, new InfoView(points), RenderPosition.AFTERBEGIN);
render(controlElement, new TabsView());
render(controlElement, new FiltersView());

const tripPresenter = new TripPresenter(mainElement);
tripPresenter.init(points);
