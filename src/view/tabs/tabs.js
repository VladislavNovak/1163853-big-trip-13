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

  _toggleActiveElement(target, activeTab) {
    this._activeTab = activeTab;

    if (this._activeTab === this._prevActiveTab) {
      return;
    }

    this._prevActiveTab = this._activeTab;
    this.getElement().querySelector(`.${AddClass.ACTIVE_TAB}`).classList.remove(AddClass.ACTIVE_TAB);

    target.classList.add(AddClass.ACTIVE_TAB);
  }

  _tabClickHandler({target}) {
    if (!target.matches(`A`)) {
      return;
    }

    this._toggleActiveElement(target, target.dataset.tabType);

    this._callback.onTabClick(this._activeTab);
  }

  tabClick(callback) {
    this._callback.onTabClick = callback;
    this.getElement()
      .addEventListener(`click`, this._tabClickHandler);
  }

  tabResetView() {
    const table = this.getElement().querySelector(`.trip-tabs__btn`);

    this._toggleActiveElement(table, TabTypes.TABLE);
  }
}

// _toggleActiveElement: переключает активные элементы
// - target - элемент, который нужно активировать
// - activeTab нужен для сохранения в стейте
