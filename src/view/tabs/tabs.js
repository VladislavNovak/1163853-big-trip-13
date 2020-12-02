import Abstract from '../abstract';
import {createTabsTemplate} from './templates/create-tabs-template';

export default class Tabs extends Abstract {
  getTemplate() {
    return createTabsTemplate();
  }
}
