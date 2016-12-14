import {
  SAVE_TOKENS
} from '../actions/authentication';
import {
  REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILURE
} from '../actions/cart';

const extractTokenData = source => {
  const { token_type, access_token, expires_in, refresh_token } = source;

  const secondsFromNow = seconds => {
    const now = new Date();
    now.setSeconds(now.getSeconds() + parseInt(seconds, 10));
    return now;
  };

  return {
    token_type,
    access_token,
    expires_in,
    refresh_token,
    expiration: secondsFromNow(expires_in)
  };
};

export function oauthTokens(state = {}, action) {
  const { type, req } = action;
  let data = null;

  switch (type) {
  case SAVE_TOKENS:
    return extractTokenData(action);

  case REFRESH_TOKEN_REQUEST:
    return state;

  case REFRESH_TOKEN_SUCCESS:
    data = (req && req.data) || null;
    if (data) {
      return extractTokenData(data);
    }
    return state;

  case REFRESH_TOKEN_FAILURE:
    return state;

  default:
    return state;
  }
}
