import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Search from '../components/Search';
import * as SearchActions from '../actions/search';

function mapStateToProps(state) {
  let { selectedSearch, searchDiscovery } = state;

  return {
    selectedSearch,
    results: searchDiscovery && searchDiscovery.results || [],
    isFetching: true,
    error: {}
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SearchActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Search);
