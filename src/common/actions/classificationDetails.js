import TMAPI from 'tm-api';

export const CLASSIFICATION_DETAILS_GET = 'CLASSIFICATION_DETAILS_GET';
export const CLASSIFICATION_DETAILS_GET_REQUEST = 'CLASSIFICATION_DETAILS_GET_REQUEST';
export const CLASSIFICATION_DETAILS_GET_SUCCESS = 'CLASSIFICATION_DETAILS_GET_SUCCESS';
export const CLASSIFICATION_DETAILS_GET_FAILURE = 'CLASSIFICATION_DETAILS_GET_FAILURE';

import properties from '../../resources/properties.json';
const API = properties.default.api;
const APIKEY = API.key;

TMAPI.setAPIKey(APIKEY);

export function fetchClassificationDetails({classificationId}) {
  return {
    type: CLASSIFICATION_DETAILS_GET,
    classificationId,
    // Discovery API (Get Classification Details)
    // http://developer.ticketmaster.com/products-and-docs/apis/discovery/v2/#classifications-details-v2
    promise: TMAPI.classifications.getDetails(classificationId)
  };
}
