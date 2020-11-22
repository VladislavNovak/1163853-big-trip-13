export const createEventsList = (dataLength) => {

  if (!dataLength) {
    return ``;
  }

  return (
    `<ul class="trip-events__list"></ul>`
  );
};
