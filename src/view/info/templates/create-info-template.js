export const createInfoTemplate = (isExist, total, ellipse, firstFormattedDate, lastFormattedDate) => {
  return (
    isExist && (`<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${ellipse}</h1>

        <p class="trip-info__dates">${firstFormattedDate}&nbsp;&mdash;&nbsp;${lastFormattedDate}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
      </p>
    </section>`) || ` `
  );
};
