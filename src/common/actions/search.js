import TMAPI from 'tm-api';

export const SELECT_SEARCH = 'SELECT_SEARCH';

export const SEARCH_GET_EVENTS = 'SEARCH_GET_EVENTS';
export const SEARCH_GET_EVENTS_REQUEST = 'SEARCH_GET_EVENTS_REQUEST';
export const SEARCH_GET_EVENTS_SUCCESS = 'SEARCH_GET_EVENTS_SUCCESS';
export const SEARCH_GET_EVENTS_FAILURE = 'SEARCH_GET_EVENTS_FAILURE';

export const SEARCH_GET_VENUES = 'SEARCH_GET_VENUES';
export const SEARCH_GET_VENUES_REQUEST = 'SEARCH_GET_VENUES_REQUEST';
export const SEARCH_GET_VENUES_SUCCESS = 'SEARCH_GET_VENUES_SUCCESS';
export const SEARCH_GET_VENUES_FAILURE = 'SEARCH_GET_VENUES_FAILURE';

export const SEARCH_GET_ATTRACTIONS = 'SEARCH_GET_ATTRACTIONS';
export const SEARCH_GET_ATTRACTIONS_REQUEST = 'SEARCH_GET_ATTRACTIONS_REQUEST';
export const SEARCH_GET_ATTRACTIONS_SUCCESS = 'SEARCH_GET_ATTRACTIONS_SUCCESS';
export const SEARCH_GET_ATTRACTIONS_FAILURE = 'SEARCH_GET_ATTRACTIONS_FAILURE';

export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';

export const SEARCH_GET_CURRENT_EVENTS = 'SEARCH_GET_CURRENT_EVENTS';
export const SEARCH_GET_CURRENT_EVENTS_REQUEST = 'SEARCH_GET_CURRENT_EVENTS_REQUEST';
export const SEARCH_GET_CURRENT_EVENTS_SUCCESS = 'SEARCH_GET_CURRENT_EVENTS_SUCCESS';
export const SEARCH_GET_CURRENT_EVENTS_FAILURE = 'SEARCH_GET_CURRENT_EVENTS_FAILURE';

export const DEFAULT_LAT = 34.1012808;
export const DEFAULT_LONG = -118.3437756;

import properties from '../../resources/properties.json';
const EVENTS_DAYS_IN_ADVANCE = 7;
const API = properties.default.api;
const APIKEY = API.key;

TMAPI.setAPIKey(APIKEY);

export function selectSearch(newSearchType) {
  return {
    type: SELECT_SEARCH,
    newSearchType
  };
}

export function fetchEventsSearchResults(keyword) {
  return {
    type: SEARCH_GET_EVENTS,
    // Discovery API (Search Events)
    // http://developer.ticketmaster.com/products-and-docs/apis/discovery/v2/#srch-events-v2
    promise: TMAPI.events.search({
      keyword
    })
  };
}

export function fetchVenuesSearchResults(keyword) {
  return {
    type: SEARCH_GET_VENUES,
    // Discovery API (Search Venues)
    // http://developer.ticketmaster.com/products-and-docs/apis/discovery/v2/#search-venues-v2
    promise: TMAPI.venues.search({
      keyword
    })
  };
}

export function fetchAttractionsSearchResults(keyword) {
  return {
    type: SEARCH_GET_ATTRACTIONS,
    // Discovery API (Search Attractions)
    // http://developer.ticketmaster.com/products-and-docs/apis/discovery/v2/#search-attractions-v2
    promise: TMAPI.attractions.search({
      keyword
    })
  };
}

export function clearSearchResults() {
  return {
    type: CLEAR_SEARCH_RESULTS
  };
}

export function searchCurrentEvents(params = {}, advance = EVENTS_DAYS_IN_ADVANCE) {
  const { lat, long, classificationId, venueId, attractionId } = params;

  let latValue = DEFAULT_LAT;
  let longValue= DEFAULT_LONG;
  // Only use a completed pair of coorindates
  if (lat && long) {
    latValue = lat;
    longValue = long;
  }

  let now = (new Date()).toJSON();
  let future = new Date();

  future.setDate(future.getDate() + advance);
  future = future.toJSON();

  let searchParams = {
    startDateTime: now,
    endDateTime: future
  };

  if (classificationId) {
    searchParams.classificationId = classificationId;
  }

  if (attractionId) {
    searchParams.attractionId = attractionId;
  }

  // VenueId is more ideal of a location indicator than lat long pair
  if (venueId) {
    searchParams.venueId = venueId;
  } else {
    searchParams.latlong = `${latValue},${longValue}`;
  }

  return {
    type: SEARCH_GET_CURRENT_EVENTS,
    lat: latValue,
    long: longValue,
    // Discovery API (Search Events)
    // http://developer.ticketmaster.com/products-and-docs/apis/discovery/v2/#srch-events-v2
    promise: TMAPI.events.search(searchParams)
  };
}
