import {Places} from "../../../temp/constants";

export const createHeaderDestinationTemplate = (type, selectedPlace) => {

  const getOption = () => {
    return Object.values(Places).map((place) => {
      return (
        `<option value="${place}"></option>`
      );
    }).join(``);
  };

  return (
    `<div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${selectedPlace}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${getOption()}
      </datalist>
    </div>`
  );
};
