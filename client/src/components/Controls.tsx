import React from 'react';
import { useCanvasStore } from '../store/canvasStore';

const ConnectionButton: React.FC<{
    isConnected: boolean;
    onConnect: () => void;
    onDisconnect: () => void;
}> = ({ isConnected, onConnect, onDisconnect }) => {
    if (isConnected) {
        return (
            <button
                onClick={onDisconnect}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
            >
                Disconnect
            </button>
        );
    }

    return (
        <button
            onClick={onConnect}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
        >
            Connect
        </button>
    );
};

const Controls: React.FC = () => {
    const {
        addRectangle,
        connectionStatus,
        isConnected,
        connectSocket,
        disconnectSocket
    } = useCanvasStore();

    const generateRandomColor = (): string => {
        const colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
            '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const handleAddRectangle = () => {
        const uiWidth = 320; // Approximate width of UI controls

        const newRectangle = {
            id: `rect-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            x: uiWidth + 50 + Math.random() * (window.innerWidth - uiWidth - 150), // Avoid UI area
            y: 50 + Math.random() * (window.innerHeight - 150), // Avoid top UI area
            width: 80 + Math.random() * 120,
            height: 60 + Math.random() * 100,
            fill: generateRandomColor(),
            stroke: '#2C3E50',
            strokeWidth: 2,
        };

        addRectangle(newRectangle);
    };

    const getConnectionStatusColor = () => {
        switch (connectionStatus) {
            case 'connected':
                return 'text-green-600 bg-green-100';
            case 'connecting':
                return 'text-yellow-600 bg-yellow-100';
            case 'disconnected':
                return 'text-gray-600 bg-gray-100';
            case 'error':
                return 'text-red-600 bg-red-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    const getConnectionStatusText = () => {
        switch (connectionStatus) {
            case 'connected':
                return 'Connected';
            case 'connecting':
                return 'Connecting...';
            case 'disconnected':
                return 'Disconnected';
            case 'error':
                return 'Connection Error';
            default:
                return 'Unknown';
        }
    };

    return (
        <div
            className="fixed top-4 left-4 z-50 flex flex-col gap-4"
            style={{
                zIndex: 1000,
                pointerEvents: 'auto'
            }}
        >
            <div className="bg-white rounded-lg shadow-lg p-4 border">
                <div className="flex items-center gap-3 mb-3">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getConnectionStatusColor()}`}>
                        {getConnectionStatusText()}
                    </div>
                    <ConnectionButton
                        isConnected={isConnected}
                        onConnect={connectSocket}
                        onDisconnect={disconnectSocket}
                    />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4 border">
                <button
                    onClick={handleAddRectangle}
                    disabled={!isConnected}
                    className={`w-full px-6 py-3 rounded-lg font-semibold text-white transition-all transform hover:scale-105 ${isConnected
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg'
                        : 'bg-gray-400 cursor-not-allowed'
                        }`}
                >
                    {isConnected ? '✨ Add Rectangle' : 'Connect to Add Rectangles'}
                </button>
                {!isConnected && (
                    <p className="text-xs text-gray-500 mt-2 text-center">
                        Connect to the server to start collaborating
                    </p>
                )}
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4 border max-w-xs">
                <h3 className="font-semibold text-gray-800 mb-2">How to use:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Click "Add Rectangle" to create new shapes</li>
                    <li>• Drag rectangles to move them around</li>
                    <li>• Open multiple tabs to see real-time collaboration</li>
                    <li>• All changes sync across all connected clients</li>
                </ul>
            </div>
        </div>
    );
};

export default Controls;
