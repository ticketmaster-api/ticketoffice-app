import TMAPI from 'tm-api';

export const ATTRACTION_DETAILS_GET = 'ATTRACTION_DETAILS_GET';
export const ATTRACTION_DETAILS_GET_REQUEST = 'ATTRACTION_DETAILS_GET_REQUEST';
export const ATTRACTION_DETAILS_GET_SUCCESS = 'ATTRACTION_DETAILS_GET_SUCCESS';
export const ATTRACTION_DETAILS_GET_FAILURE = 'ATTRACTION_DETAILS_GET_FAILURE';

import properties from '../../resources/properties.json';
const API = properties.default.api;
const APIKEY = API.key;

TMAPI.setAPIKey(APIKEY);

export function fetchAttractionDetails({attractionId}) {
  return {
    type: ATTRACTION_DETAILS_GET,
    attractionId,
    // Discovery API (Get Attraction Details)
    // http://developer.ticketmaster.com/products-and-docs/apis/discovery/v2/#attraction-details-v2
    promise: TMAPI.attractions.getDetails(attractionId)
  };
}
