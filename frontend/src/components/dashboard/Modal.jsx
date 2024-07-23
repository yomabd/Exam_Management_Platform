import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg w-1/2">
        <button className="text-right mb-4 text-red-500" onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
