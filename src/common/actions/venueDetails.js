import TMAPI from 'tm-api';

export const VENUE_DETAILS_GET = 'VENUE_DETAILS_GET';
export const VENUE_DETAILS_GET_REQUEST = 'VENUE_DETAILS_GET_REQUEST';
export const VENUE_DETAILS_GET_SUCCESS = 'VENUE_DETAILS_GET_SUCCESS';
export const VENUE_DETAILS_GET_FAILURE = 'VENUE_DETAILS_GET_FAILURE';

import properties from '../../resources/properties.json';
const API = properties.default.api;
const APIKEY = API.key;

TMAPI.setAPIKey(APIKEY);

export function fetchVenueDetails({venueId}) {
  return {
    type: VENUE_DETAILS_GET,
    venueId,
    // Discovery API (Get Venue Details)
    // http://developer.ticketmaster.com/products-and-docs/apis/discovery/v2/#venue-details-v2
    promise: TMAPI.venues.getDetails(venueId)
  };
}
