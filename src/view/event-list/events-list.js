export const createEventsList = (dataLength) => {

  return (
    dataLength && `<ul class="trip-events__list"></ul>` || ``
  );
};
