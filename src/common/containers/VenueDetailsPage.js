import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import VenueDetails from '../components/VenueDetails';
import * as VenueDetailsActions from '../actions/venueDetails';
import * as SearchActions from '../actions/search';

//Data that needs to be called before rendering the component
//This is used for server side rending via the fetchComponentDataBeforeRending() method
VenueDetails.need = [
  VenueDetailsActions.fetchVenueDetails
];

function mapStateToProps(state) {
  let { venueDetails, currentEvents } = state;
  return {
    venueDetails,
    currentEvents: currentEvents.events || [],
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...VenueDetailsActions,
    searchCurrentEvents: SearchActions.searchCurrentEvents
  }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(VenueDetails);
