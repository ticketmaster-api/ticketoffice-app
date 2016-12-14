import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AttractionDetails from '../components/AttractionDetails';
import * as AttractionDetailsActions from '../actions/attractionDetails';
import * as SearchActions from '../actions/search';

//Data that needs to be called before rendering the component
//This is used for server side rending via the fetchComponentDataBeforeRending() method
AttractionDetails.need = [
  AttractionDetailsActions.fetchAttractionDetails
];

function mapStateToProps(state) {
  let { attractionDetails, currentEvents } = state;
  return {
    attractionDetails,
    currentEvents: currentEvents.events || [],
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...AttractionDetailsActions,
    searchCurrentEvents: SearchActions.searchCurrentEvents
  }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(AttractionDetails);
