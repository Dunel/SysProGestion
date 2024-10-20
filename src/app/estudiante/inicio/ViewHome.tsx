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
    description: 'Completa tu perfil con detalle. Incluye tus habilidades, experiencias y aspiraciones. Un perfil completo aumenta tus posibilidades de encontrar la pasantía o servicio comunitario perfecto para ti.',
    gifSrc: '/homeEstudent/dos.gif' 
  },
  { 
    id: 3, 
    label: 'Mira ofertas', 
    title: 'Descubre oportunidades', 
    description: 'Explora una amplia gama de ofertas de pasantías y servicios comunitarios. Busca las opciones que mejor se adapten a tus intereses, habilidades y localidad.',
    gifSrc: '/homeEstudent/tres.gif' 
  },
  { 
    id: 4, 
    label: 'Aplica a oferta', 
    title: 'Da el primer paso', 
    description: 'Selecciona las ofertas que más te interesen y aplica. Puedes aplicar a todas las que desees y dale seguimiento a cada una de ellas en la opción "Mis aplicaciones".',
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
    title: '¡Felicidades!', 
    description: 'Tu solicitud ha sido aprobada. Ahora debes aceptarla para confirmar tu intención y disponibilidad. Al aceptar, prepararte para retirar el Oficio de Postulación en la alcaldía y comenzar tu pasantía o servicio comunitario en la dependencia.',
    gifSrc: '/homeEstudent/siete.gif' 
  },
  { 
    id: '6.1', 
    label: 'Declinar aprobación', 
    title: 'Evalúa tus opciones', 
    description: 'Si decides no aceptar una oferta aprobada, comunícalo de manera profesional. Agradece la oportunidad y explica brevemente tus razones. Mantén las puertas abiertas para futuras oportunidades.',
    gifSrc: '/homeEstudent/seis.gif' 
  },
  { 
    id: 7, 
    label: 'En proceso', 
    title: 'Aprovecha al máximo', 
    description: 'Has comenzado tu pasantía o servicio comunitario. Aprovecha cada día para aprender, crecer y contribuir. Mantén una actitud positiva y no dudes en pedir ayuda o aclaración cuando la necesites.',
    gifSrc: '/homeEstudent/ocho.gif' 
  },
  { 
    id: 8, 
    label: 'Proceso finalizado', 
    title: '¡Felicidades!', 
    description: '¡Has completado tu pasantía o servicio comunitario! Reflexiona sobre tu experiencia, agradece a quienes te han apoyado y considera cómo puedes aplicar lo aprendido en tu futura carrera profesional.',
    gifSrc: '/homeEstudent/nueve1.gif' 
  },
]

const HomeRoadmap: React.FC = () => {
  const [selectedStation, setSelectedStation] = useState<Station>(stations[0])

  const handleStationClick = (station: Station) => {
    setSelectedStation(station)
  }

  return (
    <>
        <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
          {/* Roadmap Section */}
          <div className="w-2/5 p-4 overflow-y-auto">
        <div className="relative">
          <div className="absolute left-3 top-5 bottom-5 w-1 bg-indigo-300"></div>
          {stations.map((station) => (
            <div key={station.id} className="mb-4 flex items-center">
              <button
                onClick={() => handleStationClick(station)}
                className={`relative z-10 w-6 h-6 rounded-full border-2 ${
                  selectedStation.id === station.id
                    ? 'bg-indigo-600 border-indigo-700 text-white'
                    : 'bg-white border-indigo-300 text-indigo-600'
                } flex items-center justify-center transition-all duration-300 hover:scale-110`}
              >
                <span className="text-xs font-semibold">{station.id}</span>
              </button>
              <div className="ml-3 flex-grow">
                <h3 className="text-sm font-semibold text-indigo-700">{station.label}</h3>
                <p className="text-xs text-gray-600">{station.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

        {/* GIF and Description Section */}
          <div className="sticky top-20 w-[60%] h-[70%] p-4 m-2 flex flex-col items-center justify-center bg-white rounded-lg shadow-xl">
              <h2 className="text-3xl font-bold mb-6 text-center text-indigo-800">{selectedStation.label}</h2>
            
            <div className="w-full max-w-2xl">
              <div className="w-[50%] relative mx-auto pb-[45.05%] rounded-lg overflow-hidden shadow-lg mb-6 md:w-[70%]">
                <Image
                  src={selectedStation.gifSrc}
                  alt={`Ilustración de ${selectedStation.label}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <p className="text-xs text-gray-700 text-justify md:text-lg">{selectedStation.description}</p>
            </div>

          </div>

        </div>
    </>
  )
}

export default HomeRoadmap 