import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ClassificationDetails from '../components/ClassificationDetails';
import * as SearchActions from '../actions/search';
import * as ClassificatinDetailsActions from '../actions/classificationDetails';

//Data that needs to be called before rendering the component
//This is used for server side rending via the fetchComponentDataBeforeRending() method
ClassificationDetails.need = [];

function mapStateToProps(state) {
  let { currentEvents } = state;
  return {
    currentEvents: currentEvents.events || [],
    lat: currentEvents.lat,
    long: currentEvents.long,
    classificationDetails: state.classificationDetails || null
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    searchCurrentEvents: SearchActions.searchCurrentEvents,
    fetchClassificationDetails: ClassificatinDetailsActions.fetchClassificationDetails
  }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ClassificationDetails);
