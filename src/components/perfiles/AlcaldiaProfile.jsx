// components/AlcaldiaProfile.js

import React from 'react';

const AlcaldiaProfile = ({ profileData }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <div className="flex items-start">
        {/* Foto del Alcalde */}
        <div className="flex-shrink-0">
          <img
            className="h-40 w-40 rounded-full border-4 border-blue-500"
            src={profileData.fotoDelRepresentante}
            alt="Foto del Representante de Alcaldia"
          />
        </div>
        {/* Información del Alcalde */}
        <div className="ml-4">
          <h2 className="text-3xl font-bold text-gray-800 pt-5">{profileData.nombreAlcaldia}</h2>
          <h2 className="text-2xl font-bold text-gray-800">{profileData.nombreCargo}</h2>
          <h3 className="text-xl text-gray-700">{profileData.nombreRepresentante}</h3>
          <p className="text-gray-600"><strong>Teléfono Personal:</strong> {profileData.telefonoPersonal}</p>
          <p className="text-gray-600"><strong>Correo Personal:</strong> {profileData.emailPersonal}</p>
        </div>
      </div>

      {/* Resto de la Información */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-gray-800">Información Institucional de la Alcaldia</h4>
        <div className="mt-2"> 
          <p className="text-gray-600"><strong>Teléfono Alcaldia:</strong> {profileData.telefonoAlcaldia}</p>
          <p className="text-gray-600"><strong>Correo Alcaldia:</strong> {profileData.emailAlcaldia}</p>
          <p className="text-gray-600"><strong>Dirección Alcaldia:</strong> {profileData.direccionAlcaldia}</p>
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

export default AlcaldiaProfile;