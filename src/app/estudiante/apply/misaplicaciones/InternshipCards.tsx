import React, { useState } from 'react';

interface Skill {
  id: number;
  name: string;
}

interface Internship {
  handleDeleteApply:Function,
  id: number;
  dependencia: string;
  imagen: string;
  location: string;
  title: string;
  type: string;
  description: string;
  status: string;
  apply: [
    {
      id: number;
      status: string;
    }
  ],
  skills: Skill[];
}

interface InternshipCardsProps {
  internships: Internship[];
}

const InternshipCard: React.FC<{ internship: Internship }> = ({ internship }) => (
  <div className="flex flex-col justify-center bg-white rounded-lg shadow-md m-4 mb-8 p-2 w-[90%] mx-auto my-5">
       
       <div className='flex'>
            {/* //!ESTE CODE DEBERIA VENIR DE UN CAPO DE LA TABLA "ofertas" CUYA NOMENCLATURA SE CREA DE SEGUN EL TIPO DE OFERTA + ANO + ID   */}
          <span className='flex  ml-auto p-1 text-red-500'>Codigo de Oferta de Vacante: {'P-2024-000'+internship.id}</span>
        
        </div>
    <div className="flex flex-col items-center md:flex-row md:space-x-4">
        {/* //! IMG */}
        <div className="flex m-1 p-1 mx-auto h-[40%] md:w-[30%] lg:w-[20%]">
          <img
            src={internship.imagen}
            alt={`${internship.dependencia} logo`}
            className="mx-auto w-60 h-60 object-cover rounded-full border-4 border-black-800 md:w-40 md:h-40"
          />
        </div>

          {/* //! INFO */}
        <div className="m-1 p-1 word-wrap overflow-wrap h-[60%] md:w-[80%]">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{internship.title}</h3>
          <p className="text-lg text-gray-600 mb-1"> <i>{internship.dependencia}</i></p>
          <p className="text-sm text-gray-500">📍{internship.location}</p>
          
          <div className='flex my-2 gap-2'>
            <div className='w-[33%]'>
            <span className="text-lg font-medium text-gray-700 mb-2">Estado de la Solicitud:</span> 
              <p>{internship.status}</p>
              </div>
            <div className='w-[33%]'>
            <span className="text-lg font-medium text-gray-700 mb-2">Estado de tu Aplicacion:</span> 
              <p>{internship.apply[0].status}</p>
              </div>
            <div className='w-[33%]'>
            <span className="text-lg font-medium text-gray-700 mb-2">Tipo de Oferta:</span> 
            {/* //! ASI QUE NO DEBERIA SER {internship.type} DADO QUE EL TYPO DEL PROCEDIMIENTO LO DEFINE LA OFERTA NO EL QUE UN ESTUDIANTE APLIQUE A ELLA */}
            {/* //! PROYECTO DE TESIS DEBERIA ESTAR EN OFERTAS? NO LO CREO */}
              <p>
                {
                internship.type === 'pasantia' ? 'Pasantias'
                : internship.type === 'servicio'? 'Servicio Cominitario'
                : internship.type === 'proyecto'? 'Proyecto de Tesis' : '' 
                }
                </p>
              </div>
          </div>


          {/* //! CONTAINER FLEX: OF SKILLS AND DESCRIPTION */}
          <div className='flex flex-col justify-center gap-2 my-2 lg:flex-row'>
              <div className='m-1 w-[100%] lg:w-[40%]'>
                  <h4 className="text-lg font-medium text-gray-700 mb-2">Habilidades requeridas 📝</h4>
                  <ul className="list-disc list-inside">
                    {internship.skills.map((skill) => (
                      <li key={skill.id} className="text-gray-600">{skill.name}</li>
                    ))}
                  </ul>
                </div>
                <div className='m-1 w-[100%] lg:w-[60%]'>
                <h4 className="text-lg font-medium text-gray-700 mb-2">Descripcion de la Vacante 📋</h4>
                    <p>{internship.description}</p>
                </div>
            </div>

        </div>

    </div>
    
    <div className='flex justify-center'>
      <button 
      onClick={() => internship.handleDeleteApply(internship.id, internship.apply[0].id)}
      className="w-[100%] p-1 m-1 bg-red-500 hover:bg-red-600 text-white font-bold rounded transition duration-300 md:w-[50%]">
        Retirar aplicación
      </button>
    </div>

  </div>
);

const InternshipCards: React.FC<InternshipCardsProps> = ({ internships }) => {

  return (
    <>
    <div className="relative z-20 mx-auto py-2 rounded shadow w-[90%]">
        {internships.map((internship) => (
          <InternshipCard key={internship.id} internship={internship}/>
        ))}
      </div>

        </>
  
  );
};

export default InternshipCards;