import {FormatTypes} from '../../../utils/constants';
import {getFormattedDate} from '../../../utils';

import {createHeaderTypeTemplate} from './create-header-type-template';
import {createHeaderDestinationTemplate} from './create-header-destination-template';
import {createSectionOffersTemplate} from './create-section-offers-template';
import {createDescriptionTemplate} from './create-description-template';

export const createEventEditTemplate = (point, isEditMode) => {
  const {timeStart, timeEnd} = point;

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${createHeaderTypeTemplate(point)}
          ${createHeaderDestinationTemplate(point)}
          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getFormattedDate(timeStart, FormatTypes.LONG_SLASH)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getFormattedDate(timeEnd, FormatTypes.LONG_SLASH)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${isEditMode ? `Delete` : `Cancel`}</button>
          <button class="event__rollup-btn" type="button">
        </header>
        <section class="event__details">
          ${createSectionOffersTemplate(point)}
          ${createDescriptionTemplate(point)}
        </section>
      </form>
    </li>`
  );
};
