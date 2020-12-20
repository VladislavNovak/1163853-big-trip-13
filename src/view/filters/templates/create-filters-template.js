import {FilterTypes} from '../../../utils/constants';

export const createFiltersTemplate = (activeFilter) => {

  const getFilters = () => {
    return Object.values(FilterTypes).map((filter) => {
      const filterInLowerCase = filter.toLowerCase();
      return (
        `<div class="trip-filters__filter">
          <input
            id="filter-${filterInLowerCase}"
            class="trip-filters__filter-input
            visually-hidden"
            type="radio"
            name="trip-filter"
            value="${filter}"
            ${filter === activeFilter ? `checked` : ``}
          >
          <label
            class="trip-filters__filter-label"
            for="filter-${filterInLowerCase}"
          >${filter}</label>
        </div>`
      );
    }).join(``);
  };

  return (
    `<form class="trip-filters" action="#" method="get">
      ${getFilters()}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};
