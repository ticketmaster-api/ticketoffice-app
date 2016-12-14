import {
  FETCH_CART_DELIVERIES_OPTIONS_REQUEST, FETCH_CART_DELIVERIES_OPTIONS_SUCCESS, FETCH_CART_DELIVERIES_OPTIONS_FAILURE
} from '../actions/checkout';

export function deliveriesOptions(state = {}, action) {
  const { type, req } = action;

  switch (type) {
  case FETCH_CART_DELIVERIES_OPTIONS_REQUEST:
    return state;
  case FETCH_CART_DELIVERIES_OPTIONS_SUCCESS:
    const data = req && req.data || null;
    return Object.assign({}, state, data);
  case FETCH_CART_DELIVERIES_OPTIONS_FAILURE:
    return state;
    
  default:
    return state;
  }
}
