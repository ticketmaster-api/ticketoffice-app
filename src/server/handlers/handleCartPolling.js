import _ from 'lodash';
import { clients } from '../socketSetup';

export const CART_POLLING_RESPONSE = 'CART_POLLING_RESPONSE';
export const COMPLETE_ORDER_POLLING_RESPONSE = 'COMPLETE_ORDER_POLLING_RESPONSE';

export function handleCartPolling(req, res, type) {
  const sid = decodeURIComponent(_.get(req, 'params.sid', ''));
  if (sid && type && clients.hasOwnProperty(sid)) {
    const socket = clients[sid];

    switch (type) {
    case CART_POLLING_RESPONSE:
      socket.emit(CART_POLLING_RESPONSE, req.body);
      break;
    case COMPLETE_ORDER_POLLING_RESPONSE:
      socket.emit(COMPLETE_ORDER_POLLING_RESPONSE, req.body);
      break;
    }
  }

  // Ticketmaster is waiting for status 200, or else it will re-try several times
  res.status(200).end();
}
