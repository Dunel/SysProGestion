// components/Modal.tsx
import React from 'react';

interface ModalProps {
    info:string
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, isLoading, info }) => {
  if (!isOpen) return null;
  return (
    <>
       
        <div className='z-30 flex flex-col justify-center items-center my-2 p-2' style={{...modalStyles.overlay, position: 'fixed' as const}}>
            
            <div className='m-2 flex flex-col justify-center items-center text-justify' style={modalStyles.modal}>
                    <h2 className='font-bold text-xl'>{info}?</h2>
                
                {!isLoading 
                ?
                    <div className=' m-2 w-[100%] flex flex-col justify-center items-center'>
                        <button 
                            className="w-[80%] p-4 m-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded transition duration-300 md:w-[50%]"
                            onClick={onConfirm}>SI, ELIMINAR</button>
                            {/* onClick={onConfirm}>Sí, retirar</button> */}
                        <button 
                            className="w-[80%] p-4 m-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded transition duration-300 md:w-[50%]"
                            onClick={onClose}>NO, CANCELAR</button>
                    </div>
               
                : <span className='m-10 text-center font-extrabold text-red-500'><i>ELIMINANDO OFERTA...</i></span>
                }
            </div>

        </div>
    
    </>
  );
};

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    background: 'white',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width:'50%',
    height:'auto',
  },
};

export default Modal;