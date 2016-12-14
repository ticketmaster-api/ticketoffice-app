import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import URLSearchParams from 'url-search-params';
import Login from '../components/Login';
import properties from '../../resources/properties.json';
import * as AuthenticationActions from '../actions/authentication';

const clientId = _.get(properties, 'default.api.key');
const oauthCallbackPath = _.get(properties, 'default.url.oauth.callback');
const oauthBaseUrl = _.get(properties, 'default.url.oauth.authorizeBaseUrl');

function mapStateToProps(state) {
  const oauthParams = new URLSearchParams();
  const { environment, oauthTokens } = state;
  const appRoot = _.get(properties, `${environment}.appRoot`, properties.default.appRoot);

  oauthParams.set('client_id', clientId);
  oauthParams.set('redirect_uri', `${appRoot}${oauthCallbackPath}`);
  oauthParams.set('scope', 'all');
  oauthParams.set('response_type', 'code');

  const oauthAuthorizeUrl = `${oauthBaseUrl}?${oauthParams.toString()}`;

  return {
    oauthAuthorizeUrl,
    oauthTokens
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...AuthenticationActions
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
