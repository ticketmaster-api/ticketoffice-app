import TMAPI from 'tm-api';

export const EVENT_DETAILS_GET = 'EVENT_DETAILS_GET';
export const EVENT_DETAILS_GET_REQUEST = 'EVENT_DETAILS_GET_REQUEST';
export const EVENT_DETAILS_GET_SUCCESS = 'EVENT_DETAILS_GET_SUCCESS';
export const EVENT_DETAILS_GET_FAILURE = 'EVENT_DETAILS_GET_FAILURE';

import properties from '../../resources/properties.json';
const API = properties.default.api;
const APIKEY = API.key;

TMAPI.setAPIKey(APIKEY);

export function fetchEventDetails({eventId}) {
  return {
    type: EVENT_DETAILS_GET,
    eventId,
    // Discovery API (Get Event Details)
    // http://developer.ticketmaster.com/products-and-docs/apis/discovery/v2/#event-details-v2
    promise: TMAPI.events.getDetails(eventId)
  };
}
