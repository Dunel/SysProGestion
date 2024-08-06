// components/Bienvenida.js

import React from 'react';
import Link from 'next/link';
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import TitleH1 from "@/components/Title-h1";

export default function Bienvenida() {

  return (
    <div className='space-y-4'>

     
      <TitleH1 title="Bienvenido a la Gestión de Pasantías y Servicios Comunitarios" />

  
      <motion.div
              initial={{ opacity: 0.0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}

              className="relative flex flex-col gap-4 items-center justify-center px-4 space-y-6"
            >

      <div className='space-y-4 '>
            
            <p className="text-gray-700 mt-20 text-justify text-2xl md:text-3xl lg:text-3xl p-4 leading-12">
              Esta aplicación web está diseñada para facilitar la gestión de los procesos de pasantías y servicios comunitarios
              en la Gerencia de Asuntos Universitarios de la Alcaldía. Aquí podrás encontrar información sobre las vacantes
              disponibles y cómo aplicar a ellas.
            </p>
      </div>
       
          <div className="w-full mx-auto p-6 rounded-lg shadow-lg mt-10 child w-4/5 text-xl">

            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center md:text-4xl lg:text-4xl">Roles en la Aplicación</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Rol de Alcaldía */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-blue-800 mb-2 text-center">Alcaldía (Administrador)</h3>
                <p className="text-blue-700 mb-2 text-justify">
                  La Alcaldía es responsable de gestionar y supervisar todo el proceso de pasantías y servicios comunitarios.
                  Pueden publicar nuevas vacantes, aprobar solicitudes de estudiantes y generar informes.
                </p>
                <img src="https://cdn.pixabay.com/photo/2018/02/23/19/40/elegant-3176410_640.png" alt="Alcaldía" className="w-1/3 h-1/2 mx-auto" />
              </div>

              {/* Rol de Dependencia */}
              <div className="bg-green-50 p-4 rounded-lg ">
                <h3 className="text-xl font-bold text-green-800 mb-2 text-center">Dependencia de Alcaldía</h3>
                <p className="text-green-700 mb-2 text-justify">
                  Las dependencias Autorizadas por la Alcaldía, pueden ofertar vacantes de pasantías
                  y servicios comunitarios. Ellos describen los requisitos, habilidades y tareas de cada vacante.
                </p>
                <img src="https://cdn.pixabay.com/photo/2020/12/18/00/43/business-5840870_960_720.png" alt="Dependencia" className="w-1/3 h-1/2 mx-auto" />
              </div>

              {/* Rol de Estudiante */}
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-yellow-800 mb-2 text-center">Estudiante</h3>
                <p className="text-yellow-700 mb-2 text-justify">
                  Los estudiantes universitarios pueden buscar y aplicar a las vacantes de pasantías y servicios comunitarios
                  que mejor se adapten a su perfil y ubicación. Pueden ver el estado de sus solicitudes y recibir notificaciones.
                </p>
                <img src="https://cdn.pixabay.com/photo/2021/01/28/06/23/woman-5957134_1280.png" alt="Estudiante" className="w-1/3 h-1/1 mx-auto" />
            </div>
              </div>

            <p className="text-gray-700 mb-4 text-justify text-2xl md:text-3xl lg:text-3xl">
              Explora las diferentes secciones de la aplicación para descubrir más sobre cada rol y cómo participar en este
              programa de pasantías y servicios comunitarios.
            </p>


            {/* Botón de registro */}
            <div className="flex justify-center mb-4 text-justify">
              <Link href="/register" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 m-4 rounded">
                  Regístrate
              </Link>
              <Link href="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 m-4 rounded ">
                  Inicia Sesión
              </Link>
            
            </div>
          </div>
      </motion.div>
    </div>
  );


  
};

