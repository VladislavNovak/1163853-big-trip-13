import {AddClass, TabTypes} from '../../utils/constants';
import Abstract from '../abstract';
import {createTabsTemplate} from './templates/create-tabs-template';

export default class Tabs extends Abstract {
  constructor() {
    super();

    this._activeTab = TabTypes.TABLE;
    this._prevActiveTab = TabTypes.TABLE;
    this._tabClickHandler = this._tabClickHandler.bind(this);
  }

  getTemplate() {
    return createTabsTemplate(this._activeTab);
  }

  _tabClickHandler({target}) {
    if (!target.matches(`A`)) {
      return;
    }

    this._activeTab = target.dataset.tabType;

    if (this._activeTab === this._prevActiveTab) {
      return;
    }

    this._prevActiveTab = this._activeTab;
    const prevActiveClass = this.getElement().querySelector(`.${AddClass.ACTIVE_TAB}`);
    prevActiveClass.classList.remove(AddClass.ACTIVE_TAB);
    target.classList.add(AddClass.ACTIVE_TAB);
    this._callback.onTabClick(target.dataset.tabType);
  }

  tabClick(callback) {
    this._callback.onTabClick = callback;
    this.getElement()
      .addEventListener(`click`, this._tabClickHandler);
  }
}
