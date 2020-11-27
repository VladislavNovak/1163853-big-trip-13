import {createHeaderTypeTemplate} from "./create-header-type-template";
import {createHeaderDestinationTemplate} from "./create-header-destination-template";
import {createSectionOffersTemplate} from "./create-section-offers-template";
import {createDescriptionTemplate} from "./create-description-template";
import {getFormattedDate} from "../../../utils";
import {FormatTypes} from "../../../utils/constants";

export const createEventEditTemplate = (type, place, offers, placeDescription, placePhotos, timeStart, timeEnd) => {

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${createHeaderTypeTemplate(type)}
          ${createHeaderDestinationTemplate(type, place)}
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
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        <section class="event__details">
          ${createSectionOffersTemplate(offers)}
          ${createDescriptionTemplate(placeDescription, placePhotos)}
        </section>
      </form>
    </li>`
  );
};
