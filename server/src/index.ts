import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { setupSocketHandlers, getConnectionCount } from './socketHandler';

const app = express();
const httpServer = createServer(app);
// CORS configuration for both development and production
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:5173",
  "http://localhost:4173", // Vite preview/build port
].filter(Boolean); 

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
});

// CORS middleware for REST endpoints
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

// Setup Socket.io handlers
setupSocketHandlers(io);

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    connections: getConnectionCount(),
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
  console.log(`📊 Health check: http://${HOST}:${PORT}/health`);
});
