import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../components/App';
import * as CartActions from '../actions/cart';

function mapStateToProps(state) {
  const { version, session, polling, oauthTokens } = state;
  return {
    version,
    session,
    polling,
    oauthTokens
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CartActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
