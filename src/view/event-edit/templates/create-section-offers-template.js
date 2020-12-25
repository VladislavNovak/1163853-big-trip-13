export const createSectionOffersTemplate = ({offers}) => {

  const getListOffers = () => {

    return offers.map(({expense, isChecked, title}) => {
      const idFromTitle = title.replace(/\s+/g, `-`);
      return (
        `<div class="event__offer-selector">
          <input
            class="event__offer-checkbox
            visually-hidden"
            id="${idFromTitle}"
            type="checkbox"
            name="event-offer-luggage"
            ${isChecked ? `checked` : ``}
          >
          <label class="event__offer-label" for="${idFromTitle}">
            <span class="event__offer-title">${title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${expense}</span>
          </label>
        </div>`
      );
    }).join(``);
  };

  return (
    offers.length && `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${getListOffers()}
      </div>
    </section>` || ``
  );
};
