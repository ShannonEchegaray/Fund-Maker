import React from "react";
import styles from "./grid.module.css";
import type { Image, Layout } from "./types";
import ItemDroppable from "./item-droppable/item-droppable";
import ItemDraggable from "./item-draggable/item-draggable";

interface GridProps {
  images: Image[];
  layout: Layout;
  onSwap: (images: Image[]) => void;
  onClick: (index: number, type: "draggable" | "droppable") => void;
  selected?: number | null;
}

const Grid: React.FC<GridProps> = ({ layout, images, onSwap, onClick, selected }) => {

  const handleDrop = (from: number, to: number) => {
    const imageCopy = [...images]
    imageCopy[from] = images[to]
    imageCopy[to] = images[from]
    onSwap(imageCopy);
  }

  return (
    <div
      className={styles.container}
      style={{
        gridTemplateColumns: `repeat(${layout.size.x}, 1fr)`,
        gridTemplateRows: `repeat(${layout.size.y}, 1fr)`,
      }}
    >
      {layout.content.map((layoutPart, layoutIndex) => (
        <ItemDroppable
          selected={layoutIndex === selected}
          onDrop={handleDrop}
          onClick={onClick}
          key={layoutIndex} 
          id={layoutIndex}
          position={layoutPart.position} 
          size={layoutPart.size}
          children={
            images[layoutIndex] && (
              <ItemDraggable
                onClick={onClick}
                id={layoutIndex} 
                image={images[layoutIndex]} 
              />
            )
          }
        />
      ))}
    </div>
  );
};

export default Grid;
