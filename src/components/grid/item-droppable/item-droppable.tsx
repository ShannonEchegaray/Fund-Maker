import React from "react";
import { Image, LayoutPart } from "../types";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../constants";
import styles from "./item-droppable.module.css";

interface ItemDroppableProps extends LayoutPart {
  id: number;
  onDrop: (from: number, to: number) => void;
  onClick: (index: number, type: "droppable" | "draggable") => void;
  selected: boolean;
  children?: React.ReactNode;
}

const ItemDroppable: React.FC<ItemDroppableProps> = ({ position, size, children, id, onDrop, onClick, selected }) => {

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

  const handleClick = () => {
    onClick(id, "droppable");
  }

  const isDroppable = canDrop && isOver;

  console.log(id, selected);

  return (
    <div
      onClick={handleClick}
      ref={dropRef}
      className={styles.image}
      style={{
        border: selected ? "blue 2px solid" : "antiquewhite 2px dashed",
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