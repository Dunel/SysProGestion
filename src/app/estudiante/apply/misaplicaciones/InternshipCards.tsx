import React from 'react';


interface Skill {
  id: number;
  name: string;
}

interface Internship {
  id: number;
  title: string;
  organization: string;
  location: string;
  logoUrl: string;
  skills: Skill[];
}

interface InternshipCardsProps {
  internships: Internship[];
}

const InternshipCard: React.FC<{ internship: Internship }> = ({ internship }) => (
  <div className="bg-white rounded-lg shadow-md m-4 p-2 w-full">
    <div className="flex flex-col justify-center md:flex-row md:space-x-4">
      <div className="m-1 p-1">
        <img
          src={internship.logoUrl}
          alt={`${internship.organization} logo`}
          className="h-60 w-60 rounded-full border-4 border-black-800"
        />
      </div>
      <div className="m-1 p-1 word-wrap overflow-wrap">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{internship.title}</h3>
        <p className="text-lg text-gray-600 mb-1"> <i>{internship.organization}</i></p>
        <p className="text-sm text-gray-500">{internship.location}</p>
        <br/>
        <h4 className="text-lg font-medium text-gray-700 mb-2">Habilidades requeridas:</h4>
      <ul className="list-disc list-inside">
        {internship.skills.map((skill) => (
          <li key={skill.id} className="text-gray-600">{skill.name}</li>
        ))}
      </ul>
      </div>
    </div>
    <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300">
      Retirar aplicación
    </button>
  </div>
);

const InternshipCards: React.FC<InternshipCardsProps> = ({ internships }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-4/5 mx-auto">
        {internships.map((internship) => (
          <InternshipCard key={internship.id} internship={internship} />
        ))}
      </div>
    </div>
  );
};

export default InternshipCards;