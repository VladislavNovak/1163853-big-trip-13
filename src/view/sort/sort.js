import Abstract from '../abstract';
import {createSortTemplate} from './templates/create-sort-template';

export default class Sort extends Abstract {
  getTemplate() {
    return createSortTemplate();
  }
}
