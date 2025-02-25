import { useCallback, useEffect, useRef } from "react";
import { Task } from "../models/tasks";
import "./TaskModal.css";

interface TaskModalType {
  open: boolean,
  task?: Task,
  onClose: () => void
}

const TaskModal = (props: TaskModalType) => {
  const { open, onClose } = props;
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
          <h2>Modal Header</h2>
        </div>
        <div className="modal-body">
          <p>Some text in the Modal Body</p>
          <p>Some other text...</p>
        </div>
        <div className="modal-footer">
          <h3>Modal Footer</h3>
        </div>
      </div>
    </div>
  )
}

export default TaskModal;
