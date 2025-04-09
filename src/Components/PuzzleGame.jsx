import React, { useState, useEffect, useCallback } from 'react';
import {
  DndContext,
  DragOverlay, // Para mostrar la pieza mientras se arrastra
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter, // Usaremos una detección simple para el drop final
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
// Ya no necesitamos SortableContext, arrayMove, strategies, useSortable
import { CSS } from '@dnd-kit/utilities'; // Todavía útil para transforms

import '../puzzleGame.css';

// --- Constantes ---
const PUZZLE_SIZE = 3;
const IMAGE_SRC = "/historia_museo.png";
const PIECE_SIZE_PX = 100;

// --- Helper Function ---
const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

// --- Componente para la Pieza Visual (usado en DragOverlay y en el grid) ---
function Piece({ pieceData, imageSrc, pieceSize, containerSize, isDragging, isOverlay = false }) {
    const style = {
        width: `${pieceSize}px`,
        height: `${pieceSize}px`,
        backgroundImage: `url(${imageSrc})`,
        backgroundPosition: `-${pieceData.correctCol * pieceSize}px -${pieceData.correctRow * pieceSize}px`,
        backgroundSize: `${containerSize.width}px ${containerSize.height}px`,
        cursor: isDragging ? 'grabbing' : (isOverlay ? 'grabbing' : 'grab'),
        opacity: isDragging && !isOverlay ? 0.5 : 1, // Ocultar la original un poco mientras se arrastra
        boxShadow: isOverlay ? '0 5px 15px rgba(0,0,0,0.3)' : 'none',
        // La propiedad touch-action: none; debe estar en el CSS asociado a .puzzle-piece o similar
    };

    // Usar una clase diferente o adicional si es la overlay para evitar conflictos de listeners/refs
    const className = `puzzle-piece ${isOverlay ? 'overlay' : ''}`;

    return (
        <div style={style} className={className}>
            {/* Contenido opcional */}
        </div>
    );
}


// --- Componente para el Slot del Grid (Droppable) ---
function PuzzleSlot({ id, children }) {
    const { setNodeRef, isOver } = useDroppable({ id }); // id del slot, e.g., 'slot-0', 'slot-1'

    const style = {
        // Podríamos añadir un estilo visual si isOver es true
        // backgroundColor: isOver ? 'rgba(0, 255, 0, 0.1)' : 'transparent',
        // transition: 'background-color 0.2s ease',
        display: 'flex', // Para contener la pieza
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <div ref={setNodeRef} style={style}>
            {children}
        </div>
    );
}


// --- Componente para la Pieza Arrastrable (Draggable) ---
function DraggablePiece({ pieceData, children }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: pieceData.id, // Usar el ID *de la pieza* como ID del draggable
        data: { pieceData }, // Pasar datos si es necesario
    });

    const style = transform ? {
        transform: CSS.Translate.toString(transform), // Aplicar solo transform para mover visualmente al arrastrar (usará DragOverlay)
    } : undefined;

     // Clonamos el children (la Pieza visual) para aplicarle los listeners y el ref
     // O envolvemos el children con un div que tenga los listeners/ref
    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
           {React.cloneElement(children, { isDragging: isDragging })}
        </div>
    );
}


// --- Componente Principal PuzzleGame ---
export const PuzzleGame = () => {
    // Estado: Mantiene un array donde el índice es la posición en el grid (0 a 8)
    // y el valor es el objeto de datos de la pieza {id, correctRow, correctCol} que está ahí.
    const [pieceDataInSlots, setPieceDataInSlots] = useState(Array(PUZZLE_SIZE * PUZZLE_SIZE).fill(null));
    const [activeId, setActiveId] = useState(null); // ID de la pieza que se está arrastrando
    const [isSolved, setIsSolved] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const containerWidth = PUZZLE_SIZE * PIECE_SIZE_PX;
    const containerHeight = PUZZLE_SIZE * PIECE_SIZE_PX;

    // Función para obtener los datos de la pieza activa (para DragOverlay)
    const getPieceDataById = (id) => pieceDataInSlots.find(p => p?.id === id);

    const checkSolved = useCallback((currentSlotData) => {
        if (!currentSlotData || currentSlotData.some(p => p === null)) return false;
        // Verifica si la pieza con id 'i' está en el slot 'i'
        for (let i = 0; i < currentSlotData.length; i++) {
            if (currentSlotData[i].id !== i) {
                return false;
            }
        }
        return true;
    }, []);

    // Inicialización
    useEffect(() => {
        setIsLoading(true);
        setError(null);
        setIsSolved(false);

        const img = new Image();
        img.onload = () => {
            const totalPieces = PUZZLE_SIZE * PUZZLE_SIZE;
            const initialPiecesData = [];
            for (let i = 0; i < totalPieces; i++) {
                initialPiecesData.push({
                    id: i,
                    correctRow: Math.floor(i / PUZZLE_SIZE),
                    correctCol: i % PUZZLE_SIZE,
                });
            }
            const shuffled = shuffleArray(initialPiecesData);
            setPieceDataInSlots(shuffled); // Coloca las piezas barajadas en los slots iniciales
            setIsLoading(false);
            if (checkSolved(shuffled)) {
                setIsSolved(true);
            }
        };
        img.onerror = () => {
            console.error("Error loading puzzle image:", IMAGE_SRC);
            setError(`Failed to load image: ${IMAGE_SRC}. Make sure it's in the /public folder.`);
            setIsLoading(false);
        };
        img.src = IMAGE_SRC;
    }, [checkSolved]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            // Puedes ajustar la distancia si el toque es muy sensible
            activationConstraint: { distance: 8 },
        }),
        useSensor(KeyboardSensor) // Mantener accesibilidad básica
    );

    const handleDragStart = (event) => {
        setActiveId(event.active.id); // Guarda el ID de la pieza que empieza a arrastrarse
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveId(null); // Limpia la pieza activa

        // Si no se soltó sobre un slot válido (over) o se soltó sobre sí mismo (no debería pasar aquí)
        if (!over || active.id === over.id) {
            return;
        }

        const activePieceId = active.id; // ID de la pieza que se movió
        const targetSlotId = over.id; // ID del slot destino (e.g., 'slot-5')

        // Encontrar los índices de los slots
        const sourceSlotIndex = pieceDataInSlots.findIndex(p => p?.id === activePieceId);
        // Extraer el índice numérico del ID del slot ('slot-5' -> 5)
        const targetSlotIndex = parseInt(targetSlotId.split('-')[1], 10);

        if (sourceSlotIndex === -1 || isNaN(targetSlotIndex)) {
            console.error("Error finding source or target slot index");
            return;
        }

        // Obtener qué pieza está actualmente en el slot destino
        const pieceInTargetSlot = pieceDataInSlots[targetSlotIndex];

        // Crear una copia del estado para modificarla
        const nextPieceDataInSlots = [...pieceDataInSlots];

        // Realizar el intercambio en el array de estado
        nextPieceDataInSlots[targetSlotIndex] = pieceDataInSlots[sourceSlotIndex]; // Poner pieza activa en slot destino
        nextPieceDataInSlots[sourceSlotIndex] = pieceInTargetSlot; // Poner pieza de destino en slot origen

        // Actualizar el estado
        setPieceDataInSlots(nextPieceDataInSlots);

        // Comprobar si se resolvió
        if (checkSolved(nextPieceDataInSlots)) {
            setIsSolved(true);
            console.log("Puzzle solved!");
        } else {
            setIsSolved(false);
        }
    };

    const handleDragCancel = () => {
        setActiveId(null);
    };


    // --- Renderizado ---
    if (isLoading) return <div className="puzzle-loading">Cargando rompecabezas...</div>;
    if (error) return <div className="puzzle-error">Error: {error}</div>;

    // Datos de la pieza activa para el DragOverlay
    const activePieceData = activeId ? getPieceDataById(activeId) : null;

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter} // Detección simple para el final del drag
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            <div
                className="puzzle-container relative"
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${PUZZLE_SIZE}, 1fr)`,
                    width: `${containerWidth}px`,
                    height: `${containerHeight}px`,
                    border: '1px solid #ccc',
                }}
            >
                {/* Renderizar los slots y las piezas dentro de ellos */}
                {pieceDataInSlots.map((pieceData, index) => (
                    <PuzzleSlot key={`slot-${index}`} id={`slot-${index}`}>
                        {pieceData && !isSolved && ( // Solo mostrar draggable si no está resuelto y hay pieza
                            <DraggablePiece pieceData={pieceData}>
                                {/* El hijo es la representación visual de la pieza */}
                                <Piece
                                    pieceData={pieceData}
                                    imageSrc={IMAGE_SRC}
                                    pieceSize={PIECE_SIZE_PX}
                                    containerSize={{ width: containerWidth, height: containerHeight }}
                                    // isDragging se pasará por DraggablePiece
                                />
                            </DraggablePiece>
                        )}
                        {pieceData && isSolved && ( // Si está resuelto, mostrar solo la pieza visual sin drag
                             <Piece
                                pieceData={pieceData}
                                imageSrc={IMAGE_SRC}
                                pieceSize={PIECE_SIZE_PX}
                                containerSize={{ width: containerWidth, height: containerHeight }}
                            />
                        )}
                    </PuzzleSlot>
                ))}
            </div>

            {/* Overlay para mostrar la pieza mientras se arrastra */}
            <DragOverlay dropAnimation={null}>
                {activeId && activePieceData ? (
                    <Piece
                        pieceData={activePieceData}
                        imageSrc={IMAGE_SRC}
                        pieceSize={PIECE_SIZE_PX}
                        containerSize={{ width: containerWidth, height: containerHeight }}
                        isOverlay={true} // Indicar que es la versión overlay
                    />
                ) : null}
            </DragOverlay>

            {/* Mensaje de completado */}
            {isSolved && <div className="puzzle-complete-message">¡Completado!</div>}
        </DndContext>
    );
};