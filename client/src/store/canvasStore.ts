import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

export interface Rectangle {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
}

interface CanvasState {
  rectangles: Rectangle[];
  socket: Socket | null;
  isConnected: boolean;
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error';
  
  // Actions
  addRectangle: (rectangle: Rectangle) => void;
  updateRectanglePosition: (id: string, x: number, y: number) => void;
  setRectangles: (rectangles: Rectangle[]) => void;
  connectSocket: () => void;
  disconnectSocket: () => void;
  setConnectionStatus: (status: CanvasState['connectionStatus']) => void;
}

const getServerUrl = (): string => {
  // Use single server URL from environment variable
  // Default to localhost for development
  return import.meta.env.VITE_SERVER_URL || 'http://localhost:3001';
};

export const useCanvasStore = create<CanvasState>((set, get) => ({
  rectangles: [],
  socket: null,
  isConnected: false,
  connectionStatus: 'disconnected',

  addRectangle: (rectangle: Rectangle) => {
    set((state) => ({
      rectangles: [...state.rectangles, rectangle]
    }));
    
    // Emit to server
    const { socket } = get();
    if (socket) {
      socket.emit('rectangle:add', rectangle);
    }
  },

  updateRectanglePosition: (id: string, x: number, y: number) => {
    set((state) => ({
      rectangles: state.rectangles.map(rect =>
        rect.id === id ? { ...rect, x, y } : rect
      )
    }));
    
    // Emit to server
    const { socket } = get();
    if (socket) {
      socket.emit('rectangle:move', { id, x, y });
    }
  },

  setRectangles: (rectangles: Rectangle[]) => {
    set({ rectangles });
  },

  connectSocket: () => {
    const serverUrl = getServerUrl();
    
    const socket = io(serverUrl);
    
    socket.on('connect', () => {
      set({ 
        socket, 
        isConnected: true, 
        connectionStatus: 'connected' 
      });
    });

    socket.on('disconnect', () => {
      set({ 
        isConnected: false, 
        connectionStatus: 'disconnected' 
      });
    });

    socket.on('connect_error', (error) => {
      set({ 
        connectionStatus: 'error' 
      });
      console.error('Connection error:', error);
    });

    // Handle incoming rectangle events
    socket.on('rectangle:add', (rectangle: Rectangle) => {
      set((state) => ({
        rectangles: [...state.rectangles, rectangle]
      }));
    });

    socket.on('rectangle:move', (movementData: { id: string; x: number; y: number }) => {
      const { id, x, y } = movementData;
      set((state) => ({
        rectangles: state.rectangles.map(rect =>
          rect.id === id ? { ...rect, x, y } : rect
        )
      }));
    });

    set({ socket, connectionStatus: 'connecting' });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ 
        socket: null, 
        isConnected: false, 
        connectionStatus: 'disconnected' 
      });
    }
  },

  setConnectionStatus: (status: CanvasState['connectionStatus']) => {
    set({ connectionStatus: status });
  },
}));
