export const createDescriptionTemplate = (placeDescription, placePhotos) => {

  const getPhotoList = () => {
    return placePhotos.map((photo) => {
      return (
        `<img class="event__photo" src="${photo}" alt="Event photo">`
      );
    }).join(``);
  };

  const getPhotoContainer = () => {
    return (
      placePhotos.length && `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${getPhotoList()}
        </div>
      </div>` || ``
    );
  };

  return (
    placeDescription && placePhotos.length && `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${placeDescription}</p>
      ${getPhotoContainer()}
    </section>` || ``
  );
};
