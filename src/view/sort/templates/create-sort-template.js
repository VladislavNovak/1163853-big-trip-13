import {SortTypes} from "../../../utils/constants";

export const createSortTemplate = () => {

  const getSorts = () => {
    return Object.values(SortTypes).map((sort) => {
      const type = sort.split(`-`).pop();
      return (
        `<div class="trip-sort__item  trip-sort__item--${type}">
          <input id="${sort}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${sort}" checked>
          <label class="trip-sort__btn" for="${sort}">${type[0].toUpperCase()}${type.slice(1)}</label>
        </div>`
      );
    }).join(``);
  };

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">${getSorts()}</form>`
  );
};
