// components/AlcaldiaProfile.js

import Link from 'next/link';

export default function EstudianteProfile ({ profileData }) {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <div className="flex items-start">
        {/* Foto del Alcalde */}
        <div className="flex-shrink-0">
          <img
            className="h-40 w-40 rounded-full border-4 border-blue-500"
            src={profileData.fotoDelEstudiante}
            alt="Foto del Representante de Alcaldia"
          />
        </div>
        {/* Información del Alcalde */}
        <div className="ml-4">
          <h2 className="text-3xl font-bold text-gray-800 pt-5 text-center">{profileData.nombreEstudiante}</h2>
          <h2 className="text-2xl font-bold text-gray-800 pt-5">{profileData.carreraEstudiante}</h2>
          <p className="text-gray-600"><strong>Cedula de identidad:</strong> {profileData.cedulaEstudiante}</p>
          <p className="text-gray-600"><strong>Teléfono:</strong> {profileData.telefonoEstudiante}</p>
          <p className="text-gray-600"><strong>Correo:</strong> {profileData.correoEstudiante}</p>
          <p className="text-gray-600"><strong>Domicilio:</strong> {profileData.domicilioEstudiante}</p>
        </div>
      </div>

    
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-gray-800">Perfil profesional</h4>
        <div className="mt-2"> 
          <p className="text-gray-600"><strong>Universidad:</strong> {profileData.universidadEstudiante}</p>
          <p className="text-gray-600"><strong>trimestre:</strong> {profileData.trimestreEstudiante}</p>
          <p className="text-gray-6000"><strong>Habilidades:</strong> {profileData.habilidadesEstudiante}</p>
          <p className="text-gray-6000"><strong>Intereses:</strong> {profileData.interesesEstudiante}</p>
          <p className="text-gray-600"><strong>Descripción:</strong> {profileData.descripcionEstudiante}</p>
          <p className="text-gray-6000"><Link  className="underline text-blue-500 hover:text-blue-700 cursor-pointer" href={'profileData.reseumenCurricularEstudiante'}> Reseumen Curricular </Link></p>
        </div>
      </div>
      <br/>
      <button
          type="submit"
          className="w-full bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Actualizar Datos
        </button>
    </div>
  );
};

