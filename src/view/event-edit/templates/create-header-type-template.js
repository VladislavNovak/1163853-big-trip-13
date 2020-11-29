import {RouteTypes} from "../../../temp/mock-constants";

export const createHeaderTypeTemplate = ({type}) => {

  const getTypeItem = () => {
    return Object.values(RouteTypes).map((routeType) => {
      const typeInLowerCase = routeType.toLowerCase();
      return (
        `<div class="event__type-item">
          <input id="event-type-${typeInLowerCase}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeInLowerCase}">
          <label class="event__type-label  event__type-label--${typeInLowerCase}" for="event-type-${typeInLowerCase}-1">${routeType}</label>
        </div>`
      );
    }).join(``);
  };

  return (
    `<div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${getTypeItem()}
        </fieldset>
      </div>
    </div>`
  );
};
