import {getOffers} from "./offers-utils";

export const getOffersByRouteType = (routeType) => {
  const type = routeType;
  const offers = getOffers(routeType);
  return {
    type,
    offers,
  };
};

// type: string
// offers: array of shape {title: string, expense: number, isChecked: bool}
