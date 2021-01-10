import {FormatTypes} from '../../../utils/constants';
import {getFormattedDate} from '../../../utils';

import {createHeaderTypeTemplate} from './create-header-type-template';
import {createHeaderDestinationTemplate} from './create-header-destination-template';
import {createSectionOffersTemplate} from './create-section-offers-template';
import {createDescriptionTemplate} from './create-description-template';

export const createEventEditTemplate = (point, offers, places, isEditMode) => {
  const {timeStart, timeEnd, place: isPlaceSelected, isDisabled, isSaving, isDeleting} = point;

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${createHeaderTypeTemplate(point, offers)}
          ${createHeaderDestinationTemplate(point, places)}
          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input
              class="event__input
              event__input--time"
              id="event-start-time-1"
              type="text" name="event-start-time"
              ${isDisabled ? `disabled` : ``}
              value="${getFormattedDate(timeStart, FormatTypes.LONG_SLASH)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input
              class="event__input
              event__input--time"
              id="event-end-time-1"
              type="text"
              name="event-end-time"
              ${isDisabled ? `disabled` : ``}
              value="${getFormattedDate(timeEnd, FormatTypes.LONG_SLASH)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" ${isDisabled ? `disabled` : ``} value="0">
          </div>

          <button
            class="event__save-btn  btn  btn--blue"
            type="submit"
            ${!isPlaceSelected || isDisabled ? `disabled` : ``}
            ${!isPlaceSelected ? `title="CHOOSE A PLACE"` : ``}>
            ${isSaving ? `Saving...` : `Save`}
            </button>
          <button
            class="event__reset-btn"
            ${isDisabled ? `disabled` : ``}
            type="reset">
            ${isEditMode ? isDeleting && `Deleting...` || !isDeleting && `Delete` : `Cancel`}
            </button>
          ${isEditMode ? `<button class="event__rollup-btn" type="button">` : ``}
        </header>
        <section class="event__details">
          ${createSectionOffersTemplate(point)}
          ${createDescriptionTemplate(point)}
        </section>
      </form>
    </li>`
  );
};
