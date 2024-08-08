import { useEffect, useState } from 'react';
export default function TitleH1({title}) {

  const [topPosition, setTopPosition] = useState('50%');

  useEffect(() => {
    const timer = setTimeout(() => {
      setTopPosition('7rem'); // Cambia a 7rem después de 3 segundos, importante por <AuroraBackground>
    }, 10);

    return () => clearTimeout(timer); // Limpia el timer si el componente se desmonta
  }, []);
 

  return (
<div className='flex items-center justify-center text-center'>
      <h1
        className={`transition-all duration-1000 absolute font-bold text-gray-900 text-3xl md:text-5xl lg:text-5xl`} // Transición de 1000ms
        style={{ top: topPosition, transform: 'translateY(-50%)' }} // Centrado verticalmente
        >
       {title}
      </h1>
          </div>
      
   
  )
}
