import {
  COMPLETE_ORDER_REQUEST, COMPLETE_ORDER_SUCCESS, COMPLETE_ORDER_FAILURE,
  UPDATE_ORDER_STATE
} from '../actions/cart';

export function orders(state = {}, action) {
  const { type, req, newState } = action;
  let data = null;

  switch (type) {
  case COMPLETE_ORDER_REQUEST:
    return state;
  case COMPLETE_ORDER_SUCCESS:
    data = (req && req.data) || null;
    if (data.polling !== true) {
      // if no polling (i.e order info available immediately), save data to state
      return Object.assign({}, data);
    }
    // return plain state and wait for polling to provide order info
    return state;
  case COMPLETE_ORDER_FAILURE:
    return state;

  case UPDATE_ORDER_STATE:
    return Object.assign({}, newState);
  default:
    return state;
  }
}
