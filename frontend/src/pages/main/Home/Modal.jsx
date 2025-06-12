import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-md mx-auto border border-gray-700">
        <div className="p-4 flex justify-end border-b border-gray-700">
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-200 transition-colors duration-200 text-sm font-medium"
          >
            Close
          </button>
        </div>
        <div className="p-6 text-gray-200">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;