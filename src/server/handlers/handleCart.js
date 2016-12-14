import _ from 'lodash';
import TMAPI from 'tm-api';

import properties from '../../resources/properties.json';
const API = properties.default.api;
const APIKEY = API.key;
const APP_ROOT = _.get(properties, `${process.env.NODE_ENV}.appRoot`, properties.default.appRoot);
const MOCK_PURCHASE = _.get(properties, `${process.env.NODE_ENV}.mockpurchase`, properties.default.mockpurchase);

const {
  cartPollingCallback: CART_POLLING_CB_URL,
  completeOrderPollingCallback: COMPLETE_ORDER_POLLING_CB_URL
} = properties.default.url.cart;

TMAPI.setAPIKey(APIKEY);

function cartRequestHelper(req, cbURL) {
  const { socketId, requestBody, cartId } = req.body;

  return {
    cartId,
    requestBody: Object.assign({
      pollingCallbackUrl: `${APP_ROOT}${cbURL}/${encodeURIComponent(socketId)}`
    }, requestBody)
  };
}

function responseHandler(response) {
  this.req.session.cartId = _.get(response, 'data.cart.id', null);
  this.res.status(200).send(response.data);
}

function errorHandler(error) {
  this.res.status(error.response.status).end();
}

export function handleCreateCart(req, res) {
  const { requestBody } = cartRequestHelper(req, CART_POLLING_CB_URL);

  // Commerce API (Create Cart)
  // http://developer.ticketmaster.com/products-and-docs/apis/commerce/#create-cart
  TMAPI.cart.createCart(requestBody)
    .then(responseHandler.bind({req, res}))
    .catch(errorHandler.bind({res}));
}

export function handleUpdateCart(req, res) {
  const { cartId, requestBody } = cartRequestHelper(req, CART_POLLING_CB_URL);

  // Commerce API (Update Cart Products)
  // http://developer.ticketmaster.com/products-and-docs/apis/commerce/#update-cart-products
  TMAPI.cart.updateCart(cartId, requestBody)
    .then(responseHandler.bind({req, res}))
    .catch(errorHandler.bind({res}));
}

export function handleEmptyCart(req, res) {
  const cartId = _.get(req, 'query.cartId', '');

  if (cartId) {
    // Commerce API (Empty Cart)
    // http://developer.ticketmaster.com/products-and-docs/apis/commerce/#empty-cart
    TMAPI.cart.emptyCart(cartId)
      .then(responseHandler.bind({req, res}))
      .catch(errorHandler.bind({res}));
  }
}

export function handleSelectDeliveries(req, res) {
  const { cartId, requestBody } = cartRequestHelper(req, CART_POLLING_CB_URL);

  // Commerce API (Select Deliveries)
  // http://developer.ticketmaster.com/products-and-docs/apis/commerce/#select-deliveries
  TMAPI.cart.selectDeliveries(cartId, requestBody)
    .then(responseHandler.bind({req, res}))
    .catch(errorHandler.bind({res}));
}

export function handleSelectPayments(req, res) {
  const { cartId, requestBody } = cartRequestHelper(req, CART_POLLING_CB_URL);

  // Commerce API (Select Payments)
  // http://developer.ticketmaster.com/products-and-docs/apis/commerce/#select-payments
  TMAPI.cart.selectPayments(cartId, requestBody)
    .then(responseHandler.bind({req, res}))
    .catch(errorHandler.bind({res}));
}

export function handleCompleteOrder(req, res) {
  const { cartId, requestBody } = cartRequestHelper(req, COMPLETE_ORDER_POLLING_CB_URL);
  const { pollingCallbackUrl } = requestBody;

  // Commerce API (Purchase)
  TMAPI.cart.completeOrder(cartId, {pollingCallbackUrl}, MOCK_PURCHASE)
    .then(responseHandler.bind({req, res}))
    .catch(errorHandler.bind({res}));
}
