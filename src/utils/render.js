export const RenderPosition = {
  BEFOREBEGIN: `beforebegin`,
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

export const renderTemplate = (container, template, place = RenderPosition.AFTERBEGIN) => {
  container.insertAdjacentHTML(place, template);
};

export const render = (container, child, place = RenderPosition.AFTERBEGIN) => {

  switch (place) {
    case RenderPosition.BEFOREBEGIN:
      container.before(child);
      break;
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
    case RenderPosition.AFTEREND:
      container.after(child);
      break;
  }
};

export const createElement = (markup) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = markup;

  return newElement.firstChild;
};
