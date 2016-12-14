import http from 'http';
import express from 'express';
import session from 'express-session';
import socketIO from 'socket.io';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import webpack from 'webpack';
import webpackConfig from '../../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import cors from 'cors';
import { handleCreateCart, handleUpdateCart, handleEmptyCart, handleCompleteOrder, handleSelectDeliveries, handleSelectPayments } from './handlers/handleCart';
import { handleCartPolling, CART_POLLING_RESPONSE, COMPLETE_ORDER_POLLING_RESPONSE } from './handlers/handleCartPolling';
import { handleOAuthCallback } from './handlers/handleOAuthCallback';
import { healthcheckHandler } from './handlers/healthcheckHandler';
import { reactRouting } from './handlers/reactRouting';
import { socketSetup } from './socketSetup';

import properties from '../resources/properties.json';

const app = express();
const server = new http.Server(app);
const io = socketIO(server);
const COOKIES_SECRET = properties.default.cookies.secret;

const sessionMiddleware = session({
  secret: COOKIES_SECRET,
  resave: false,
  saveUninitialized: false
});

app.use(cors());
app.use(cookieParser(COOKIES_SECRET));
app.use(sessionMiddleware);

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use('/static', express.static(__dirname + '/../../dist'));
}

io.use((socket, next) => {
  const { request } = socket;
  sessionMiddleware(request, request.res, next);
});

// Server side routing for create cart
const jsonParser = bodyParser.json();
const {
  create: createProp,
  update: updateProp,
  empty: emptyProp,
  completeOrder: completeOrderProp,
  selectDeliveries: selectDeliveriesProp,
  selectPayments: selectPaymentsProp,
  cartPollingCallback: cartPollingCallbackProp,
  completeOrderPollingCallback: completeOrderPollingCallbackProp
} = properties.default.url.cart;
const CREATE_CART_PROXY_URL = createProp.proxy;
const UPDATE_CART_PROXY_URL = updateProp.proxy;
const EMPTY_CART_PROXY_URL = emptyProp.proxy;
const SELECT_DELIVERIES_PROXY_URL = selectDeliveriesProp.proxy;
const SELECT_PAYMENTS_PROXY_URL = selectPaymentsProp.proxy;
const COMPLETE_ORDER_CART_PROXY_URL = completeOrderProp.proxy;
const CART_POLLING_CB_URL = cartPollingCallbackProp;
const COMPLETE_ORDER_POLLING_CB_URL = completeOrderPollingCallbackProp;
const HEALTHCHECK_URL = properties.default.url.healthcheck;

app.post(CREATE_CART_PROXY_URL, jsonParser, handleCreateCart);
app.patch(UPDATE_CART_PROXY_URL, jsonParser, handleUpdateCart);
app.delete(EMPTY_CART_PROXY_URL, jsonParser, handleEmptyCart);
app.patch(SELECT_DELIVERIES_PROXY_URL, jsonParser, handleSelectDeliveries);
app.patch(SELECT_PAYMENTS_PROXY_URL, jsonParser, handleSelectPayments);
app.post(COMPLETE_ORDER_CART_PROXY_URL, jsonParser, handleCompleteOrder);

// Servide side carting and complete order polling callback endpoints
app.post(`${CART_POLLING_CB_URL}/:sid`, jsonParser, (req, res) => {
  handleCartPolling(req, res, CART_POLLING_RESPONSE);
});
app.post(`${COMPLETE_ORDER_POLLING_CB_URL}/:sid`, jsonParser, (req, res) => {
  handleCartPolling(req, res, COMPLETE_ORDER_POLLING_RESPONSE);
});

// This redirect URI must match the application "Callback URL" on TM Developer portal's application profile details
const OAUTH_REDIRECT_URI = properties.default.url.oauth.callback;

// OAuth callback catcher
app.get(OAUTH_REDIRECT_URI, handleOAuthCallback);

// healthcheck
app.get(HEALTHCHECK_URL, healthcheckHandler);

// Everything else route to React Routing
app.get('/*', reactRouting);

const PORT = process.env.PORT || 3002;

server.listen(PORT, () => {
  const { address, port } = server.address();
  console.log(`Example app listening at http://${address}:${port}`);
});

socketSetup(io);
