import {
  VENUE_DETAILS_GET_REQUEST, VENUE_DETAILS_GET_SUCCESS, VENUE_DETAILS_GET_FAILURE
} from '../actions/venueDetails';

export function venueDetails(state = {}, action) {
  const { type, req } = action;
  switch (type) {
  case VENUE_DETAILS_GET_REQUEST:
  case VENUE_DETAILS_GET_SUCCESS:
    let data = null;
    if (req && req.data) {
      data = req.data;
      data.images = data.images || [];
    }

    return Object.assign({}, state, data);

  case VENUE_DETAILS_GET_FAILURE:
    return state;
  default:
    return state;
  }
}
