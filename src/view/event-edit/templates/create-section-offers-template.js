export const createSectionOffersTemplate = ({offers}) => {

  const getListOffers = () => {

    return offers.map(({expense, isChecked, title}) => {
      return (
        `<div class="event__offer-selector">
          <input
            class="event__offer-checkbox
            visually-hidden"
            id="${title}"
            type="checkbox"
            name="${title}"
            ${isChecked ? `checked` : ``}
          >
          <label class="event__offer-label" for="${title}">
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
