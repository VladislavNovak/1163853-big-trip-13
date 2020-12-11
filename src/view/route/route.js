import Abstract from '../abstract';
import {createRoute} from './templates/create-route';

export default class Route extends Abstract {
  getTemplate() {
    return createRoute();
  }
}
