import { useEffect, useState } from 'react';

export default function TitleH1({ title }) {
  const [topPosition, setTopPosition] = useState('50%');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Cambia el estado de isMobile según el tamaño de la ventana
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Considera móvil si el ancho es menor a 768px
    };

    handleResize(); // Llama a la función al montar el componente
    window.addEventListener('resize', handleResize); // Agrega el listener para cambios de tamaño

    const timer = setTimeout(() => {
      setTopPosition('7rem'); // Cambia a 7rem después de 10ms
    }, 10);

    return () => {
      clearTimeout(timer); // Limpia el timer si el componente se desmonta
      window.removeEventListener('resize', handleResize); // Limpia el listener al desmontar
    };
  }, []);

  useEffect(() => {
    setTopPosition(isMobile ? '-10%' : '50%'); // Actualiza topPosition según el estado isMobile
  }, [isMobile]);

  return (
    <div className='flex items-center justify-center text-center m-2'>
      <h1
        className={`transition-all duration-1000 absolute font-bold text-gray-900 text-3xl md:text-4xl lg:text-5xl`} // Transición de 1000ms
        style={{
          top: topPosition,
          transform: 'translateY(-50%)'
        }}
      >
        {title}
      </h1>
    </div>
  );
}