// import React, { useState, useEffect } from 'react';
// import { Stage, Layer, Image, Circle, Line, Text } from 'react-konva';

// const stations = [
//   { label: 'Inicio', info: 'Esta es la estación inicial del proceso.', position: 0 },
//   { label: 'Crea perfil', info: 'Aquí puedes crear tu perfil para continuar.', position: 1 },
//   { label: 'Mira ofertas', info: 'Revisa las ofertas disponibles para aplicar.', position: 2 },
//   { label: 'Aplica a oferta', info: 'Envía tu aplicación a una oferta.', position: 3 },
//   { label: 'Espera aprobación', info: 'Espera la aprobación de la oferta.', position: 4 },
//   { label: 'Aceptar aprobación', info: 'Acepta la aprobación para continuar.', position: 5 },
//   { label: 'Declinar (5.1)', info: 'Aquí se termina si decides declinar la oferta.', position: 5.1, isBranch: true },
//   { label: 'En proceso', info: 'Estás en proceso de pasantías o servicio comunitario.', position: 6 },
//   { label: 'Declinar (6.1)', info: 'Aquí se termina si decides declinar la oferta.', position: 6.1, isBranch: true },
//   { label: 'Proceso finalizado', info: 'Has finalizado el proceso exitosamente.', position: 7 },
//   { label: 'Fin', info: 'Has completado todo el proceso.', position: 8 },
// ];

// const gifs = [
//   '/homeEstudent/uno.gif',
//   '/homeEstudent/dos.gif',
//   '/homeEstudent/tres.gif',
//   '/homeEstudent/cuatro.gif',
//   '/homeEstudent/cinco.gif',
//   '/homeEstudent/seis.gif',
//   '/homeEstudent/cinco-1.gif',
//   '/homeEstudent/seis-1.gif',
//   '/homeEstudent/siete.gif',
//   '/homeEstudent/ocho.gif',
// ];

// export default function ViewHome() {
//   const [currentStation, setCurrentStation] = useState(0);
//   const [characterPos, setCharacterPos] = useState({ x: 100, y: 100 });
//   const [gifImage, setGifImage] = useState<HTMLImageElement | null>(null);
//   const [roadWidth, setRoadWidth] = useState(window.innerWidth * 0.3);
  
  
  
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const img = new window.Image();
//       // Your code that uses the window object
//       img.src = gifs[currentStation];
//       img.onload = () => {
//         setGifImage(img);
//       }
//     };

//     const handleResize = () => {
//       if (typeof window !== 'undefined') { // {{ edit_1 }}
//         setRoadWidth(window.innerWidth * 0.3);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, [currentStation]);

//   const handleDragMove = (e: any) => {
//     const { x, y } = e.target.position();
//     setCharacterPos({ x, y });

//     stations.forEach((station, index) => {
//       const stationY = (index + 1) * 5 * window.innerHeight / 100;
//       if (Math.abs(x - (roadWidth / 2)) < 30 && Math.abs(y - stationY) < 30) {
//         setCurrentStation(index);
//       }
//     });
//   };

//   return (
//     <div className="flex h-screen w-full bg-sky-200">
//       <div className="flex-none w-1/3 flex justify-center items-start p-4">
//         <Stage width={roadWidth} height={window.innerHeight} className="pt-2 m-2">
//           <Layer>
//             <Line
//               points={[roadWidth / 2, 0, roadWidth / 2, window.innerHeight * 0.9]}
//               stroke="#3B82F6"
//               strokeWidth={20}
//               lineCap="round"
//             />

//             {/* Connections between stations */}
//             <Line
//               points={[
//                 roadWidth / 2, 5 * 5 * window.innerHeight / 100,
//                 roadWidth / 2 + 60, 6 * 5 * window.innerHeight / 100,
//               ]}
//               stroke="#3B82F6"
//               strokeWidth={10}
//               lineCap="round"
//             />
//             <Line
//               points={[
//                 roadWidth / 2, 6 * 5 * window.innerHeight / 100,
//                 roadWidth / 2 + 60, 7 * 5 * window.innerHeight / 100,
//               ]}
//               stroke="#3B82F6"
//               strokeWidth={10}
//               lineCap="round"
//             />
//             <Line
//               points={[
//                 roadWidth / 2, 5 * 5 * window.innerHeight / 100,
//                 roadWidth / 2, 6 * 5 * window.innerHeight / 100,
//               ]}
//               stroke="#3B82F6"
//               strokeWidth={10}
//               lineCap="round"
//             />
//             <Line
//               points={[
//                 roadWidth / 2, 6 * 5 * window.innerHeight / 100,
//                 roadWidth / 2, 8 * 5 * window.innerHeight / 100,
//               ]}
//               stroke="#3B82F6"
//               strokeWidth={10}
//               lineCap="round"
//             />

//             {stations.map((station, index) => {
//               const stationY = (index + 1) * 5 * window.innerHeight / 100;
//               const radius = 10;
//               const offsetX = station.isBranch ? 60 : 0;
//               return (
//                 <React.Fragment key={index}>
//                   <Circle
//                     x={roadWidth / 2 + offsetX}
//                     y={stationY}
//                     radius={radius}
//                     fill="white"
//                     stroke="#2563EB"
//                     strokeWidth={2}
//                   />
//                   <Text
//                     text={(index + 1).toString()}
//                     x={roadWidth / 2 - 5 + offsetX}
//                     y={stationY - 7}
//                     fontSize={12}
//                     fill="#1E40AF"
//                   />
//                   <Text
//                     text={station.label}
//                     x={roadWidth / 2 + 20 + offsetX}
//                     y={stationY - 7}
//                     fontSize={14}
//                     fill="#1E40AF"
//                   />
//                 </React.Fragment>
//               );
//             })}

//             {gifImage && (
//               <Image
//                 image={gifImage}
//                 x={characterPos.x}
//                 y={characterPos.y}
//                 width={50}
//                 height={50}
//                 draggable
//                 onDragMove={handleDragMove}
//               />
//             )}

//             <Text
//               text={`Posición: (${characterPos.x.toFixed(0)}, ${characterPos.y.toFixed(0)})`}
//               fontSize={14}
//               fill="#1E40AF"
//               x={10}
//               y={10}
//             />
//           </Layer>
//         </Stage>
//       </div>

//       <div className="flex-grow flex flex-col justify-start items-center bg-white p-8 rounded-lg shadow-lg m-4">
//         <div className="mb-8">
//           {gifImage && (
//             <img
//               src={gifs[currentStation]}
//               alt={`Estación ${currentStation + 1}`}
//               className="w-64 h-64 border-2 border-blue-500 rounded-lg shadow-md"
//             />
//           )}
//         </div>

//         <div className="text-center">
//           <h2 className="font-mono text-3xl text-blue-800 mb-4">
//             {stations[currentStation].label}
//           </h2>
//           <p className="font-sans text-xl text-gray-600">
//             {stations[currentStation].info}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



'use client'

import React, { useState, useEffect } from 'react';
import { Stage, Layer, Image, Circle, Line, Text } from 'react-konva';
import dynamic from 'next/dynamic';

const stations = [
  { label: 'Inicio', info: 'Esta es la estación inicial del proceso.', position: 0 },
  { label: 'Crea perfil', info: 'Aquí puedes crear tu perfil para continuar.', position: 1 },
  { label: 'Mira ofertas', info: 'Revisa las ofertas disponibles para aplicar.', position: 2 },
  { label: 'Aplica a oferta', info: 'Envía tu aplicación a una oferta.', position: 3 },
  { label: 'Espera aprobación', info: 'Espera la aprobación de la oferta.', position: 4 },
  { label: 'Aceptar aprobación', info: 'Acepta la aprobación para continuar.', position: 5 },
  { label: 'Declinar (5.1)', info: 'Aquí se termina si decides declinar la oferta.', position: 5.1, isBranch: true },
  { label: 'En proceso', info: 'Estás en proceso de pasantías o servicio comunitario.', position: 6 },
  { label: 'Declinar (6.1)', info: 'Aquí se termina si decides declinar la oferta.', position: 6.1, isBranch: true },
  { label: 'Proceso finalizado', info: 'Has finalizado el proceso exitosamente.', position: 7 },
  { label: 'Fin', info: 'Has completado todo el proceso.', position: 8 },
];

const gifs = [
  '/homeEstudent/uno.gif',
  '/homeEstudent/dos.gif',
  '/homeEstudent/tres.gif',
  '/homeEstudent/cuatro.gif',
  '/homeEstudent/cinco.gif',
  '/homeEstudent/seis.gif',
  '/homeEstudent/cinco-1.gif',
  '/homeEstudent/seis-1.gif',
  '/homeEstudent/siete.gif',
  '/homeEstudent/ocho.gif',
];

const ViewHome = () => {
  const [currentStation, setCurrentStation] = useState(0);
  const [characterPos, setCharacterPos] = useState({ x: 100, y: 100 });
  const [gifImage, setGifImage] = useState<HTMLImageElement | null>(null);
  const [roadWidth, setRoadWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const img = new window.Image();    img.src = gifs[currentStation];
    img.onload = () => {
      setGifImage(img);
    };

    const handleResize = () => {
      setRoadWidth(window.innerWidth * 0.3);
      setWindowHeight(window.innerHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentStation]);

  const handleDragMove = (e: any) => {
    const { x, y } = e.target.position();
    setCharacterPos({ x, y });

    stations.forEach((station, index) => {
      const stationY = (index + 1) * 5 * windowHeight / 100;
      if (Math.abs(x - (roadWidth / 2)) < 30 && Math.abs(y - stationY) < 30) {
        setCurrentStation(index);
      }
    });
  };

  return (
    <div className="flex h-screen w-full bg-sky-200">
      <div className="flex-none w-1/3 flex justify-center items-start p-4">
        <Stage width={roadWidth} height={windowHeight} className="pt-2 m-2">
          <Layer>
            <Line
              points={[roadWidth / 2, 0, roadWidth / 2, windowHeight * 0.9]}
              stroke="#3B82F6"
              strokeWidth={20}
              lineCap="round"
            />

            {/* Connections between stations */}
            <Line
              points={[
                roadWidth / 2, 5 * 5 * windowHeight / 100,
                roadWidth / 2 + 60, 6 * 5 * windowHeight / 100,
              ]}
              stroke="#3B82F6"
              strokeWidth={10}
              lineCap="round"
            />
            <Line
              points={[
                roadWidth / 2, 6 * 5 * windowHeight / 100,
                roadWidth / 2 + 60, 7 * 5 * windowHeight / 100,
              ]}
              stroke="#3B82F6"
              strokeWidth={10}
              lineCap="round"
            />
            <Line
              points={[
                roadWidth / 2, 5 * 5 * windowHeight / 100,
                roadWidth / 2, 6 * 5 * windowHeight / 100,
              ]}
              stroke="#3B82F6"
              strokeWidth={10}
              lineCap="round"
            />
            <Line
              points={[
                roadWidth / 2, 6 * 5 * windowHeight / 100,
                roadWidth / 2, 8 * 5 * windowHeight / 100,
              ]}
              stroke="#3B82F6"
              strokeWidth={10}
              lineCap="round"
            />

            {stations.map((station, index) => {
              const stationY = (index + 1) * 5 * windowHeight / 100;
              const radius = 10;
              const offsetX = station.isBranch ? 60 : 0;
              return (
                <React.Fragment key={index}>
                  <Circle
                    x={roadWidth / 2 + offsetX}
                    y={stationY}
                    radius={radius}
                    fill="white"
                    stroke="#2563EB"
                    strokeWidth={2}
                  />
                  <Text
                    text={(index + 1).toString()}
                    x={roadWidth / 2 - 5 + offsetX}
                    y={stationY - 7}
                    fontSize={12}
                    fill="#1E40AF"
                  />
                  <Text
                    text={station.label}
                    x={roadWidth / 2 + 20 + offsetX}
                    y={stationY - 7}
                    fontSize={14}
                    fill="#1E40AF"
                  />
                </React.Fragment>
              );
            })}

            {gifImage && (
              <Image
                image={gifImage}
                x={characterPos.x}
                y={characterPos.y}
                width={50}
                height={50}
                draggable
                onDragMove={handleDragMove}
              />
            )}

            <Text
              text={`Posición: (${characterPos.x.toFixed(0)}, ${characterPos.y.toFixed(0)})`}
              fontSize={14}
              fill="#1E40AF"
              x={10}
              y={10}
            />
          </Layer>
        </Stage>
      </div>

      <div className="flex-grow flex flex-col justify-start items-center bg-white p-8 rounded-lg shadow-lg m-4">
        <div className="mb-8">
          {gifImage && (
            <img
              src={gifs[currentStation]}
              alt={`Estación ${currentStation + 1}`}
              className="w-64 h-64 border-2 border-blue-500 rounded-lg shadow-md"
            />
          )}
        </div>

        <div className="text-center">
          <h2 className="font-mono text-3xl text-blue-800 mb-4">
            {stations[currentStation].label}
          </h2>
          <p className="font-sans text-xl text-gray-600">
            {stations[currentStation].info}
          </p>
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(ViewHome), { ssr: false });