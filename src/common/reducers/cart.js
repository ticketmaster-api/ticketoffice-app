import _ from 'lodash';
import {
  PROCESS_CREATE_CART_REQUEST, PROCESS_CREATE_CART_SUCCESS, PROCESS_CREATE_CART_FAILURE,
  UPDATE_CART_STATE,
  FETCH_CART_REQUEST, FETCH_CART_SUCCESS, FETCH_CART_FAILURE,
  PROCESS_UPDATE_CART_REQUEST, PROCESS_UPDATE_CART_SUCCESS, PROCESS_UPDATE_CART_FAILURE,
  EMPTY_CART_REQUEST, EMPTY_CART_SUCCESS, EMPTY_CART_FAILURE,
  SELECT_DELIVERIES_REQUEST, SELECT_DELIVERIES_SUCCESS, SELECT_DELIVERIES_FAILURE,
  SELECT_PAYMENTS_REQUEST, SELECT_PAYMENTS_SUCCESS, SELECT_PAYMENTS_FAILURE,
  COMPLETE_ORDER_SUCCESS, UPDATE_ORDER_STATE,
  REVIEW_ORDER
} from '../actions/cart';

export function cart(state = {
  review: false
}, action) {
  const { type, req, newState } = action;
  let data = null;

  switch (type) {

  case PROCESS_CREATE_CART_REQUEST:
    return state;
  case PROCESS_CREATE_CART_SUCCESS:
    data = (req && req.data) || null;
    // at this point, data may (polling == false) or may not (polling == true) content cart data
    return Object.assign({}, data);
  case PROCESS_CREATE_CART_FAILURE:
    return state;

  case UPDATE_CART_STATE:
    return Object.assign({}, newState);

  case FETCH_CART_REQUEST:
    return state;
  case FETCH_CART_SUCCESS:
    data = (req && req.data) || null;
    return Object.assign({}, data);
  case FETCH_CART_FAILURE:
    return state;

  case PROCESS_UPDATE_CART_REQUEST:
    return state;
  case PROCESS_UPDATE_CART_SUCCESS:
    data = (req && req.data) || null;
    return Object.assign({}, data);
  case PROCESS_UPDATE_CART_FAILURE:
    return state;

  case EMPTY_CART_REQUEST:
    return state;
  case EMPTY_CART_SUCCESS:
    data = (req && req.data) || null;
    return Object.assign({}, data);
  case EMPTY_CART_FAILURE:
    return state;

  case SELECT_DELIVERIES_REQUEST:
  case SELECT_PAYMENTS_REQUEST:
    return state;
  case SELECT_DELIVERIES_SUCCESS:
  case SELECT_PAYMENTS_SUCCESS:
    data = (req && req.data) || null;
    return Object.assign({}, data);
  case SELECT_DELIVERIES_FAILURE:
  case SELECT_PAYMENTS_FAILURE:
    return state;
    
  case COMPLETE_ORDER_SUCCESS:
    if (_.has(req, 'data.confirmation.id')) {
      return {};
    }
    return state;
  case UPDATE_ORDER_STATE:
    if (_.has(newState, 'confirmation.id')) {
      return {};
    }
    return state;

  default:
    return state;
  }
}

export function cartReview(state = false, action) {
  const { type } = action;

  switch (type) {

  case REVIEW_ORDER:
    return true;

  case EMPTY_CART_SUCCESS:
    return false;

  default:
    return state;
  }
}
