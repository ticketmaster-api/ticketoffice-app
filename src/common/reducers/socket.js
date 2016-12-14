import {
  CONNECT_SOCKET
} from '../actions/socket';

export function socket(state = null, action) {
  const { type, socket } = action;
  switch (type) {
  case CONNECT_SOCKET:
    return socket;
  default:
    return state;
  }
}
