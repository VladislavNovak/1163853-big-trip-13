import {getRelatedOffers} from "./offers-utils";

export const getOffersByRouteType = (routeType) => {
  const type = routeType;
  const offers = getRelatedOffers(routeType);
  return {
    type,
    offers,
  };
};

// type: string
// offers: array of shape {title: string, expense: number, isChecked: bool}
