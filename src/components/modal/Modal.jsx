// frontend/src/components/Modal.jsx
import React, { useEffect, useRef } from "react";
import { useCallback } from "react";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null);

  // Handle clicks outside the modal to close it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      console.log("im runngin")
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscapeKey);
      // Trap focus within modal
      // modalRef.current?.focus();
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  // Return null if modal is not open
  if (!isOpen) return null;

  // Render modal using portal
  return createPortal(
    <div className="fixed inset-0 backdrop-blur-sm text-white bg-opacity-90 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-[#1A202C] rounded-lg shadow-lg p-6 max-w-md w-full mx-4"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modal-title"
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            id="modal-title"
            className="text-2xl font-semibold text-white-800"
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-white-500 text-2xl cursor-pointer hover:text-white-700 focus:outline-none"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="mb-4">{children}</div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root"), // Portal target
  );
};

export default Modal;
