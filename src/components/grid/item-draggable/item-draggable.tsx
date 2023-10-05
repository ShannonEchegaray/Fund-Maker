import { useDrag } from "react-dnd";
import { ItemTypes } from "../constants";
import type { Image } from "../types";
import styles from "./item-draggable.module.css";

interface ItemDraggableProps {
  id: number;
  image: Image;
}

const ItemDraggable: React.FC<ItemDraggableProps> = ({ image, id }) => {
  const [{ opacity }, dragRef] = useDrag(() => ({
    type: ItemTypes.ITEM_DRAGGABLE,
    item: [id, image],
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  }));

  return (
    <div
      onDoubleClick={(e) => e.stopPropagation()}
      ref={dragRef}
      className={styles.image}
      style={{
        opacity: opacity,
        width: "100%",
        height: "100%",
      }}
    >
      {image.text}
    </div>
  );
};

export default ItemDraggable;