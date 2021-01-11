import {Structure} from '../../../utils/constants';
import {getListByType} from '../../../utils';

export const createHeaderTypeTemplate = (point, offers) => {
  const {type, isDisabled} = point;
  const routeTypes = getListByType(offers, Structure.TYPE);

  const getTypeItem = () => {
    return Object.values(routeTypes).map((routeType) => {
      const typeInLowerCase = routeType.toLowerCase();
      return (
        `<div class="event__type-item">
          <input
            id="event-type-${typeInLowerCase}-1"
            class="event__type-input
            visually-hidden"
            type="radio"
            name="event-type"
            value="${routeType}">
          <label
            class="event__type-label
            event__type-label--${typeInLowerCase}"
            for="event-type-${typeInLowerCase}-1">
            ${routeType}
            </label>
        </div>`
      );
    }).join(``);
  };

  return (
    `<div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png"  alt="Event type icon">
      </label>
      <input
        class="event__type-toggle
        visually-hidden"
        id="event-type-toggle-1"
        ${isDisabled ? `disabled` : ``}
        type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${getTypeItem()}
        </fieldset>
      </div>
    </div>`
  );
};
