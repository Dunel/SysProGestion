// 'use client'

// import React, { useState, useEffect } from 'react';
// import { Stage, Layer, Image, Circle, Line, Text } from 'react-konva';
// import dynamic from 'next/dynamic';

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

// const ViewHome = () => {
//   const [currentStation, setCurrentStation] = useState(0);
//   const [characterPos, setCharacterPos] = useState({ x: 100, y: 100 });
//   const [gifImage, setGifImage] = useState<HTMLImageElement | null>(null);
//   const [roadWidth, setRoadWidth] = useState(0);
//   const [windowHeight, setWindowHeight] = useState(0);

//   useEffect(() => {
//     const img = new window.Image();    img.src = gifs[currentStation];
//     img.onload = () => {
//       setGifImage(img);
//     };

//     const handleResize = () => {
//       setRoadWidth(window.innerWidth * 0.3);
//       setWindowHeight(window.innerHeight);
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, [currentStation]);

//   const handleDragMove = (e: any) => {
//     const { x, y } = e.target.position();
//     setCharacterPos({ x, y });

//     stations.forEach((station, index) => {
//       const stationY = (index + 1) * 5 * windowHeight / 100;
//       if (Math.abs(x - (roadWidth / 2)) < 30 && Math.abs(y - stationY) < 30) {
//         setCurrentStation(index);
//       }
//     });
//   };

//   return (
//     <div className="flex h-screen w-full bg-sky-200">
//       <div className="flex-none w-1/3 flex justify-center items-start p-4">
//         <Stage width={roadWidth} height={windowHeight} className="pt-2 m-2">
//           <Layer>
//             <Line
//               points={[roadWidth / 2, 0, roadWidth / 2, windowHeight * 0.9]}
//               stroke="#3B82F6"
//               strokeWidth={20}
//               lineCap="round"
//             />

//             {/* Connections between stations */}
//             <Line
//               points={[
//                 roadWidth / 2, 5 * 5 * windowHeight / 100,
//                 roadWidth / 2 + 60, 6 * 5 * windowHeight / 100,
//               ]}
//               stroke="#3B82F6"
//               strokeWidth={10}
//               lineCap="round"
//             />
//             <Line
//               points={[
//                 roadWidth / 2, 6 * 5 * windowHeight / 100,
//                 roadWidth / 2 + 60, 7 * 5 * windowHeight / 100,
//               ]}
//               stroke="#3B82F6"
//               strokeWidth={10}
//               lineCap="round"
//             />
//             <Line
//               points={[
//                 roadWidth / 2, 5 * 5 * windowHeight / 100,
//                 roadWidth / 2, 6 * 5 * windowHeight / 100,
//               ]}
//               stroke="#3B82F6"
//               strokeWidth={10}
//               lineCap="round"
//             />
//             <Line
//               points={[
//                 roadWidth / 2, 6 * 5 * windowHeight / 100,
//                 roadWidth / 2, 8 * 5 * windowHeight / 100,
//               ]}
//               stroke="#3B82F6"
//               strokeWidth={10}
//               lineCap="round"
//             />

//             {stations.map((station, index) => {
//               const stationY = (index + 1) * 5 * windowHeight / 100;
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

// export default dynamic(() => Promise.resolve(ViewHome), { ssr: false });





// 'use client'

// import React, { useState } from 'react'
// import Image from 'next/image'
// import { ChevronRight, Circle } from 'lucide-react'

// type Station = {
//   id: number | string
//   label: string
//   title: string
//   description: string
//   gifSrc: string
// }

// const stations: Station[] = [
//   { id: 1, label: 'Inicio', title: '', description: 'Comienza tu viaje de pasantías aquí.', gifSrc: '/homeEstudent/uno.gif' },
//   { id: 2, label: 'Crea perfil', title: 'Completa todos los campos requeridos', description: 'Es importante que completa toda la informacion requerida en tu perfil, incluso los campos que no son oblogatorios, esto nos ayuda a conocerte mejor y para poder contactarte mas facilmente.', gifSrc: '/homeEstudent/dos.gif' },
//   { id: 3, label: 'Mira ofertas', title: '', description: 'Explora las oportunidades disponibles.', gifSrc: '/homeEstudent/tres.gif' },
//   { id: 4, label: 'Aplica a oferta', title: '', description: 'Envía tu solicitud a las ofertas que te interesen.', gifSrc: '/homeEstudent/cuatro.gif' },
//   { id: 5, label: 'Espera aprobación', title: '', description: 'La dependencia está revisando tu solicitud.', gifSrc: '/homeEstudent/cinco.gif'},
//   { id: '5.1', label: 'Declinar oferta', title: '', description: 'Has decidido no continuar con esta oferta.', gifSrc: '/homeEstudent/seis.gif' },
//   { id: 6, label: 'Aceptar aprobación', title: '', description: '¡Felicidades! Tu solicitud ha sido aprobada.', gifSrc: '/gifs/aceptar.gif' },
//   { id: '6.1', label: 'Declinar aprobación', title: '', description: 'Has decidido no aceptar la oferta aprobada.', gifSrc: '/gifs/declinar-aprobacion.gif' },
//   { id: 7, label: 'En proceso', title: '', description: 'Estás realizando tu pasantía o servicio comunitario.', gifSrc: '/gifs/proceso.gif' },
//   { id: 8, label: 'Proceso finalizado', title: '', description: '¡Has completado tu pasantía o servicio comunitario!', gifSrc: '/gifs/finalizado.gif' },
// ]

// const HomeRoadmap: React.FC = () => {
//   const [selectedStation, setSelectedStation] = useState<Station>(stations[0])

//   const handleStationClick = (station: Station) => {
//     setSelectedStation(station)
//   }

//   return (
//     <div className="flex flex-row lg:flex-row min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       {/* Roadmap Section */}
//       <div className="w-[40%] p-6 overflow-auto">
//         <h2 className="text-2xl font-bold my-2 text-center text-indigo-800">Roadmap del proceso de Pasantías y Servicios Comunitarios</h2>
//         <p className='text-base text-gray-500 text-justify m-2 p-2'>
//           <span className='font-semibold'>Haz clic sobre cada estación enumerada</span> para conocer cómo usar y aprovechar al máximo esta aplicación. 
//         </p>
//         <div className="relative">
//           {/* Main road */}
//           <div className="absolute left-4 top-0 bottom-0 w-1 bg-indigo-300"></div>

//           {/* Stations */}
//           {stations.map((station, index) => (
//             <div key={station.id} className="mb-8 flex items-center">
//               <button
//                 onClick={() => handleStationClick(station)}
//                 className={`relative z-10 w-8 h-8 rounded-full border-2 ${
//                   selectedStation.id === station.id
//                     ? 'bg-indigo-600 border-indigo-700'
//                     : 'bg-white border-indigo-300'
//                 } flex items-center justify-center transition-colors duration-300`}
//               >
//                 <span className="text-xs font-semibold">{station.id}</span>
//               </button>
//               <div className="ml-4 flex-grow">
//                 <h3 className="text-lg font-semibold text-indigo-700">{station.label}</h3>
//                 <p className="text-sm text-gray-600">{station.title}</p>
//               </div>
//               {(station.id === 5 || station.id === 6) && (
//                 <div className="absolute left-4 ml-4 h-16 w-16 border-t-2 border-r-2 border-indigo-300 rounded-tr-xl"></div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* GIF and Description Section */}
//       <div className="w-[60%] p-6 m-6 flex flex-col items-center justify-start bg-white rounded-lg shadow-xl">
//         <div className="w-full max-w-2xl">
//           <h2 className="text-3xl font-bold mb-6 text-center text-indigo-800">{selectedStation.label}</h2>
//           <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-lg mb-6">
//             <Image
//               src={selectedStation.gifSrc}
//               alt={`Ilustración de ${selectedStation.label}`}
//               layout="fill"
//               objectFit="cover"
//               className="rounded-lg"
//             />
//           </div>
//           <p className="text-xl text-center text-gray-700">{selectedStation.description}</p>
//         </div>

//       </div>
//     </div>
//   )
// }

// export default HomeRoadmap





// 'use client'

// import React, { useState } from 'react'
// import Image from 'next/image'
// import { ChevronRight, Circle } from 'lucide-react'

// type Station = {
//   id: number | string
//   label: string
//   title: string
//   description: string
//   gifSrc: string
//   isBranch?: boolean
// }

// const stations: Station[] = [
//   { 
//     id: 1, 
//     label: 'Inicio', 
//     title: 'Bienvenido a tu viaje', 
//     description: 'Aquí comienza tu emocionante viaje hacia las pasantías y el servicio comunitario. Explora las oportunidades que te esperan y prepárate para una experiencia enriquecedora.',
//     gifSrc: '/homeEstudent/uno.gif' 
//   },
//   { 
//     id: 2, 
//     label: 'Crea perfil', 
//     title: 'Muestra quién eres', 
//     description: 'Completa tu perfil con detalle. Incluye tus habilidades, experiencias y aspiraciones. Un perfil completo aumenta tus posibilidades de encontrar la pasantía perfecta para ti.',
//     gifSrc: '/homeEstudent/dos.gif' 
//   },
//   { 
//     id: 3, 
//     label: 'Mira ofertas', 
//     title: 'Descubre oportunidades', 
//     description: 'Explora una amplia gama de ofertas de pasantías y servicios comunitarios. Utiliza los filtros para encontrar las opciones que mejor se adapten a tus intereses y habilidades.',
//     gifSrc: '/homeEstudent/tres.gif' 
//   },
//   { 
//     id: 4, 
//     label: 'Aplica a oferta', 
//     title: 'Da el primer paso', 
//     description: 'Selecciona las ofertas que más te interesen y envía tu solicitud. Asegúrate de personalizar tu aplicación para destacar por qué eres el candidato ideal para cada oportunidad.',
//     gifSrc: '/homeEstudent/cuatro.gif' 
//   },
//   { 
//     id: 5, 
//     label: 'Espera aprobación', 
//     title: 'Mantén la paciencia', 
//     description: 'Tu solicitud está siendo revisada por la dependencia. Este es un buen momento para prepararte, investigar más sobre la organización y pensar en preguntas que puedas tener.',
//     gifSrc: '/homeEstudent/cinco.gif'
//   },
//   { 
//     id: '5.1', 
//     label: 'Declinar oferta', 
//     title: 'Toma decisiones informadas', 
//     description: 'Si decides no continuar con una oferta, no te preocupes. Es importante que elijas una oportunidad que se alinee con tus objetivos. Puedes volver a buscar otras ofertas que se ajusten mejor a tus necesidades.',
//     gifSrc: '/homeEstudent/seis.gif',
//     isBranch: true
//   },
//   { 
//     id: 6, 
//     label: 'Aceptar aprobación', 
//     title: '¡Enhorabuena!', 
//     description: 'Tu solicitud ha sido aprobada. Es el momento de celebrar y prepararte para comenzar tu pasantía o servicio comunitario. Asegúrate de confirmar todos los detalles con la organización.',
//     gifSrc: '/gifs/aceptar.gif' 
//   },
//   { 
//     id: '6.1', 
//     label: 'Declinar aprobación', 
//     title: 'Evalúa tus opciones', 
//     description: 'Si decides no aceptar una oferta aprobada, comunícalo de manera profesional. Agradece la oportunidad y explica brevemente tus razones. Mantén las puertas abiertas para futuras oportunidades.',
//     gifSrc: '/gifs/declinar-aprobacion.gif',
//     isBranch: true
//   },
//   { 
//     id: 7, 
//     label: 'En proceso', 
//     title: 'Aprovecha al máximo', 
//     description: 'Has comenzado tu pasantía o servicio comunitario. Aprovecha cada día para aprender, crecer y contribuir. Mantén una actitud positiva y no dudes en pedir ayuda o aclaración cuando la necesites.',
//     gifSrc: '/gifs/proceso.gif' 
//   },
//   { 
//     id: 8, 
//     label: 'Proceso finalizado', 
//     title: '¡Felicidades!', 
//     description: '¡Has completado tu pasantía o servicio comunitario! Reflexiona sobre tu experiencia, agradece a quienes te han apoyado y considera cómo puedes aplicar lo aprendido en tu futura carrera profesional.',
//     gifSrc: '/gifs/finalizado.gif' 
//   },
// ]

// const HomeRoadmap: React.FC = () => {
//   const [selectedStation, setSelectedStation] = useState<Station>(stations[0])

//   const handleStationClick = (station: Station) => {
//     setSelectedStation(station)
//   }

//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
//       {/* Roadmap Section */}
//       <div className="w-full mb-8">
//         <h2 className="text-2xl font-bold mb-6 text-center text-indigo-800">Roadmap de Pasantías y Servicios Comunitarios</h2>
//         <div className="relative overflow-x-auto">
//           <div className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-4 p-2">
//             <div className="hidden md:block absolute left-4 top-0 bottom-0 w-1 bg-indigo-300"></div>
//             <div className="md:hidden absolute left-0 right-0 top-4 h-1 bg-indigo-300"></div>
//             {stations.map((station, index) => (
//               <div key={station.id} className={`flex ${station.isBranch ? 'md:ml-8' : ''} items-center ${station.isBranch ? 'md:mt-[-2rem]' : ''}`}>
//                 <button
//                   onClick={() => handleStationClick(station)}
//                   className={`relative z-10 w-12 h-12 md:w-8 md:h-8 rounded-full border-2 ${
//                     selectedStation.id === station.id
//                       ? 'bg-indigo-600 border-indigo-700 text-white'
//                       : 'bg-white border-indigo-300 text-indigo-600'
//                   } flex items-center justify-center transition-all duration-300 hover:scale-110`}
//                 >
//                   <span className="text-xs font-semibold">{station.id}</span>
//                 </button>
//                 <div className="ml-2 md:ml-4">
//                   <h3 className="text-sm md:text-lg font-semibold text-indigo-700">{station.label}</h3>
//                   <p className="hidden md:block text-xs md:text-sm text-gray-600">{station.title}</p>
//                 </div>
//                 {station.isBranch && (
//                   <div className="hidden md:block absolute left-4 w-4 h-8 border-l-2 border-b-2 border-indigo-300 rounded-bl-xl"></div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* GIF and Description Section */}
//       <div className="w-full bg-red-200 rounded-lg shadow-xl p-6">
//         <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
//           <div className="w-full md:w-1/2">
//             <div className="bg-blue-200 relative w-full pb-[75%] rounded-lg overflow-hidden shadow-lg">
//               <Image
//                 src={selectedStation.gifSrc}
//                 alt={`Ilustración de ${selectedStation.label}`}
//                 layout="fill"
//                 objectFit="cover"
//                 className="rounded-lg"
//               />
//             </div>
//           </div>
//           <div className="w-full md:w-1/2">
//             <h2 className="text-3xl font-bold mb-4 text-indigo-800">{selectedStation.label}</h2>
//             <h3 className="text-xl font-semibold mb-2 text-indigo-600">{selectedStation.title}</h3>
//             <p className="text-gray-700 leading-relaxed">{selectedStation.description}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default HomeRoadmap





'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronRight, Circle } from 'lucide-react'

type Station = {
  id: number | string
  label: string
  title: string
  description: string
  gifSrc: string
}

const stations: Station[] = [
  { 
    id: 1, 
    label: 'Inicio', 
    title: 'Bienvenido a tu viaje', 
    description: 'Aquí comienza tu emocionante viaje hacia las pasantías y el servicio comunitario. Explora las oportunidades que te esperan y prepárate para una experiencia enriquecedora.',
    gifSrc: '/homeEstudent/uno.gif' 
  },
  { 
    id: 2, 
    label: 'Crea perfil', 
    title: 'Muestra quién eres', 
    description: 'Completa tu perfil con detalle. Incluye tus habilidades, experiencias y aspiraciones. Un perfil completo aumenta tus posibilidades de encontrar la pasantía perfecta para ti.',
    gifSrc: '/homeEstudent/dos.gif' 
  },
  { 
    id: 3, 
    label: 'Mira ofertas', 
    title: 'Descubre oportunidades', 
    description: 'Explora una amplia gama de ofertas de pasantías y servicios comunitarios. Utiliza los filtros para encontrar las opciones que mejor se adapten a tus intereses y habilidades.',
    gifSrc: '/homeEstudent/tres.gif' 
  },
  { 
    id: 4, 
    label: 'Aplica a oferta', 
    title: 'Da el primer paso', 
    description: 'Selecciona las ofertas que más te interesen y envía tu solicitud. Asegúrate de personalizar tu aplicación para destacar por qué eres el candidato ideal para cada oportunidad.',
    gifSrc: '/homeEstudent/cuatro.gif' 
  },
  { 
    id: 5, 
    label: 'Espera aprobación', 
    title: 'Mantén la paciencia', 
    description: 'Tu solicitud está siendo revisada por la dependencia. Este es un buen momento para prepararte, investigar más sobre la organización y pensar en preguntas que puedas tener.',
    gifSrc: '/homeEstudent/cinco.gif'
  },
  { 
    id: '5.1', 
    label: 'Declinar oferta', 
    title: 'Toma decisiones informadas', 
    description: 'Si decides no continuar con una oferta, no te preocupes. Es importante que elijas una oportunidad que se alinee con tus objetivos. Puedes volver a buscar otras ofertas que se ajusten mejor a tus necesidades.',
    gifSrc: '/homeEstudent/seis.gif' 
  },
  { 
    id: 6, 
    label: 'Aceptar aprobación', 
    title: '¡Enhorabuena!', 
    description: 'Tu solicitud ha sido aprobada. Es el momento de celebrar y prepararte para comenzar tu pasantía o servicio comunitario. Asegúrate de confirmar todos los detalles con la organización.',
    gifSrc: '/gifs/aceptar.gif' 
  },
  { 
    id: '6.1', 
    label: 'Declinar aprobación', 
    title: 'Evalúa tus opciones', 
    description: 'Si decides no aceptar una oferta aprobada, comunícalo de manera profesional. Agradece la oportunidad y explica brevemente tus razones. Mantén las puertas abiertas para futuras oportunidades.',
    gifSrc: '/gifs/declinar-aprobacion.gif' 
  },
  { 
    id: 7, 
    label: 'En proceso', 
    title: 'Aprovecha al máximo', 
    description: 'Has comenzado tu pasantía o servicio comunitario. Aprovecha cada día para aprender, crecer y contribuir. Mantén una actitud positiva y no dudes en pedir ayuda o aclaración cuando la necesites.',
    gifSrc: '/gifs/proceso.gif' 
  },
  { 
    id: 8, 
    label: 'Proceso finalizado', 
    title: '¡Felicidades!', 
    description: '¡Has completado tu pasantía o servicio comunitario! Reflexiona sobre tu experiencia, agradece a quienes te han apoyado y considera cómo puedes aplicar lo aprendido en tu futura carrera profesional.',
    gifSrc: '/gifs/finalizado.gif' 
  },
]

const HomeRoadmap: React.FC = () => {
  const [selectedStation, setSelectedStation] = useState<Station>(stations[0])

  const handleStationClick = (station: Station) => {
    setSelectedStation(station)
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-800">Roadmap de Pasantías y Servicios Comunitarios</h2>
      {/* Roadmap Section */}
      <div className="w-full md:w-2/5 p-4 mb-8 md:mb-0">
        <div className="md:hidden mb-6 overflow-x-auto">
          <div className="flex space-x-4 p-2">
            {stations.map((station) => (
              <button
                key={station.id}
                onClick={() => handleStationClick(station)}
                className={`flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                  selectedStation.id === station.id
                    ? 'bg-indigo-600 border-indigo-700 text-white'
                    : 'bg-white border-indigo-300 text-indigo-600'
                }`}
              >
                {station.id}
              </button>
            ))}
          </div>
        </div>
        <div className="hidden md:block relative">
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-indigo-300"></div>
          {stations.map((station, index) => (
            <div key={station.id} className="mb-8 flex items-center">
              <button
                onClick={() => handleStationClick(station)}
                className={`relative z-10 w-8 h-8 rounded-full border-2 ${
                  selectedStation.id === station.id
                    ? 'bg-indigo-600 border-indigo-700 text-white'
                    : 'bg-white border-indigo-300 text-indigo-600'
                } flex items-center justify-center transition-all duration-300 hover:scale-110`}
              >
                <span className="text-xs font-semibold">{station.id}</span>
              </button>
              <div className="ml-4 flex-grow">
                <h3 className="text-lg font-semibold text-indigo-700">{station.label}</h3>
                <p className="text-sm text-gray-600">{station.title}</p>
              </div>
              {(station.id === 5 || station.id === 6) && (
                <div className="absolute left-4 ml-4 h-16 w-16 border-t-2 border-r-2 border-indigo-300 rounded-tr-xl"></div>
              )}
            </div>
          ))}
        </div>
      </div>

     {/* GIF and Description Section */}
       <div className="w-[60%] p-6 m-6 flex flex-col items-center justify-start bg-white rounded-lg shadow-xl">
         <div className="w-full max-w-2xl">
           <h2 className="text-3xl font-bold mb-6 text-center text-indigo-800">{selectedStation.label}</h2>
           <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-lg mb-6">
             <Image
               src={selectedStation.gifSrc}
               alt={`Ilustración de ${selectedStation.label}`}
               layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <p className="text-xl text-center text-gray-700">{selectedStation.description}</p>
        </div>

      </div>

    </div>
  )
}

export default HomeRoadmap 