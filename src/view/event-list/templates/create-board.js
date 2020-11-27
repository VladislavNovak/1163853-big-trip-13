export const createBoard = (dataLength) => {

  return (
    dataLength && `<ul class="trip-events__list"></ul>` || ``
  );
};
