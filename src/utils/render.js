export const RenderPosition = {
  BEFOREBEGIN: `beforebegin`,
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

export const render = (container, template, place = RenderPosition.AFTERBEGIN) => {
  container.insertAdjacentHTML(place, template);
};
