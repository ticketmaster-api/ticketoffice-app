import _ from 'lodash';
import {
  SEARCH_GET_CURRENT_EVENTS_REQUEST, SEARCH_GET_CURRENT_EVENTS_SUCCESS, SEARCH_GET_CURRENT_EVENTS_FAILURE
} from '../actions/search';

export function currentEvents(state = {}, action) {
  const { type, req, lat, long } = action;

  switch (type) {
  case SEARCH_GET_CURRENT_EVENTS_REQUEST:
  case SEARCH_GET_CURRENT_EVENTS_SUCCESS:
    const events = _.get(req, 'data["_embedded"].events', []);
    return Object.assign({}, {
      events,
      lat,
      long
    });

  case SEARCH_GET_CURRENT_EVENTS_FAILURE:
    return state;
  default:
    return state;
  }
}
