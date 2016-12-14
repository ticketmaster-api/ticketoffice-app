import {
  EVENT_DETAILS_GET_REQUEST, EVENT_DETAILS_GET_SUCCESS, EVENT_DETAILS_GET_FAILURE
} from '../actions/eventDetails';

export function eventDetails(state = {}, action) {
  const { type, req } = action;

  switch (type) {
  case EVENT_DETAILS_GET_REQUEST:
  case EVENT_DETAILS_GET_SUCCESS:
    let data = null;
    if (req && req.data) {
      data = req.data;
      data.info = data.info || '';
    }
    return Object.assign({}, state, data);

  case EVENT_DETAILS_GET_FAILURE:
    return state;
  default:
    return state;
  }
}
