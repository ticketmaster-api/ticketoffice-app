import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Navigation from '../components/Navigation';
import * as NavigationActions from '../actions/navigation';

function mapStateToProps(state) {
  let { searchClassifications } = state;

  return {
    categories: searchClassifications && searchClassifications.categories || []
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NavigationActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
