import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EventDetails from '../components/EventDetails';
import * as EventDetailsActions from '../actions/eventDetails';
import * as EventOffersActions from '../actions/eventOffers';
import * as CartActions from '../actions/cart';
import * as SocketActions from '../actions/socket';

//Data that needs to be called before rendering the component
//This is used for server side rending via the fetchComponentDataBeforeRending() method
EventDetails.need = [
  EventDetailsActions.fetchEventDetails,
  EventOffersActions.fetchEventOffers
];

function mapStateToProps(state) {
  let { eventDetails, eventOffers, socket, session, cart } = state;
  return {
    eventDetails,
    eventOffers,
    socket,
    session,
    cart
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...EventDetailsActions,
    ...EventOffersActions,
    ...CartActions,
    ...SocketActions
  }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(EventDetails);
