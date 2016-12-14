export const CONNECT_SOCKET = 'CONNECT_SOCKET';
export const CART_POLLING_RESPONSE = 'CART_POLLING_RESPONSE';
export const COMPLETE_ORDER_POLLING_RESPONSE = 'COMPLETE_ORDER_POLLING_RESPONSE';

export function connectSocket(socketHandShakeCallback, cartPollingResponseCallback, completeOrderPollingResponseCallback) {
  let socket = null;
  const IO = window.io || io;

  // IO is global object, provided by socket.io
  if (IO) {
    socket = IO.connect('/');
    if (socket) {
      socket.on('socketId', data => {
        socketHandShakeCallback(socket);
      });
      socket.on(CART_POLLING_RESPONSE, data => {
        if (cartPollingResponseCallback) {
          cartPollingResponseCallback(data);
        }
      });
      socket.on(COMPLETE_ORDER_POLLING_RESPONSE, data => {
        if (completeOrderPollingResponseCallback) {
          completeOrderPollingResponseCallback(data);
        }
      });
    }
  }

  return {
    type: CONNECT_SOCKET,
    socket
  };
}
