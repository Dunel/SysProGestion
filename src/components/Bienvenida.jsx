// components/Bienvenida.js

import React from 'react';
import Link from 'next/link';

const Bienvenida = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Bienvenido a la Gestión de Pasantías y Servicios Comunitarios</h1>
      <p className="text-gray-700 mb-6 text-justify">
        Esta aplicación web está diseñada para facilitar la gestión de los procesos de pasantías y servicios comunitarios
        en la Gerencia de Asuntos Universitarios de la Alcaldía. Aquí podrás encontrar información sobre las vacantes
        disponibles y cómo aplicar a ellas.
      </p>

      <h2 className="text-2xl font-bold text-gray-800 mb-4">Roles en la Aplicación</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="text-xl font-bold text-blue-800 mb-2">Alcaldía (Administrador)</h3>
          <p className="text-blue-700 mb-2 text-justify">
            La Alcaldía es responsable de gestionar y supervisar todo el proceso de pasantías y servicios comunitarios.
            Pueden publicar nuevas vacantes, aprobar solicitudes de estudiantes y generar informes.
          </p>
        </div>

        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="text-xl font-bold text-green-800 mb-2">Dependencia</h3>
          <p className="text-green-700 mb-2 text-justify">
            Las dependencias Autorizadas por la Alcaldía, pueden ofertar vacantes de pasantías
            y servicios comunitarios. Ellos describen los requisitos, habilidades y tareas de cada vacante.
          </p>
        </div>

        <div className="bg-yellow-100 p-4 rounded-lg">
          <h3 className="text-xl font-bold text-yellow-800 mb-2">Estudiante</h3>
          <p className="text-yellow-700 mb-2 text-justify">
            Los estudiantes universitarios pueden buscar y aplicar a las vacantes de pasantías y servicios comunitarios
            que mejor se adapten a su perfil y ubicación. Pueden ver el estado de sus solicitudes y recibir notificaciones.
          </p>
        </div>
      </div>

      <p className="text-gray-700 mb-4 text-justify">
        Explora las diferentes secciones de la aplicación para descubrir más sobre cada rol y cómo participar en este
        programa de pasantías y servicios comunitarios.
      </p>

      <div className="flex justify-center mb-4 text-justify">
        <Link href="/registro" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Regístrate aquí
       
        </Link>
      </div>
    </div>
  );
};

export default Bienvenida;
