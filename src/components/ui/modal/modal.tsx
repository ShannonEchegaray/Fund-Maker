import React, { useEffect, useRef } from "react";
import styles from "./modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose
}) => {

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const event = (e: Event) => {
      const target = e.target as HTMLElement;
      if(modalRef.current && target === modalRef.current) {
        onClose();
      }
    }

    window.addEventListener("click", event);

    return () => window.removeEventListener("click", event);
  }, [onClose])

  return (
    <div ref={modalRef} className={`${styles.modal} ${isOpen ? "" : styles.hidden}`}>
      {
        children
      }
    </div>
  )
}

export default Modal;