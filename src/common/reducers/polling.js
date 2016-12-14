import {
  PROCESS_CREATE_CART_REQUEST, PROCESS_CREATE_CART_SUCCESS, PROCESS_CREATE_CART_FAILURE,
  UPDATE_CART_STATE,
  PROCESS_UPDATE_CART_REQUEST, PROCESS_UPDATE_CART_SUCCESS, PROCESS_UPDATE_CART_FAILURE,
  COMPLETE_ORDER_REQUEST, COMPLETE_ORDER_SUCCESS, COMPLETE_ORDER_FAILURE,
  UPDATE_ORDER_STATE
} from '../actions/cart';

const PROCESSING = 'Processing, hang-tight';
const SUCCESS = 'Request is completed';
const FAILURE = 'Something is wrong, please try again';

const PROCESSING_STATE = {
  isOn: true,
  message: PROCESSING
};
const SUCCESS_STATE = {
  isOn: false,
  message: SUCCESS
};
const FAILURE_STATE = {
  isOn: false,
  message: FAILURE
};

export function polling(state = {
  isOn: false,
  message: ''
}, action) {
  const { type, req, newState } = action;
  let data = null;

  switch (type) {

  case PROCESS_CREATE_CART_REQUEST:
  case PROCESS_UPDATE_CART_REQUEST:
  case COMPLETE_ORDER_REQUEST:
    return PROCESSING_STATE;

  case PROCESS_CREATE_CART_SUCCESS:
  case PROCESS_UPDATE_CART_SUCCESS:
  case COMPLETE_ORDER_SUCCESS:
    data = (req && req.data) || null;
    if (data.polling !== true) {
      return SUCCESS_STATE;
    }
    return state;

  case PROCESS_CREATE_CART_FAILURE:
  case PROCESS_UPDATE_CART_FAILURE:
  case COMPLETE_ORDER_FAILURE:
    return FAILURE_STATE;

  case UPDATE_CART_STATE:
  case UPDATE_ORDER_STATE:
    if (newState.status !== '200') {
      return FAILURE_STATE;
    }
    return SUCCESS_STATE;

  default:
    return state;
  }
}
