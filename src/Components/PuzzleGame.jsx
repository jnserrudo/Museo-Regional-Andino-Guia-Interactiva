import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  useDraggable, // Importado aquí
  useDroppable, // Importado aquí
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

// Asegúrate de tener este archivo CSS en la misma carpeta o ajusta la ruta
import '../puzzleGame.css';

// --- Constantes Configurables ---
const PUZZLE_GRID_SIZE = 3; // Número de filas/columnas
const IMAGE_SRC = "/historia_museo.png"; // Asegúrate que esté en /public

// --- Helper Function ---
const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

// --- Componente Visual y Draggable de la Pieza ---
function Piece({
    pieceData,
    imageSrc,
    pieceSize,
    containerSize,
    isDragging = false,
    isOverlay = false,
    isSolved = false,
    listeners,
    attributes,
    setNodeRef,
    style: draggableStyle
}) {
    const pieceStyle = {
        width: `${pieceSize}px`,
        height: `${pieceSize}px`,
        backgroundImage: `url(${import.meta.env.BASE_URL}${imageSrc})`,
        backgroundPosition: `-${pieceData.correctCol * pieceSize}px -${pieceData.correctRow * pieceSize}px`,
        backgroundSize: `${containerSize.width}px ${containerSize.height}px`,
    };

    const combinedStyle = { ...pieceStyle, ...draggableStyle };

    const classNames = [
        'puzzle-piece',
        isOverlay ? 'piece-overlay' : '',
        isDragging && !isOverlay ? 'dragging-source' : '',
        isSolved ? 'solved' : ''
    ].filter(Boolean).join(' ');

    return (
        <div
            ref={setNodeRef}
            style={combinedStyle}
            className={classNames}
            {...listeners}
            {...attributes}
        />
    );
}

// --- Componente Slot del Grid (Droppable) ---
function PuzzleSlot({ id, children, pieceSize }) {
    const { setNodeRef, isOver } = useDroppable({ id });

    const style = {
        width: `${pieceSize}px`,
        height: `${pieceSize}px`,
    };

    const classNames = [
        'puzzle-slot',
        isOver ? 'over' : ''
    ].filter(Boolean).join(' ');

    return (
        <div ref={setNodeRef} style={style} className={classNames}>
            {children}
        </div>
    );
}

// --- Componente Principal PuzzleGame ---
export const PuzzleGame = () => {
    // --- Estados ---
    const [piecesInSlots, setPiecesInSlots] = useState(Array(PUZZLE_GRID_SIZE * PUZZLE_GRID_SIZE).fill(null));
    const [activeId, setActiveId] = useState(null);
    const [isSolved, setIsSolved] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [containerSize, setContainerSize] = useState({ width: 300, height: 300 });
    const [pieceSize, setPieceSize] = useState(100);
    const gridContainerRef = useRef(null);

    // --- Cálculo de Tamaño Responsivo ---
    useEffect(() => {
        const calculateSize = () => {
            if (gridContainerRef.current) {
                const availableWidth = gridContainerRef.current.offsetWidth;
                const maxWidth = 600;
                const minWidth = 240;
                const targetWidth = Math.max(minWidth, Math.min(availableWidth, maxWidth));
                const newPieceSize = Math.floor(targetWidth / PUZZLE_GRID_SIZE);
                const newContainerWidth = newPieceSize * PUZZLE_GRID_SIZE;
                setPieceSize(newPieceSize);
                setContainerSize({ width: newContainerWidth, height: newContainerWidth });
                console.log("Calculated Size:", { piece: newPieceSize, container: newContainerWidth });
            }
        };
        calculateSize();
        window.addEventListener('resize', calculateSize);
        return () => window.removeEventListener('resize', calculateSize);
    }, []); // Ejecutar solo al montar/desmontar

    // --- Lógica del Puzzle ---
    const checkSolved = useCallback((currentSlotData) => {
        if (!currentSlotData || currentSlotData.length !== PUZZLE_GRID_SIZE * PUZZLE_GRID_SIZE || currentSlotData.some(p => p === null)) return false;
        for (let i = 0; i < currentSlotData.length; i++) {
            if (currentSlotData[i].id !== i) return false;
        }
        return true;
    }, []); // Dependencia vacía, la lógica no cambia

    useEffect(() => {
        if (piecesInSlots.every(p => p === null)) { // Solo inicializar si está vacío
            console.log("Initializing puzzle...");
            setIsLoading(true); setError(null); setIsSolved(false);
            const img = new Image();
            img.onload = () => {
                const totalPieces = PUZZLE_GRID_SIZE * PUZZLE_GRID_SIZE;
                const initialPiecesData = Array.from({ length: totalPieces }, (_, i) => ({
                    id: i,
                    correctRow: Math.floor(i / PUZZLE_GRID_SIZE),
                    correctCol: i % PUZZLE_GRID_SIZE,
                }));
                let shuffled = shuffleArray(initialPiecesData);
                while (checkSolved(shuffled)) { // Evitar estado resuelto inicial
                    shuffled = shuffleArray(initialPiecesData);
                }
                setPiecesInSlots(shuffled);
                setIsLoading(false);
            };
            img.onerror = () => {
                const errorMsg = `Error al cargar la imagen: ${IMAGE_SRC}. Asegúrate que esté en la carpeta /public.`;
                console.error(errorMsg); setError(errorMsg); setIsLoading(false);
            };
            // Construir URL correctamente con BASE_URL (para Vite, etc.)
            let imageUrl = IMAGE_SRC;
            if (import.meta.env.BASE_URL && !IMAGE_SRC.startsWith(import.meta.env.BASE_URL)) {
                imageUrl = (import.meta.env.BASE_URL + IMAGE_SRC).replace('//', '/'); // Evita doble //
            }
             img.src = imageUrl;

        } else {
             setIsLoading(false); // Ya estaba inicializado
        }
    }, [checkSolved]); // Ejecutar al montar o si checkSolved cambia (no debería)

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(KeyboardSensor)
    );

    const handleDragStart = useCallback((event) => {
        setActiveId(event.active.id);
    }, []);

    const handleDragEnd = useCallback((event) => {
        const { active, over } = event;
        setActiveId(null); // Limpiar pieza activa

        if (over && active.id !== over.id) { // Asegurar que se soltó sobre un slot diferente
            const activePieceId = active.id;
            const targetSlotId = over.id;
            const sourceSlotIndex = piecesInSlots.findIndex(p => p?.id === activePieceId);
            const targetSlotIndex = parseInt(String(targetSlotId).replace('slot-', ''), 10);

            if (sourceSlotIndex !== -1 && !isNaN(targetSlotIndex)) {
                setPiecesInSlots((currentPieces) => {
                    const nextPieces = [...currentPieces];
                    // Realizar el intercambio
                    const pieceInTargetSlot = nextPieces[targetSlotIndex]; // Guardar pieza del destino
                    nextPieces[targetSlotIndex] = nextPieces[sourceSlotIndex]; // Mover activa al destino
                    nextPieces[sourceSlotIndex] = pieceInTargetSlot; // Mover del destino al origen

                    // Comprobar si está resuelto después del cambio
                    if (checkSolved(nextPieces)) {
                        setIsSolved(true);
                        console.log("¡Rompecabezas Resuelto!");
                    } else {
                        setIsSolved(false);
                    }
                    return nextPieces;
                });
            } else {
                 console.error("Error finding source or target slot index during swap");
            }
        } else {
             console.log("Drag ended without a valid target or on the same element.");
        }
    }, [piecesInSlots, checkSolved]); // Depende de piecesInSlots para cálculo correcto

    const handleDragCancel = useCallback(() => {
        setActiveId(null);
    }, []);

    // --- Componente Interno para usar useDraggable ---
    function DraggableItem({ pieceData }) {
        const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
            id: pieceData.id,
            data: { pieceData }, // Pasar datos si es necesario en onDrag...
        });

        const style = transform ? {
            transform: CSS.Translate.toString(transform),
            // zIndex se maneja en CSS
        } : undefined;

        return (
            <Piece
                pieceData={pieceData}
                imageSrc={IMAGE_SRC}
                pieceSize={pieceSize}
                containerSize={containerSize}
                isSolved={isSolved}
                // Pasar props de useDraggable a Piece
                isDragging={isDragging}
                listeners={listeners}
                attributes={attributes}
                setNodeRef={setNodeRef}
                style={style}
            />
        );
    }

    // Datos de la pieza activa para el DragOverlay
    const activePieceData = activeId !== null ? piecesInSlots.find(p => p?.id === activeId) : null;

    // --- Renderizado Principal ---
    return (
        <div className="puzzle-page-container">
            <h2 className="puzzle-title">Rompecabezas del Museo</h2>
            <p className="puzzle-instructions">
                Arrastra y suelta las piezas para reconstruir la imagen.
            </p>

            {/* Contenedor para medir */}
            <div ref={gridContainerRef} className="puzzle-grid-wrapper">
                {isLoading && <div className="puzzle-status puzzle-loading">Cargando...</div>}
                {error && <div className="puzzle-status puzzle-error">Error: {error}</div>}

                {!isLoading && !error && (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        onDragCancel={handleDragCancel}
                    >
                        {/* El Grid */}
                        <div
                            className={`puzzle-grid ${isSolved ? 'puzzle-solved' : ''}`}
                            style={{
                                gridTemplateColumns: `repeat(${PUZZLE_GRID_SIZE}, ${pieceSize}px)`,
                                gridTemplateRows: `repeat(${PUZZLE_GRID_SIZE}, ${pieceSize}px)`,
                                width: `${containerSize.width}px`,
                                height: `${containerSize.height}px`,
                            }}
                        >
                            {/* Mapear slots y renderizar DraggableItem si hay pieza */}
                            {Array.from({ length: PUZZLE_GRID_SIZE * PUZZLE_GRID_SIZE }).map((_, index) => {
                                const pieceData = piecesInSlots[index];
                                return (
                                    <PuzzleSlot key={`slot-${index}`} id={`slot-${index}`} pieceSize={pieceSize}>
                                        {pieceData && (
                                            <DraggableItem pieceData={pieceData} />
                                        )}
                                    </PuzzleSlot>
                                );
                            })}
                        </div>

                        {/* Overlay para la pieza arrastrada */}
                        <DragOverlay dropAnimation={null}>
                            {activeId !== null && activePieceData ? (
                                <Piece
                                    pieceData={activePieceData}
                                    imageSrc={IMAGE_SRC}
                                    pieceSize={pieceSize}
                                    containerSize={containerSize}
                                    isOverlay={true} // Es la copia del overlay
                                />
                            ) : null}
                        </DragOverlay>

                         {/* Mensaje de Completado */}
                        {isSolved && (
                            <div className="puzzle-complete-message solved">
                                ¡Completado!
                            </div>
                        )}
                    </DndContext>
                )}
            </div> {/* Fin puzzle-grid-wrapper */}
        </div> // Fin puzzle-page-container
    );
};