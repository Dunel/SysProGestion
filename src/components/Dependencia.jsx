// components/Dependencia.js

import React from 'react';

const Dependencia = () => {
  const avisos = [
    {
      codigo: 'COVP-2024-1001',
      titulo: 'Pasantía de Asesoría Legal para Mujeres en Situación de Vulnerabilidad',
      estudiante: 'María Gómez',
      descripcion: 'Estudiante de Derecho, 5to año, interesada en adquirir experiencia práctica y contribuir a la comunidad.',
      fecha: '2024-07-30',
      hora: '10:30 AM',
    },
    {
      codigo: 'COVP-2024-1002',
      titulo: 'Pasantía de Asesoría Contable para Mujeres Emprendedoras',
      estudiante: 'Juan Pérez',
      descripcion: 'Estudiante de Contaduría, 11vo trimestre, busca aplicar sus conocimientos en un entorno real y ayudar a mujeres emprendedoras.',
      fecha: '2024-07-29',
      hora: '02:15 PM',
    },
    {
      codigo: 'COVSS-2024-2001',
      titulo: 'Servicio Comunitario: Alfabetización Digital para la Mujer Adulta Mayor',
      estudiante: 'Ana Rodríguez',
      descripcion: 'Estudiante de Educación, 4to año, desea contribuir a la alfabetización digital de mujeres adultas mayores en la comunidad.',
      fecha: '2024-07-28',
      hora: '09:00 AM',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-2 bg-white rounded-lg shadow-lg mt-1">
      
      <p className="text-gray-700 mb-1">
        Dependencia de la Alcaldía de Maracaibo dedicada a la promoción de los derechos de las mujeres y su empoderamiento.
      </p>

      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Avisos de Aplicación</h3>

      <div className="space-y-4">
        {avisos.map((aviso, index) => (
          <div key={index} className="bg-blue-100 p-4 rounded-lg shadow-md">
            <h4 className="text-lg font-bold text-blue-800">{aviso.titulo}</h4>
            <p className="text-gray-600"><strong>Código de Oferta:</strong> {aviso.codigo}</p>
            <p className="text-gray-600"><strong>Estudiante:</strong> {aviso.estudiante}</p>
            <p className="text-gray-600">{aviso.descripcion}</p>
            <p className="text-gray-500 text-sm">
              <strong>Fecha:</strong> {aviso.fecha} <strong>Hora:</strong> {aviso.hora}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dependencia;
