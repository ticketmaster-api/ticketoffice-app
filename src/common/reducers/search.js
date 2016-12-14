import _ from 'lodash';
import {
  SELECT_SEARCH,
  SEARCH_GET_EVENTS_REQUEST, SEARCH_GET_EVENTS_SUCCESS, SEARCH_GET_EVENTS_FAILURE,
  SEARCH_GET_VENUES_REQUEST, SEARCH_GET_VENUES_SUCCESS, SEARCH_GET_VENUES_FAILURE,
  SEARCH_GET_ATTRACTIONS_REQUEST, SEARCH_GET_ATTRACTIONS_SUCCESS, SEARCH_GET_ATTRACTIONS_FAILURE,
  CLEAR_SEARCH_RESULTS
} from '../actions/search';

function resultsHelper(action) {
  const { type, results, error } = action;
  let state = {
    error: {},
    isFetching: false,
    results: []
  };
  switch (type) {
  case SEARCH_GET_EVENTS_REQUEST:
  case SEARCH_GET_VENUES_REQUEST:
  case SEARCH_GET_ATTRACTIONS_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });
  case SEARCH_GET_EVENTS_SUCCESS:
  case SEARCH_GET_VENUES_SUCCESS:
  case SEARCH_GET_ATTRACTIONS_SUCCESS:
    return Object.assign({}, state, {
      results
    });
  case SEARCH_GET_EVENTS_FAILURE:
  case SEARCH_GET_VENUES_FAILURE:
  case SEARCH_GET_ATTRACTIONS_FAILURE:
    return Object.assign({}, state, {
      error
    });
  default:
    return state;
  }
}

export function selectedSearch(state = 'events', action) {
  const { type, newSearchType } = action;
  switch (type) {
  case SELECT_SEARCH:
    return newSearchType;
  default:
    return state;
  }
}

export function searchDiscovery(state = {}, action) {
  const { type, req, error } = action;
  let results;
  switch (type) {
  case SEARCH_GET_EVENTS_REQUEST:
  case SEARCH_GET_EVENTS_SUCCESS:
    results = _.get(req, 'data["_embedded"].events', []);
    return Object.assign({}, state, resultsHelper({
      type,
      results
    }));
  case SEARCH_GET_VENUES_REQUEST:
  case SEARCH_GET_VENUES_SUCCESS:
    results = _.get(req, 'data["_embedded"].venues', []);
    return Object.assign({}, state, resultsHelper({
      type,
      results
    }));
  case SEARCH_GET_ATTRACTIONS_REQUEST:
  case SEARCH_GET_ATTRACTIONS_SUCCESS:
    results = _.get(req, 'data["_embedded"].attractions', []);
    return Object.assign({}, state, resultsHelper({
      type,
      results
    }));
  case SEARCH_GET_EVENTS_FAILURE:
  case SEARCH_GET_VENUES_FAILURE:
  case SEARCH_GET_ATTRACTIONS_FAILURE:
    return Object.assign({}, state, resultsHelper({
      type,
      error
    }));
  case CLEAR_SEARCH_RESULTS:
    return Object.assign({}, state, resultsHelper({
      type,
      results: []
    }));
  default:
    return state;
  }
}
