import TMAPI from 'tm-api';

export const EVENT_OFFERS_DETAILS_GET = 'EVENT_OFFERS_DETAILS_GET';
export const EVENT_OFFERS_DETAILS_GET_REQUEST = 'EVENT_OFFERS_DETAILS_GET_REQUEST';
export const EVENT_OFFERS_DETAILS_GET_SUCCESS = 'EVENT_OFFERS_DETAILS_GET_SUCCESS';
export const EVENT_OFFERS_DETAILS_GET_FAILURE = 'EVENT_OFFERS_DETAILS_GET_FAILURE';

export const EVENT_PRICES_SORT = 'EVENT_PRICES_SORT';
export const EVENT_PRICES_SORT_ASC = 'asc';
export const EVENT_PRICES_SORT_DSC = 'dsc';

import properties from '../../resources/properties.json';
const API = properties.default.api;
const APIKEY = API.key;

TMAPI.setAPIKey(APIKEY);

export function fetchEventOffers({eventId}) {
  return {
    type: EVENT_OFFERS_DETAILS_GET,
    // Commerce API (Get Event Offers)
    // http://developer.ticketmaster.com/products-and-docs/apis/commerce/#event-offers
    promise: TMAPI.eventOffers.getDetails(eventId)
  };
}

export function sortEventPrices(direction = EVENT_PRICES_SORT_ASC) {
  return {
    type: EVENT_PRICES_SORT,
    direction
  };
}
