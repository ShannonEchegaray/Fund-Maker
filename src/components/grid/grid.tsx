import React from "react";
import styles from "./grid.module.css";
import type { Image, Layout } from "./types";
import ItemDroppable from "./item-droppable/item-droppable";
import ItemDraggable from "./item-draggable/item-draggable";

interface GridProps {
  images: Image[];
  layout: Layout;
  onSwap: (images: Image[]) => void;
  onContainerDoubleClick: (index: number) => void;
}

const Grid: React.FC<GridProps> = ({ layout, images, onSwap, onContainerDoubleClick }) => {

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
          onDrop={handleDrop}
          onDoubleClick={onContainerDoubleClick}
          key={layoutIndex} 
          id={layoutIndex}
          position={layoutPart.position} 
          size={layoutPart.size}
          children={
            images[layoutIndex] && <ItemDraggable id={layoutIndex} image={images[layoutIndex]} />
          }
        />
      ))}
    </div>
  );
};

export default Grid;
