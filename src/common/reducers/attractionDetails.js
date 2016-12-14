import {
  ATTRACTION_DETAILS_GET_REQUEST, ATTRACTION_DETAILS_GET_SUCCESS, ATTRACTION_DETAILS_GET_FAILURE
} from '../actions/attractionDetails';

export function attractionDetails(state = {}, action) {
  const { type, req } = action;

  switch (type) {
  case ATTRACTION_DETAILS_GET_REQUEST:
  case ATTRACTION_DETAILS_GET_SUCCESS:
    const data = req && req.data || null;
    return Object.assign({}, state, data);
  case ATTRACTION_DETAILS_GET_FAILURE:
    return state;
  default:
    return state;
  }
}
