import React from "react";
import { Image, LayoutPart } from "../types";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../constants";
import styles from "./item-droppable.module.css";

interface ItemDroppableProps extends LayoutPart {
  id: number;
  onDrop: (from: number, to: number) => void;
  onDoubleClick: (index: number) => void;
  children?: React.ReactNode;
}

const ItemDroppable: React.FC<ItemDroppableProps> = ({ position, size, children, id, onDrop, onDoubleClick }) => {

  const [{canDrop, isOver}, dropRef] = useDrop({
    accept: ItemTypes.ITEM_DRAGGABLE,
    drop(_item: [number, Image]) {
      onDrop(_item[0], id);
    },
    collect: (monitor) => ( {
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver()
    })
  })

  const handleDoubleClick = () => {
    onDoubleClick(id);
  }

  const isDroppable = canDrop && isOver;

  return (
    <div
      onDoubleClick={handleDoubleClick}
      ref={dropRef}
      className={styles.image}
      style={{
        opacity: isDroppable ? 0.65 : 1,
        background: "#ccc",
        gridRowStart: position.y + 1,
        gridRowEnd: position.y + size.y + 1,
        gridColumnStart: position.x + 1,
        gridColumnEnd: position.x + size.x + 1,
      }}
    >
      {children}
    </div>
  )
}

export default ItemDroppable;