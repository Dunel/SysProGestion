import React from 'react';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white w-1/2 h-1/2 rounded-lg p-8 flex flex-col justify-between z-10">
        <h3 className="text-xl font-bold mb-4">Error en el formulario</h3>
        <p className="text-red-500">{message}</p>
        <button 
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 self-end"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;