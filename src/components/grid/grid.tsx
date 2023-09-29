import React from "react";
import styles from "./grid.module.css";
// import { useDrag, useDrop } from "react-dnd";
// import { ItemTypes } from "./constants";

interface Coordinates {
  x: number;
  y: number;
}

export interface Image {
  src: string;
  size: Coordinates;
  position: Coordinates;
}

type LayoutPartType = Pick<Image, "size" | "position">

export interface Layout {
  size: Coordinates;
  content: LayoutPartType[]
}

interface GridProps {
  images: Image[];
  layout: Layout;
}

const Grid: React.FC<GridProps> = ({ layout }) => {
  return (
    <div
      className={styles.container}
      style={{
        gridTemplateColumns: `repeat(${layout.size.x}, 1fr)`,
        gridTemplateRows: `repeat(${layout.size.y}, 1fr)`,
      }}
    >
      {layout.content.map((layoutPart, index) => (
        <ItemDroppable key={index} position={layoutPart.position} size={layoutPart.size} />
      ))}
    </div>
  );
};

const ItemDroppable: React.FC<LayoutPartType> = ({position, size}) => {
  return (
    <div
      className={styles.image}
      style={{
        gridRowStart: position.y + 1,
        gridRowEnd: position.y + size.y + 1,
        gridColumnStart: position.x + 1,
        gridColumnEnd: position.x + size.x + 1,
      }}
    >
    </div>
  )
}

// interface ItemDraggableProps {
//   image: Image;
// }

// const ItemDraggable: React.FC<ItemDraggableProps> = ({ image }) => {
//   const [{ opacity }, dragRef] = useDrag(() => ({
//     type: ItemTypes.ITEM_DRAGGABLE,
//     collect: (monitor) => ({
//       opacity: monitor.isDragging() ? 0.5 : 1,
//     }),
//   }));

//   const [{canDrop}, dropRef] = useDrop({
//     accept: ItemTypes.ITEM_DRAGGABLE,
//     collect: (monitor) => ( {
//       canDrop: monitor.canDrop()
//     })
//   })

//   return (
//     <div
//       ref={dragRef}
//       className={styles.image}
//       style={{
//         opacity: opacity,
//         gridRowStart: image.position.y + 1,
//         gridRowEnd: image.position.y + image.size.y + 1,
//         gridColumnStart: image.position.x + 1,
//         gridColumnEnd: image.position.x + image.size.x + 1,
//       }}
//     >
//       {image.src}
//     </div>
//   );
// };

export default Grid;
