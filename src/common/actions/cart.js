import TMAPI from 'tm-api';
import { request } from 'axios';
import { browserHistory } from 'react-router';

export const PROCESS_CREATE_CART = 'PROCESS_CREATE_CART';
export const PROCESS_CREATE_CART_REQUEST = 'PROCESS_CREATE_CART_REQUEST';
export const PROCESS_CREATE_CART_SUCCESS = 'PROCESS_CREATE_CART_SUCCESS';
export const PROCESS_CREATE_CART_FAILURE = 'PROCESS_CREATE_CART_FAILURE';
export const PROCESS_CREATE_CART_NO_SOCKET = 'PROCESS_CREATE_CART_NO_SOCKET';

export const PROCESS_UPDATE_CART = 'PROCESS_UPDATE_CART';
export const PROCESS_UPDATE_CART_REQUEST = 'PROCESS_UPDATE_CART_REQUEST';
export const PROCESS_UPDATE_CART_SUCCESS = 'PROCESS_UPDATE_CART_SUCCESS';
export const PROCESS_UPDATE_CART_FAILURE = 'PROCESS_UPDATE_CART_FAILURE';
export const PROCESS_UPDATE_CART_NO_SOCKET = 'PROCESS_UPDATE_CART_NO_SOCKET';

export const UPDATE_CART_STATE = 'UPDATE_CART_STATE';

export const FETCH_CART = 'FETCH_CART';
export const FETCH_CART_REQUEST = 'FETCH_CART_REQUEST';
export const FETCH_CART_SUCCESS = 'FETCH_CART_SUCCESS';
export const FETCH_CART_FAILURE = 'FETCH_CART_FAILURE';

export const COMPLETE_ORDER = 'COMPLETE_ORDER';
export const COMPLETE_ORDER_REQUEST = 'COMPLETE_ORDER_REQUEST';
export const COMPLETE_ORDER_SUCCESS = 'COMPLETE_ORDER_SUCCESS';
export const COMPLETE_ORDER_FAILURE = 'COMPLETE_ORDER_FAILURE';
export const PROCESS_COMPLETE_ORDER_NO_SOCKET = 'PROCESS_COMPLETE_ORDER_NO_SOCKET';

export const EMPTY_CART = 'EMPTY_CART';
export const EMPTY_CART_REQUEST = 'EMPTY_CART_REQUEST';
export const EMPTY_CART_SUCCESS = 'EMPTY_CART_SUCCESS';
export const EMPTY_CART_FAILURE = 'EMPTY_CART_FAILURE';

export const SELECT_DELIVERIES = 'SELECT_DELIVERIES';
export const SELECT_DELIVERIES_REQUEST = 'SELECT_DELIVERIES_REQUEST';
export const SELECT_DELIVERIES_SUCCESS = 'SELECT_DELIVERIES_SUCCESS';
export const SELECT_DELIVERIES_FAILURE = 'SELECT_DELIVERIES_FAILURE';

export const SELECT_PAYMENTS = 'SELECT_PAYMENTS';
export const SELECT_PAYMENTS_REQUEST = 'SELECT_PAYMENTS_REQUEST';
export const SELECT_PAYMENTS_SUCCESS = 'SELECT_PAYMENTS_SUCCESS';
export const SELECT_PAYMENTS_FAILURE = 'SELECT_PAYMENTS_FAILURE';

export const ADD_PAYMENT_INSTRUMENT = 'ADD_PAYMENT_INSTRUMENT';
export const ADD_PAYMENT_INSTRUMENT_REQUEST = 'ADD_PAYMENT_INSTRUMENT_REQUEST';
export const ADD_PAYMENT_INSTRUMENT_SUCCESS = 'ADD_PAYMENT_INSTRUMENT_SUCCESS';
export const ADD_PAYMENT_INSTRUMENT_FAILURE = 'ADD_PAYMENT_INSTRUMENT_FAILURE';

export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILURE = 'REFRESH_TOKEN_FAILURE';

export const MISSING_ACCESS_TOKEN = 'MISSING_ACCESS_TOKEN';

export const UPDATE_ORDER_STATE = 'UPDATE_ORDER_STATE';

export const REVIEW_ORDER = 'REVIEW_ORDER';

import properties from '../../resources/properties.json';
const {
  create: createProp,
  update: updateProp,
  empty: emptyCartProp,
  completeOrder: completeOrderProp,
  selectDeliveries: selectDeliveriesProp,
  selectPayments: selectPaymentsProp
} = properties.default.url.cart;
const CREATE_CART_PROXY_URL = createProp.proxy;
const UPDATE_CART_PROXY_URL = updateProp.proxy;
const EMPTY_CART_PROXY_URL = emptyCartProp.proxy;
const COMPLETE_ORDER_CART_PROXY_URL = completeOrderProp.proxy;
const SELECT_DELIVERIES_PROXY_URL = selectDeliveriesProp.proxy;
const SELECT_PAYMENTS_PROXY_URL = selectPaymentsProp.proxy;

const API = properties.default.api;
const APIKEY = API.key;
const CLIENT_SECRET = API.secret;

TMAPI.setAPIKey(APIKEY);
TMAPI.setSecret(CLIENT_SECRET);

export function createCart(requestBody, socket) {
  if (socket && socket.id) {
    let requestConfig = {
      method: 'post',
      url: CREATE_CART_PROXY_URL,
      data: {
        socketId: socket.id,
        requestBody: Object.assign({}, requestBody)
      }
    };

    return {
      type: PROCESS_CREATE_CART,
      // this will be caught by /src/server/handlers/handleCart.js (handleCreateCart)
      promise: request(requestConfig)
    };
  }

  return {
    type: PROCESS_CREATE_CART_NO_SOCKET
  };
}

export function updateCartState(newState) {
  return {
    type: UPDATE_CART_STATE,
    newState
  };
}

export function fetchCart(cartId) {
  return {
    type: FETCH_CART,
    // Commerce API (Get Cart)
    // http://developer.ticketmaster.com/products-and-docs/apis/commerce/#get-cart
    promise: TMAPI.cart.getCart(cartId)
  };
}

export function updateCart(cartId, requestBody, socket) {
  if (socket && socket.id) {
    let requestConfig = {
      method: 'patch',
      url: UPDATE_CART_PROXY_URL,
      data: {
        cartId,
        socketId: socket.id,
        requestBody: Object.assign({}, requestBody)
      }
    };

    return {
      type: PROCESS_UPDATE_CART,
      // this will be caught by /src/server/handlers/handleCart.js (handleUpdateCart)
      promise: request(requestConfig)
    };
  }

  return {
    type: PROCESS_UPDATE_CART_NO_SOCKET
  };
}

export function completeOrder(cartId, socket, callback = null) {
  if (socket && socket.id) {
    let requestConfig = {
      method: 'post',
      url: COMPLETE_ORDER_CART_PROXY_URL,
      params: {},
      data: {
        cartId,
        socketId: socket.id,
        requestBody: {}
      }
    };

    return {
      type: COMPLETE_ORDER,
      // this will be caught by /src/server/handlers/handleCart.js (handleCompleteOrder)
      promise: request(requestConfig),
      callback
    };
  }

  return {
    type: PROCESS_COMPLETE_ORDER_NO_SOCKET
  };
}

export function emptyCart(cartId) {
  if (cartId) {
    let requestConfig = {
      method: 'delete',
      url: EMPTY_CART_PROXY_URL,
      params: {
        cartId
      }
    };

    return {
      type: EMPTY_CART,
      // this will be caught by /src/server/handlers/handleCart.js (handleEmptyCart)
      promise: request(requestConfig)
    };
  }
}

export function updateOrdersState(newState) {
  browserHistory.push('/orders');
  return {
    type: UPDATE_ORDER_STATE,
    newState
  };
}

export function selectDeliveries(cartId, requestBody, socket) {
  if (cartId) {
    let requestConfig = {
      method: 'patch',
      url: SELECT_DELIVERIES_PROXY_URL,
      data: {
        cartId,
        socketId: socket.id,
        requestBody: Object.assign({}, requestBody)
      }
    };

    return {
      type: SELECT_DELIVERIES,
      // this will be caught by /src/server/handlers/handleCart.js (handleSelectDeliveries)
      promise: request(requestConfig)
    };
  }
}

export function selectPayments(cartId, requestBody, socket) {
  if (cartId) {
    let requestConfig = {
      method: 'patch',
      url: SELECT_PAYMENTS_PROXY_URL,
      data: {
        cartId,
        socketId: socket.id,
        requestBody: Object.assign({}, requestBody)
      }
    };

    return {
      type: SELECT_PAYMENTS,
      // this will be caught by /src/server/handlers/handleCart.js (handleSelectPayments)
      promise: request(requestConfig)
    };
  }
}

export function refreshToken(refresh_token, callback = null) {
  return {
    type: REFRESH_TOKEN,
    // OAuth API (Refresh Token)
    // http://developer.ticketmaster.com/products-and-docs/apis/oauth/
    promise: TMAPI.oauth.tokenRefresh(refresh_token),
    callback
  };
}

export function addPaymentInstrument(access_token, payload, callback = null) {

  // process only when access token is present
  if (access_token) {
    return {
      type: ADD_PAYMENT_INSTRUMENT,
      // Waves API (Add Instrument)
      promise: TMAPI.waves.addInstrument(access_token, payload),
      callback
    };
  }

  return {
    type: MISSING_ACCESS_TOKEN
  };
}

export function reviewOrder() {
  return {
    type: REVIEW_ORDER
  };
}
