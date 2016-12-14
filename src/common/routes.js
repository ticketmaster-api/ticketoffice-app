import { Route, IndexRoute } from 'react-router';
import React from 'react';

import App from './containers/App';

//Redux Smart
import EventDetailsPage from './containers/EventDetailsPage';
import AttractionDetailsPage from './containers/AttractionDetailsPage';
import VenueDetailsPage from './containers/VenueDetailsPage';
import ClassificationDetailsPage from './containers/ClassificationDetailsPage';
import CartPage from './containers/CartPage';
import CheckoutPage from './containers/CheckoutPage';
import HomePage from './containers/HomePage';
import OrdersPage from './containers/OrdersPage';

//Redux Dumb
import error404 from './components/404';

export default (
  <Route name="app" path="/" component={App}>
    <IndexRoute component={HomePage}/>

    <Route path="event/:eventId" component={EventDetailsPage}/>
    <Route path="artist/:attractionId" component={AttractionDetailsPage}/>
    <Route path="venue/:venueId" component={VenueDetailsPage}/>
    <Route path="section/:classificationId" component={ClassificationDetailsPage}/>
    <Route path="cart" component={CartPage}/>
    <Route path="checkout" component={CheckoutPage}/>
    <Route path="orders" component={OrdersPage}/>

    <Route path="*" component={error404}/>
  </Route>
);
