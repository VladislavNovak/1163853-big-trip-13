import Abstract from '../abstract';
import {createTripTemplate} from './templates/create-trip-template';

export default class Trip extends Abstract {
  getTemplate() {
    return createTripTemplate();
  }
}
