import {
  ADD_PAYMENT_INSTRUMENT_REQUEST, ADD_PAYMENT_INSTRUMENT_SUCCESS, ADD_PAYMENT_INSTRUMENT_FAILURE
} from '../actions/cart';

export function walletToken(state = {}, action) {
  const { type, req } = action;
  let data = null;

  switch (type) {

  case ADD_PAYMENT_INSTRUMENT_REQUEST:
    return state;

  case ADD_PAYMENT_INSTRUMENT_SUCCESS:
    data = (req && req.data) || null;
    if (data) {
      return Object.assign({}, data);
    }
    return state;

  case ADD_PAYMENT_INSTRUMENT_FAILURE:
    return state;
    
  default:
    return state;
  }
}
