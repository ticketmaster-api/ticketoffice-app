import TMAPI from 'tm-api';

export const SEARCH_GET_CLASSIFICATIONS = 'SEARCH_GET_CLASSIFICATIONS';
export const SEARCH_GET_CLASSIFICATIONS_REQUEST = 'SEARCH_GET_CLASSIFICATIONS_REQUEST';
export const SEARCH_GET_CLASSIFICATIONS_SUCCESS = 'SEARCH_GET_CLASSIFICATIONS_SUCCESS';
export const SEARCH_GET_CLASSIFICATIONS_FAILURE = 'SEARCH_GET_CLASSIFICATIONS_FAILURE';

import properties from '../../resources/properties.json';
const API = properties.default.api;
const APIKEY = API.key;

TMAPI.setAPIKey(APIKEY);

export function fetchCategories() {
  return {
    type: SEARCH_GET_CLASSIFICATIONS,
    // Discovery API (Search Classifications)
    // http://developer.ticketmaster.com/products-and-docs/apis/discovery/v2/#search-classifications-v2
    promise: TMAPI.classifications.search()
  };
}
