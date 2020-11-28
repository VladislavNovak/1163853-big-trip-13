import {IS_NEW_MODE} from "../../utils/constants";
import {createElement, render, RenderPosition} from "../../utils/render";
import {createBoard} from "./templates/create-board";
import {getBlankPoint} from "../../temp/mocks";

import EventView from "../event/event";
import EventEditView from "../event-edit/event-edit";

export default class Board {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createBoard(this._points);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  _renderEvent(boardElement, point) {
    const eventElement = new EventView(point).getElement();
    const eventEditElement = new EventEditView(point).getElement();

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        setViewMode();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const setEditMode = () => {
      boardElement.replaceChild(eventEditElement, eventElement);
    };

    const setViewMode = () => {
      boardElement.replaceChild(eventElement, eventEditElement);
    };

    eventElement.querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        setEditMode();
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    eventEditElement.querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        setViewMode();
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    eventEditElement.querySelector(`.event__reset-btn`)
      .addEventListener(`click`, () => {
        setViewMode();
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    eventEditElement.querySelector(`form`)
      .addEventListener(`submit`, (evt) => {
        evt.preventDefault();
      });

    render(boardElement, eventElement, RenderPosition.BEFOREEND);
  }

  init() {
    this._points.forEach((point) => {
      this._renderEvent(this.getElement(), point);
    });

    render(this.getElement(), new EventEditView(getBlankPoint(), IS_NEW_MODE).getElement());
  }
}
