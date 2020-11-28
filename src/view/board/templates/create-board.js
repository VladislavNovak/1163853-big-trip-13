export const createBoard = (points) => {

  return (
    points.length && `<ul class="trip-events__list"></ul>` || ``
  );
};
