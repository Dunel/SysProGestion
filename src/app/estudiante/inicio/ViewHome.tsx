import React, { useState, useEffect } from 'react';
import { Stage, Layer, Image, Circle, Line, Text } from 'react-konva';

// Definir las estaciones y sus posiciones
const stations = [
  { label: 'Inicio', info: 'Esta es la estación inicial del proceso.', position: 0 },
  { label: 'Crea perfil', info: 'Aquí puedes crear tu perfil para continuar.', position: 1 },
  { label: 'Mira ofertas', info: 'Revisa las ofertas disponibles para aplicar.', position: 2 },
  { label: 'Aplica a oferta', info: 'Envía tu aplicación a una oferta.', position: 3 },
  { label: 'Espera aprobación', info: 'Espera la aprobación de la oferta.', position: 4 },
  { label: 'Declinar (5.1)', info: 'Aquí se termina si decides declinar la oferta.', position: 5 },
  { label: 'Aceptar aprobación', info: 'Acepta la aprobación para continuar.', position: 6 },
  { label: 'En proceso', info: 'Estás en proceso de pasantías o servicio comunitario.', position: 7 },
  { label: 'Proceso finalizado', info: 'Has finalizado el proceso exitosamente.', position: 8 },
];

const gifs = [
  'homeEstudent/uno.gif',
  'homeEstudent/dos.gif',
  'homeEstudent/tres.gif',
  'homeEstudent/cuatro.gif',
  'homeEstudent/cinco.gif',
  'homeEstudent/seis.gif',
  'homeEstudent/siete.gif',
  'homeEstudent/ocho.gif',
];

const ViewHome = () => {
  const [currentStation, setCurrentStation] = useState(0);
  const [characterPos, setCharacterPos] = useState({ x: 100, y: 100 });
  const [gifImage, setGifImage] = useState<HTMLImageElement | null>(null);
  const [roadWidth, setRoadWidth] = useState(window.innerWidth * 0.3); // 30% del ancho del contenedor padre

  useEffect(() => {
    const img = new window.Image();
    img.src = gifs[currentStation];
    img.onload = () => {
      setGifImage(img);
    };
  }, [currentStation]);

  useEffect(() => {
    const handleResize = () => {
      setRoadWidth(window.innerWidth * 0.3); // Actualizar el ancho de la carretera al 30% del ancho de la ventana
    };

    window.addEventListener('resize', handleResize); // Agregar el listener
    return () => {
      window.removeEventListener('resize', handleResize); // Limpiar el listener al desmontar
    };
  }, []);

  const handleDragMove = (e: any) => {
    const { x, y } = e.target.position();
    setCharacterPos({ x, y });

    stations.forEach((station, index) => {
      const stationY = (index + 0.5) * (100 / stations.length); // Ajustar la posición Y de la estación
      if (Math.abs(x - (roadWidth / 2)) < 30 && Math.abs(y - stationY) < 30) {
        setCurrentStation(index);
      }
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#87CEEB', height: '100vh', width: '100%' }}>
      {/* Componente de la carretera */}
      <div style={{ flex: 0.3, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '10px' }}>
        <Stage width={roadWidth} height={100} className='bg-red-200 p-2 m-2'>
          <Layer>
            {/* Carretera principal */}
            <Line
              points={[roadWidth / 2, 0, roadWidth / 2, 100]} // Usar el centro del estado
              stroke="blue"
              strokeWidth={40}
              lineCap="round"
            />

            {/* Dibujar bifurcaciones y conexiones */}
            {/* Bifurcaciones */}
            <Line points={[roadWidth / 2, 40, roadWidth / 2 - 25, 70]} stroke="black" strokeWidth={20} lineCap="round" />
            <Line points={[roadWidth / 2, 40, roadWidth / 2 + 25, 70]} stroke="black" strokeWidth={20} lineCap="round" />
            <Line points={[roadWidth / 2, 70, roadWidth / 2 - 25, 100]} stroke="black" strokeWidth={20} lineCap="round" />
            <Line points={[roadWidth / 2, 70, roadWidth / 2 + 25, 100]} stroke="black" strokeWidth={20} lineCap="round" />

            {/* Dibujar estaciones */}
            {stations.map((station, index) => {
              const stationY = (index + 0.5) * (100 / stations.length); // Posición Y para distribuir uniformemente
              return (
                <React.Fragment key={index}>
                  <Circle x={roadWidth / 2} y={stationY} radius={20} fill="white" />
                  <Text text={station.label} x={roadWidth / 2 - 40} y={stationY + 10} fontSize={16} fill="black" />
                </React.Fragment>
              );
            })}

            {/* Personaje que se mueve con el mouse */}
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

            {/* Mostrar las coordenadas del personaje */}
            <Text
              text={`Posición: (${characterPos.x.toFixed(0)}, ${characterPos.y.toFixed(0)})`}
              fontSize={16}
              fill="black"
              x={10}
              y={10}
            />
          </Layer>
        </Stage>
      </div>

      {/* Componente para mostrar el GIF y la explicación */}
      <div style={{ flex: 0.7, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', padding: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '1000px' }}>
          {/* GIF Grande */}
          <div style={{ marginBottom: '20px' }}>
            {gifImage && (
              <img
                src={gifs[currentStation]}
                alt={`Estación ${currentStation + 1}`}
                style={{ width: '250px', height: '250px', border: '2px solid black' }}
              />
            )}
          </div>

          {/* Información de la estación */}
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'monospace', color: 'black' }}>{stations[currentStation].label}</h2>
            <p style={{ fontFamily: 'monospace', color: 'black' }}>{stations[currentStation].info}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewHome;
