import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import version from './version';
import session from './session';
import environment from './environment';
import { selectedSearch, searchDiscovery } from './search';
import { eventDetails } from './eventDetails';
import { eventOffers } from './eventOffers';
import { attractionDetails } from './attractionDetails';
import { venueDetails } from './venueDetails';
import { searchClassifications } from './navigation';
import { currentEvents } from './currentEvents';
import { classificationDetails } from './classificationDetails';
import { cart, cartReview } from './cart';
import { deliveriesOptions } from './checkout';
import { polling } from './polling';
import { orders } from './orders';
import { socket } from './socket';
import { oauthTokens } from './oauthTokens';
import { walletToken } from './walletToken';

const rootReducer = combineReducers({
  version,
  session,
  environment,
  selectedSearch,
  searchDiscovery,
  eventDetails,
  eventOffers,
  attractionDetails,
  venueDetails,
  searchClassifications,
  currentEvents,
  classificationDetails,
  cart,
  cartReview,
  deliveriesOptions,
  polling,
  orders,
  socket,
  oauthTokens,
  walletToken,
  routing: routerReducer
});

export default rootReducer;
