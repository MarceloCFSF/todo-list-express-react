import { ReactNode, useCallback, useEffect, useRef } from "react";
import "./Modal.css";

export interface ModalType {
  open: boolean,
  onClose: () => void
}

interface ModalWithChildrenType extends ModalType {
  children: ReactNode,
}

const Modal = (props: ModalWithChildrenType) => {
  const { open, onClose, children } = props;
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      modalRef.current 
      && !modalRef.current.contains(event.target as Node)
    ) onClose();
  }, [onClose]);
  
  useEffect(() => {
    if (!open) return;

    setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 0);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [open, onClose, handleClickOutside]);

  if (!open) return null;

  return (
    <div ref={modalRef} className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <span onClick={onClose} className="close">&times;</span>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal;