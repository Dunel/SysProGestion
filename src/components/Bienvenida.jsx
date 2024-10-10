// components/Bienvenida.js
import React from 'react';
import Link from 'next/link';
import { motion } from "framer-motion";
import TitleH1 from "@/components/Title-h1";

export default function Bienvenida() {

  return (
    <div className='space-y-4 m-2'>


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

      <div className='w-full mx-auto p-2 m-2'>
              <TitleH1 title="BIENVENIDO A LA GESTIÓN DE PASANTÍAS Y SERVICIOS COMUNITARIOS" />
            
            <p className="text-gray-700 text-justify leading-12 mt-20 pt-24 text-2xl md:text-3xl lg:text-3xl">
              Esta aplicación web está diseñada para facilitar la gestión de los procesos de pasantías y servicios comunitarios
              en la Gerencia de Asuntos Universitarios de la Alcaldía. Aquí podrás encontrar información sobre las vacantes
              disponibles y cómo aplicar a ellas.
            </p>
      </div>
       
          <div className="w-full mx-auto p-2 rounded-lg mt-2 child w-4/5 text-xl md:text-base lg:text-xl">

            <h2 className="font-bold text-gray-800 mb-4 text-center text-2xl md:text-3xl lg:text-4xl">
              ROLES DE LA APLICACIÓN</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 h-auto">
              
              {/* Rol de Alcaldía */}
              <div className=" flex flex-col ga-1 bg-blue-50 p-4 rounded-lg h-auto">
                
                <h3 className="h-auto text-xl font-extrabold text-blue-800 mb-2 text-center">ALCALDÍA (ADMINISTRADOR)</h3>
                
                <p className="h-auto text-blue-700 mb-2 text-justify">
                  La Alcaldía es responsable de gestionar y supervisar todos los procesos de pasantías y servicios comunitarios.
                  Puede <strong> publicar y actualizar las ofertas vacantes</strong> del rol <i>"Dependencia",</i> 
                  <strong> aprobar solicitudes de estudiantes y crear perfiles desde el rol de <i>"Estudiante"</i></strong>. 
                  La Alcaldía como administrador tiene acceso a métricas de los procesos que gestiona.
                </p>
                <div className='h-[30%] p-1 m-1'>
                <img 
                  src="/images/mayor.webp"
                  alt="Alcaldía" 
                  className="mx-auto my-2 py-2 object-cover rounded-full w-auto h-40 md:h-60" />
                </div>
              </div>

              {/* Rol de Dependencia */}
              <div className="flex flex-col ga-1 bg-green-50 p-4 rounded-lg h-auto">
                
                <h3 className="h-auto text-xl font-extrabold text-green-800 mb-2 text-center">DEPENDENCIA DE ALCALDÍA</h3>
                
                <p className="h-auto text-green-700 mb-2 text-justify">
                  Las Dependencias Autorizadas por el rol <i>"Alcaldía",</i> pueden <strong> publicar y actualizar 
                  sus ofertas vacantes</strong> de pasantías y servicios comunitarios, las cuales deben ser descriptivas. 
                  El responsable del perfil debe elegir al <i>"Estudiante"</i> cuyo perfil, habilidades y domicilio 
                  se ajuste más a la vacante.
                </p>
                <div className='p-1 m-1 md:mt-14 lg:mt-20'>
                  <img 
                    src="/images/company2.png"  
                    alt="Dependencia" 
                    className="mx-auto my-2 py-2 object-cover rounded-full w-auto h-40 md:h-60" />
                </div>
              </div>

              {/* Rol de Estudiante */}
              <div className="flex flex-col gap-2 bg-yellow-50 p-4 rounded-lg h-auto">
               
                <h3 className="h-auto text-xl font-extrabold text-yellow-800 mb-2 text-center">ESTUDIANTE</h3>

                <p className="h-auto text-yellow-700 mb-2 text-justify">
                  Los Estudiantes de Universidades, Escuelas Tecnicas e Institutos de Capacitacion pueden buscar,  
                  <strong> aplicar y retirar ofertas de vacantes</strong> de pasantías y servicios comunitarios publicadas 
                  por las <i>"Dependencias"</i> que mejor se adapten a su perfil, habilidades y domicilio. 
                  El estudiente Puede ver el estado de sus solicitudes y recibir notificaciones.
                </p>
                <div className='p-1 m-1'>
                  <img 
                    src="/images/classmates.png" 
                    alt="Estudiante" 
                    className="mx-auto my-2 py-2 object-cover rounded-full w-auto h-40 md:h-60" />
                </div>
            </div>
              </div>

              <div className='space-y-4 w-full mx-auto p-6'>
                <p className="text-gray-700 text-justify text-2xl md:text-3xl lg:text-3xl leading-12">
                  Explora las diferentes secciones de la aplicación para descubrir más sobre cada rol y cómo participar 
                  en este Programa de Pasantías y Servicios Comunitarios.
                </p>
              </div>


            {/* Botones de inicio de sesión y registro */} 

            <div className="flex flex-col items-stretch my-4 text-center md:flex-row">
              <div className='w-full md:mr-4'>
                <label className="block text-gray-700 font-bold mb-1 text-xl md:text-2xl">¿Ya tienes una cuenta?</label>
                <button className="relative z-50 w-full bg-gray-950 text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl">
                  <Link href="/login">Iniciar sesión</Link>
                </button>
              </div>

              <div className='w-full md:ml-4 mt-4 md:mt-0'>
                <label className="block text-gray-700 font-bold mb-1 text-xl md:text-2xl">¿No tienes una cuenta?</label>
                <button className="relative z-50 w-full bg-gray-950 text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl">
                  <Link href="/register">Regístrate</Link>
                </button>
              </div>
            </div>



          </div>
      </motion.div>
    </div>
  );


  
};

