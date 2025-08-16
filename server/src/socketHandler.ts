import { Server, Socket } from 'socket.io';

const connectedClients = new Set<string>();

export const setupSocketHandlers = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log(`Client connected: ${socket.id}`);
    connectedClients.add(socket.id);

    // Handle rectangle creation
    socket.on('rectangle:add', (rectangleData) => {
      socket.broadcast.emit('rectangle:add', rectangleData);
    });

    // Handle rectangle movement
    socket.on('rectangle:move', (movementData) => {
      socket.broadcast.emit('rectangle:move', movementData);
    });
    
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
      connectedClients.delete(socket.id);
      console.log(`Active connections: ${connectedClients.size}`);
    });
  });
};

// Get current connection count
export const getConnectionCount = (): number => {
  return connectedClients.size;
};

// Get all connected client IDs
export const getConnectedClients = (): string[] => {
  return Array.from(connectedClients);
};
