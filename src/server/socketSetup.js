export let clients = {};

export function socketSetup(io) {
  if (!io) {
    return;
  }

  io.sockets.on('connection', (socket) => {
    // session is available via socket.request.session
    clients[socket.client.id] = socket;
    socket.emit('socketId', socket.client.id);
  });
}
