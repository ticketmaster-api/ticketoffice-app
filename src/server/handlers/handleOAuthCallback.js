import _ from 'lodash';
import TMAPI from 'tm-api';

import properties from '../../resources/properties.json';
const CLIENT_ID = _.get(properties, 'default.api.key');
const CLIENT_SECRET = _.get(properties, 'default.api.secret');

TMAPI.setAPIKey(CLIENT_ID);
TMAPI.setSecret(CLIENT_SECRET);

export function handleOAuthCallback(req, res) {
  var auth_code = _.get(req, 'query.code', null);

  // OAuth API (Select Payments)
  // http://developer.ticketmaster.com/products-and-docs/apis/oauth/
  TMAPI.oauth.tokenAuthorize(auth_code)
  .then(response => {
    const { token_type, access_token, expires_in, refresh_token } = response.data;

    res.status(200).end(`<html><head></head><body><p>Login Success</p><script>window.opener.saveTokens("${token_type}","${access_token}","${expires_in}","${refresh_token}");</script></body></html>`);
  })
  .catch(error => {
    res.status(200).end(`<html><head></head><body><p>Login Unsuccessful.</p><pre>${JSON.stringify(error.response.data)}</pre></body></html>`);
  });
}
