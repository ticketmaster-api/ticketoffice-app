import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as SearchActions from '../actions/search';

function mapStateToProps(state) {
  let { currentEvents } = state;
  return {
    currentEvents: currentEvents.events || [],
    lat: currentEvents.lat,
    long: currentEvents.long
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    searchCurrentEvents: SearchActions.searchCurrentEvents
  }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
