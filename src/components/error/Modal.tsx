import { ReactNode } from "react";

interface ModalProps {
  message: string;
  closeModal: () => void;
}

export default function Modal({ message, closeModal }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-1/2 h-1/2 p-8 rounded shadow-lg flex flex-col justify-between">
        <h3 className="text-lg font-bold text-center">Registro Incompleto</h3>
        <p className="text-center">{message}</p>
        <button
          onClick={closeModal}
          className="bg-blue-500 text-white py-2 px-4 rounded self-center"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
