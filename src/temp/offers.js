import {mapOfOffersByRouteTypes} from "./offers-utils";

export const getOffersByRouteTypes = (routeType) => {
  const type = routeType;
  const offers = mapOfOffersByRouteTypes.find((item) => item[0] === routeType)[1];
  return {
    type,
    offers,
  };
};

// type: string
// offers: array of of shape {title: string, price: number, isChecked: bool}
