import { useEffect } from 'react';
import Canvas from './components/Canvas';
import Controls from './components/Controls';
import { useCanvasStore } from './store/canvasStore';

function App() {
    const { connectSocket, disconnectSocket } = useCanvasStore();

    useEffect(() => {
        connectSocket();
        return () => {
            disconnectSocket();
        };
    }, [connectSocket, disconnectSocket]);

    return (
        <div className="relative w-full h-full overflow-hidden">
            <div
                className="fixed inset-0 pointer-events-none opacity-5"
                style={{ zIndex: 0 }}
            >
                <div className="absolute inset-0" style={{
                    backgroundImage: `
            radial-gradient(circle at 25% 25%, #3B82F6 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, #8B5CF6 2px, transparent 2px)
          `,
                    backgroundSize: '50px 50px'
                }} />
            </div>

            <div style={{ zIndex: 1 }}>
                <Canvas />
            </div>

            {/* Controls - Highest z-index */}
            <div style={{ zIndex: 1000 }}>
                <Controls />
            </div>
        </div>
    );
}

export default App;
