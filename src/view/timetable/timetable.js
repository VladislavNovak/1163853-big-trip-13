import Abstract from '../abstract';
import {createTimetable} from './templates/create-timetable';

export default class Timetable extends Abstract {
  getTemplate() {
    return createTimetable();
  }
}
