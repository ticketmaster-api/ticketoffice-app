import _ from 'lodash';
import {
  SEARCH_GET_CLASSIFICATIONS_REQUEST, SEARCH_GET_CLASSIFICATIONS_SUCCESS, SEARCH_GET_CLASSIFICATIONS_FAILURE
} from '../actions/navigation';

export function searchClassifications(state = {}, action) {
  const { type, req, error } = action;
  switch (type) {
  case SEARCH_GET_CLASSIFICATIONS_REQUEST:
  case SEARCH_GET_CLASSIFICATIONS_SUCCESS:
    const categories = _.get(req, 'data["_embedded"].classifications', []);
    return Object.assign({}, state, {
      categories
    });

  case SEARCH_GET_CLASSIFICATIONS_FAILURE:
    return Object.assign({}, state, {
      error
    });
  default:
    return state;
  }
}
