export const SAVE_TOKENS = 'SAVE_TOKENS';

export function saveTokens(token_type, access_token, expires_in, refresh_token) {
  return {
    type: SAVE_TOKENS,
    token_type,
    access_token,
    expires_in,
    refresh_token
  };
}
