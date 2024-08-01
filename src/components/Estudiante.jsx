// components/Estudiante.js

import React from 'react';

const Estudiante = () => {
  const estudiante = {
    nombre: 'Juan Pérez',
    carrera: 'Ingeniería en Informática',
    universidad: 'Universidad Privada Dr. Rafael Belloso Chacín',
    ubicacion: 'Maracaibo, Venezuela',
    intereses: ['Desarrollo web', 'Ciberseguridad', 'Inteligencia Artificial'],
    habilidades: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
  };

  const alertas = [
    {
      codigo: 'COVP-2024-1001',
      dependencia: 'Instituto Autónomo de la Mujer',
      titulo: 'Pasantía de Asesoría Legal para Mujeres en Situación de Vulnerabilidad',
      descripcion: 'Oportunidad para aplicar tus conocimientos en derecho y contribuir al empoderamiento de mujeres vulnerables.',
      fecha: '2024-07-30',
      hora: '10:30 AM',
    },
    {
      codigo: 'COVP-2024-1002',
      dependencia: 'Instituto Municipal de Emprendimiento',
      titulo: 'Pasantía de Desarrollo Web para Emprendedores',
      descripcion: 'Desarrolla sitios web para emprendedores locales y adquiere experiencia en el campo.',
      fecha: '2024-07-29',
      hora: '02:15 PM',
    },
    {
      codigo: 'COVSS-2024-2001',
      dependencia: 'Dirección de Innovación y Tecnología',
      titulo: 'Pasantía de Ciberseguridad para el Gobierno Municipal',
      descripcion: 'Contribuye a la seguridad de los sistemas informáticos de la alcaldía y aprende sobre ciberseguridad.',
      fecha: '2024-07-28',
      hora: '09:00 AM',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      

      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Alertas de Nuevas Ofertas de Pasantías</h3>

      <div className="space-y-4">
        {alertas.map((alerta, index) => (
          <div key={index} className="bg-green-100 p-4 rounded-lg shadow-md">
            <h4 className="text-lg font-bold text-green-800">{alerta.titulo}</h4>
            <p className="text-gray-600"><strong>Código:</strong> {alerta.codigo}</p>
            <p className="text-gray-600"><strong>Dependencia:</strong> {alerta.dependencia}</p>
            <p className="text-gray-600">{alerta.descripcion}</p>
            <p className="text-gray-500 text-sm">
              <strong>Fecha:</strong> {alerta.fecha} <strong>Hora:</strong> {alerta.hora}
            </p>
            <p className="text-green-700 font-bold">
              ¡Esta pasantía es perfecta para ti! Tus intereses y habilidades encajan perfectamente con los requisitos. ¡No dejes pasar esta oportunidad de aplicar y adquirir experiencia práctica en tu campo de estudio!
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Estudiante;
