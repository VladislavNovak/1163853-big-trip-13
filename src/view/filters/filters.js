import Abstract from '../abstract';
import {createFiltersTemplate} from './templates/create-filters-template';

export default class Filters extends Abstract {
  getTemplate() {
    return createFiltersTemplate();
  }
}
