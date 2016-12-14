import _ from 'lodash';
import {
  COMPLETE_ORDER_SUCCESS, UPDATE_ORDER_STATE
} from '../actions/cart';

function nullifyCartId(state) {
  let tempState = Object.assign({}, state);
  tempState.cartId = null;
  return tempState;
}

export default function session(state = {}, action) {
  const { type, req, newState } = action;

  switch (type) {
  case COMPLETE_ORDER_SUCCESS:
    if (_.has(req, 'data.confirmation.id')) {
      return nullifyCartId(state);
    }
    return state;
  case UPDATE_ORDER_STATE:
    if (_.has(newState, 'confirmation.id')) {
      return nullifyCartId(newState);
    }
    return state;
  default:
    return state;
  }
}
