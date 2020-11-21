export const createOffersTemplate = (offers) => {

  const getListOffers = (markedOffers) => {
    return markedOffers.map(({expense, title}) => {
      return (
        `<li class="event__offer">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${expense}</span>
        </li>`
      );
    }).join(``);
  };

  if (!offers.length) {
    return ``;
  }

  const markedOffers = offers.filter((offer) => offer.isChecked);
  if (!markedOffers.length) {
    return ``;
  }

  return (
    `<ul class="event__selected-offers">
      <h4 class="visually-hidden">Offers:</h4>
      ${getListOffers(markedOffers)}
    </ul>`
  );
};
