import TMAPI from 'tm-api';

export const FETCH_CART_DELIVERIES_OPTIONS = 'FETCH_CART_DELIVERIES_OPTIONS';
export const FETCH_CART_DELIVERIES_OPTIONS_REQUEST = 'FETCH_CART_DELIVERIES_OPTIONS_REQUEST';
export const FETCH_CART_DELIVERIES_OPTIONS_SUCCESS = 'FETCH_CART_DELIVERIES_OPTIONS_SUCCESS';
export const FETCH_CART_DELIVERIES_OPTIONS_FAILURE = 'FETCH_CART_DELIVERIES_OPTIONS_FAILURE';

import properties from '../../resources/properties.json';
const API = properties.default.api;
const APIKEY = API.key;

TMAPI.setAPIKey(APIKEY);

export function fetchDeliveries(cartId) {
  return {
    type: FETCH_CART_DELIVERIES_OPTIONS,
    // Commerce API (Get Deliveries Options)
    promise: TMAPI.checkout.getDeliveries(cartId)
  };
}
