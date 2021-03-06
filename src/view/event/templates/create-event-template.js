import {AddClass, FormatTypes} from '../../../utils/constants';
import {getFormattedDate, getFormattedDuration} from '../../../utils';
import {createOffersTemplate} from './create-offers-template';

export const createEventTemplate = (point) => {
  const {timeStart, timeEnd, type, place, price, isFavorite} = point;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-18">${getFormattedDate(timeStart, FormatTypes.MONTHS)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${place}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${getFormattedDate(timeStart, FormatTypes.LONG_HYPHEN)}">${getFormattedDate(timeStart, FormatTypes.TIME)}</time>
            &mdash;
            <time class="event__end-time" datetime="${getFormattedDate(timeEnd, FormatTypes.LONG_HYPHEN)}">${getFormattedDate(timeEnd, FormatTypes.TIME)}</time>
          </p>
          <p class="event__duration">${getFormattedDuration(timeStart, timeEnd)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        ${createOffersTemplate(point)}
        <button class="event__favorite-btn ${isFavorite ? AddClass.ACTIVE_FAVORITE : AddClass.DISACTIVE}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};
