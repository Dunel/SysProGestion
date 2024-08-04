import { useEffect, useState } from 'react';
export default function TitleH1({title}) {

  const [topPosition, setTopPosition] = useState('50%');

  useEffect(() => {
    const timer = setTimeout(() => {
      setTopPosition('5rem'); // Cambia a 5rem después de 3 segundos
    }, 10);

    return () => clearTimeout(timer); // Limpia el timer si el componente se desmonta
  }, []);
 

  return (

    <div className="flex justify-center h-[3vh] m-4 mx-auto ">

      <h1
        className={`transition-all duration-1000 absolute font-bold text-gray-900 text-center text-3xl ml-5 md:ml-10 md:text-5xl lg:text-5xl`} // Transición de 1000ms
        style={{ top: topPosition, transform: 'translateY(-50%)' }} // Centrado verticalmente
        >
       {title}
      </h1>
    </div>
  )
}
