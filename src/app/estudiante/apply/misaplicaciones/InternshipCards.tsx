import React from 'react';


interface Skill {
  id: number;
  name: string;
}

interface Internship {
  id: number;
  dependencia: string;
  imgDependencia: string;
  location: string;
  titleVacante: string;
  descriptionVacante: string;
  statusVacante: string;
  statusAplication: [
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
  <div className="flex flex-col justify-center bg-white rounded-lg shadow-md m-4 p-2 w-[90%] mx-auto my-5">
    
    <div className="flex flex-col items-center md:flex-row md:space-x-4">
        
        {/* //! IMG */}
        <div className="m-1 p-1 mx-auto h-[40%] md:w-[30%] lg:w-[20%]">
          <img
            src={internship.imgDependencia}
            alt={`${internship.dependencia} logo`}
            className="mx-auto w-60 h-60 object-cover rounded-full border-4 border-black-800 md:w-40 md:h-40"
          />
        </div>

          {/* //! INFO */}
        <div className="m-1 p-1 word-wrap overflow-wrap h-[60%] md:w-[80%]">
          
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{internship.titleVacante}</h3>
          <p className="text-lg text-gray-600 mb-1"> <i>{internship.dependencia}</i></p>
          <p className="text-sm text-gray-500">📍{internship.location}</p>
          
          <div className='flex my-2 gap-2'>
            <div className='w-[50%]'>
            <span className="text-lg font-medium text-gray-700 mb-2">Estado de la Solicitud:</span> 
              <p>{internship.statusVacante}</p>
              </div>
            <div className='w-[50%]'>
            <span className="text-lg font-medium text-gray-700 mb-2">Estado de tu Aplicacion:</span> 
              <p>{internship.statusAplication[0].status}</p>
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
                    <p>{internship.descriptionVacante}</p>
                </div>
            </div>

        </div>

    </div>
    
    <div className='flex justify-center'>
      <button className="w-[100%] p-1 m-1 bg-red-500 hover:bg-red-600 text-white font-bold rounded transition duration-300 md:w-[70%]">
        Retirar aplicación
      </button>
    </div>

  </div>
);

const InternshipCards: React.FC<InternshipCardsProps> = ({ internships }) => {
  return (
    <div className="relative z-20 mx-auto rounded shadow w-[90%]">
        {internships.map((internship) => (
          <InternshipCard key={internship.id} internship={internship} />
        ))}
      </div>
  
  );
};

export default InternshipCards;