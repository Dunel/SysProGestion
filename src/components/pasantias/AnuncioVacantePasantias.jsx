// components/InternshipOpportunity.jsx

const AnuncioVacantePasantias = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-1xl font-bold mb-4">
        Codigo de Oferta de Vacante: COVP-2024-1001
      </h2>
      <h3 className="text-2xl font-bold text-gray-800 mb-4 text-justify">
        Titulo de Oferta de Vacante: Pasantía de Asesoría Legal para Mujeres en Situación de Vulnerabilidad.
      </h3>
      <p className="text-gray-700 mb-4 text-justify">
        El Instituto Autónomo de la Mujer de la Alcaldía de Maracaibo, busca un estudiante de último trimestre de la carrera de Derecho para brindar asesoría legal a mujeres de escasos recursos en estado de vulnerabilidad. Esta es una oportunidad única para contribuir a la comunidad y adquirir experiencia práctica en el campo del derecho.
      </p>
      <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Descripción de la Vacante</h3>
      <p className="text-gray-600 mb-4 text-justify">
        Como pasante, serás responsable de asistir en la preparación de documentos legales, realizar investigaciones y brindar apoyo en consultas legales. Trabajarás bajo la supervisión de abogados experimentados y tendrás la oportunidad de aprender sobre el sistema legal y los derechos de las mujeres.
      </p>
      <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Habilidades Requeridas</h3>
      <ul className="list-disc list-inside text-gray-600 mb-4">
        <li>Conocimientos básicos de derecho</li>
        <li>Excelentes habilidades de comunicación</li>
        <li>Capacidad de trabajo en equipo</li>
        <li>Empatía y compromiso social</li>
      </ul>
      <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Dirección del Instituto</h3>
      <p className="text-gray-600 mb-4 text-justify">
        Instituto de la Mujer<br />
        Calle 123, Marcaibo, Zulia, 3000
      </p>
      <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Información Adicional</h3>
      <p className="text-gray-600 mb-4 text-justify">
        Se ofrece un estipendio mensual y la posibilidad de realizar prácticas profesionales. Los interesados pueden enviar su currículum a: <a href="mailto:contacto@institutodelamujer.com" className="text-blue-500 hover:underline">contacto@institutodelamujer.com</a>
      </p>
    </div>
  );
};

export default AnuncioVacantePasantias;