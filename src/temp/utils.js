import dayjs from "dayjs";
export const EVENTS_COUNT = 20;
const MAX_DAYS_GAP = 7;

export const pointType = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
export const pointPlace = [`Madrid`, `Barcelona`, `Valencia`, `Sevilla`, `Zaragoza`, `Málaga`, `Murcia`, `Palma`, `Bilbao`, `Alicante`, `Córdoba`, `Valladolid`, `Vigo`, `Gijón`, `La Coruña`, `Granada`, `Vitoria`, `Elche`, `Oviedo`];
export const pointPlaceDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomIntervalDate = () => {
  const startTime = dayjs().add(getRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP), `day`).toDate();
  const endTime = dayjs(startTime).add(getRandomInteger(1, MAX_DAYS_GAP), `day`).toDate();
  return {startTime, endTime};
};

export const getPlacePhotos = () => {
  const photoLinks = [];
  for (let i = 0; i < getRandomInteger(1, 5); i++) {
    photoLinks.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return photoLinks;
};
