# 🎨 Collaborative Real-Time Canvas Application

A full-stack collaborative canvas application built with React, TypeScript, Socket.io, and React Konva. This application demonstrates real-time collaboration where multiple users can create and manipulate rectangles on a shared canvas.

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd canva-application-assesment
```

### 2. Setup Backend Server

```bash
# Navigate to server directory
cd server

# Copy environment file
cp env.example .env

# Edit .env file with your configuration
# PORT=3001
# HOST=localhost
# CLIENT_URL=http://localhost:4173

# Install dependencies
npm install

# Build TypeScript
npm run build

# Start the server
npm start
```

The server will run on: http://localhost:3001 (or your configured HOST:PORT)

### 3. Setup Frontend Client

```bash
# Open a new terminal and navigate to client directory
cd client

# Copy environment file
cp env.example .env

# Edit .env file with your configuration
# VITE_SERVER_URL=http://localhost:3001

# Install dependencies
npm install

# Build for production
npm run build

# Start the client
npm run preview
```

**⚠️ Important**: You MUST create the `.env` file before building, or the socket connection will fail in production builds!

The client will run on: http://localhost:4173

## 🔧 Environment Configuration

### Server Environment Variables (.env)
```bash
PORT=3001              # Server port
HOST=localhost         # Server host
CLIENT_URL=http://localhost:5173  # Client URL for CORS (dev port)
```

**Note**: The server now automatically allows both development (port 5173) and production build (port 4173) ports for CORS.

### Client Environment Variables (.env)
```bash
VITE_SERVER_URL=http://localhost:3001  # Server URL for socket connection
```

**Note:** All client environment variables must start with `VITE_` to be accessible in the browser.

## 🎮 Usage

### Getting Started
1. Open http://localhost:4173 in your browser
2. Click the "Connect" button to establish connection with the server
3. Once connected, click "✨ Add Rectangle" to create new shapes
4. Drag rectangles around the canvas to move them

### Testing Real-time Collaboration
1. Open multiple browser tabs/windows pointing to http://localhost:4173
2. Connect all tabs to the server
3. Add rectangles in one tab - they'll appear in all others
4. Drag rectangles in any tab - movement syncs across all tabs

## 🔧 Available Scripts

### Backend (server/)
```bash
npm run dev        # Start development server with auto-restart
npm run build      # Build TypeScript to dist/
npm start          # Start production server (built version)
npm run clean      # Clean build artifacts
```

### Frontend (client/)
```bash
npm run dev        # Start Vite development server
npm run build      # Build for production
npm run preview    # Preview production build (built version)
```

## 🚀 Production Deployment

### Backend
```bash
cd server
npm run build
npm start
```

### Frontend
```bash
cd client
npm run build
# Serve dist/ folder with your preferred web server
```

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Kill process on port 3001
npx kill-port 3001
# Kill process on port 4173
npx kill-port 4173
```

**TypeScript Errors**
```bash
# Clean and rebuild
npm run clean
npm run build
```

**Socket Connection Issues**
- Check if backend server is running
- Verify CORS settings in server .env file
- Check browser console for errors
- Ensure environment variables are properly set
- **SSL Protocol Error**: If you see `net::ERR_SSL_PROTOCOL_ERROR`, ensure `VITE_SERVER_URL` uses `http://` for local development, not `https://`
- **Build vs Dev Connection**: If socket works in `npm run dev` but not in built version, ensure you have created the `.env` file before building
- **CORS Error**: If you see "Access-Control-Allow-Origin" errors, restart your backend server after updating CORS configuration

**Dependencies Issues**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---


