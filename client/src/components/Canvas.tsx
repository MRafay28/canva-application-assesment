import React, { useCallback } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { useCanvasStore, Rectangle } from '../store/canvasStore';

const Canvas: React.FC = () => {
    const { rectangles, updateRectanglePosition } = useCanvasStore();

    const handleDragMove = useCallback((id: string, x: number, y: number) => {
        updateRectanglePosition(id, x, y);
    }, [updateRectanglePosition]);

    return (
        <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 1,
                pointerEvents: 'auto'
            }}
        >
            <Layer>
                {rectangles.map((rect: Rectangle) => (
                    <Rect
                        key={rect.id}
                        x={rect.x}
                        y={rect.y}
                        width={rect.width}
                        height={rect.height}
                        fill={rect.fill}
                        stroke={rect.stroke}
                        strokeWidth={rect.strokeWidth}
                        draggable
                        onDragMove={(e) => {
                            const { x, y } = e.target.position();
                            handleDragMove(rect.id, x, y);
                        }}
                        shadowBlur={10}
                        shadowColor="rgba(0,0,0,0.3)"
                        shadowOffset={{ x: 2, y: 2 }}
                        cornerRadius={5}
                    />
                ))}
            </Layer>
        </Stage>
    );
};

export default Canvas;
