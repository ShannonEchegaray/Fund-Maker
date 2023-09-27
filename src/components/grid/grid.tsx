import React from "react";
import styles from "./grid.module.css";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./constants";

interface Coordinates {
  x: number;
  y: number;
}

export interface Image {
  src: string;
  size: Coordinates;
  position: Coordinates;
}

interface GridProps {
  images: Image[];
  layout?: Coordinates;
}

const Grid: React.FC<GridProps> = ({ images, layout = { x: 4, y: 8 } }) => {
  return (
    <div
      className={styles.container}
      style={{
        gridTemplateColumns: `repeat(${layout.x}, 1fr)`,
        gridTemplateRows: `repeat(${layout.y}, 1fr)`,
      }}
    >
      {images.map((image) => (
        <ItemDraggable key={image.src} image={image} />
      ))}
    </div>
  );
};

interface ItemDraggableProps {
  image: Image;
}

const ItemDraggable: React.FC<ItemDraggableProps> = ({ image }) => {
  const [{ opacity }, dragRef] = useDrag(() => ({
    type: ItemTypes.ITEM_DRAGGABLE,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  }));

  return (
    <div
      ref={dragRef}
      className={styles.image}
      key={image.src}
      style={{
        opacity: opacity,
        gridRowStart: image.position.y + 1,
        gridRowEnd: image.position.y + image.size.y + 1,
        gridColumnStart: image.position.x + 1,
        gridColumnEnd: image.position.x + image.size.x + 1,
      }}
    >
      {image.src}
    </div>
  );
};

export default Grid;
