import {FilterTypes} from './constants';
import dayjs from 'dayjs';

export const filter = {
  [FilterTypes.EVERYTHING]: (data) => data,
  [FilterTypes.FUTURE]: (data) => data.filter((point) => dayjs().isBefore(point.timeStart)),
  [FilterTypes.PAST]: (data) => data.filter((point) => dayjs().isAfter(point.timeEnd)),
};
