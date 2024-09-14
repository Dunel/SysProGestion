import React, { useState } from "react";
import {
  FaMoneyCheckAlt 
} from "react-icons/fa";

interface Internship {
  handleDeleteApply: Function;
  handleAcceptApply: Function;
  dependencia: {
    name: string;
    User: {
      image: string;
      parroquia: {
        parroquia: string;
        municipio: {
          municipio: string;
        };
      };
    };
  };
  id: number;
  title: string;
  description: string;
  location: string;
  type: "pasantia" | "servicio" | "proyecto";
  imagen: string;
  date: Date;
  skills: string[];
  status: string;
  apply: [
    {
      id: number;
      status: string;
    }
  ];
}

const skillFormated: { [key: string]: string } = {
  resoluciondeproblemas: "Resolucion de problemas",
  trabajoenequipo: "Trabajo en equipo",
  adaptabilidad: "Adaptabilidad",
  comunicacionefectiva: "Comunicación efectiva",
  liderazgo: "Liderazgo",
  pensamientocritico: "Pensamiento crítico",
  orientacionaresultados: "Orientación a resultados",
  creatividad: "Creatividad",
  gestiondeltiempo: "Gestión del tiempo",
  aprendizajecontinuo: "Aprendizaje continuo",
  dondegente: "Don de gente",
  ensenanza: "Enseñanza",
  sociable: "Sociable",
  salud: "Salud",
  deportes: "Deportes",
  logistica: "Logística",
  expresionesartisticas: "Expresiones artísticas",
  diseno: "Diseño",
  musica: "Música",
  ingles: "Inglés",
  otrosidiomasnaturales: "Otros idiomas naturales",
  lenguajesdeprogramacion: "Lenguajes de programación",
};

const statusFormated: { [key: string]: string } = {
  pendiente: "Pendiente por Dependencia⌚",
  aceptado: "Has sido Aceptado! Puedes empeza!🎉",
  rechazado: "Rechazado! Intenta con otra oferta!🤓",
  declinado: "Tu has Declinado⛔",
  aprobado: "Fuiste Aprobado! ahora acepta!➡️",
  active: "Activo✅",
  inactive: "Inactivo⚠️",
};

const colorStatys = (status:string) => {

  let colorText =  status === "inactive" 
                    ? 'text-yellow-500'
                    : status === "active"
                        ? 'text-green-500'
                        : status === "close" ? 'inactive: "text-red-500': '';

return colorText;
}
export default function InternshipCards({
  internships,
}: {
  internships: Internship[];
}) {
  const InternshipCard: React.FC<{ internship: Internship }> = ({
    internship,
  }) => (


  <div className="flex flex-col justify-center text-xs bg-white rounded-lg shadow-md m-4 mb-8 p-2 w-[90%] mx-auto my-5 md:p-4 md:text-sm lg:text-base">
       
        
      {/* //!codigo & num students apply  */}
      <div  className="flex flex-col lg:flex-row text-sm lg:gap-2">    
          
          <span className="flex mr-2 text-red-500">
             <i>
            Codigo de Oferta de Vacante: {(internship.type).substring(0, 3).toUpperCase()+ "-"+ new Date(internship.date).getFullYear() +"-" +(internship.dependencia.name).substring(0, 3).toUpperCase() +"-000"+ internship.id}
            </i> 
          </span>   
   
          <span className="flex mr-2 gap-2 text-gray-500 lg:ml-auto">
          Han aplicado {80} 🧑🏽‍🎓 a esta Oferta de {internship.type === "pasantia"
                    ? "Pasantias"
                    : internship.type === "servicio"
                    ? "Servicio Comunitario"
                    : internship.type === "proyecto"
                    ? "Proyecto de Tesis"
                    : ""}
          </span> 
 
      </div>

      {/* //! TRAEEEEEEEEEEEEEER internship.pay  */}
      {/* { internship.pay && */}
      { true &&
                <span className="flex gap-2 mr-2 text-base font-bold text-green-500 lg:ml-auto">
                Esta vacante ofrece incentivos
                <FaMoneyCheckAlt  style={{ color: 'green' }} size={30}/>  
              </span>
        }


      <div className="flex flex-col items-center md:flex-row md:space-x-4">
        {/* //! IMG */}
        <div className="flex m-1 p-1">
          <img
            src={internship.dependencia.User.image}
            alt={`${internship.dependencia} logo`}
            className="mx-auto w-40 h-40 object-cover rounded-full border-4 border-black-800 md:w-40 md:h-40"
          />
        </div>

        {/* //! INFO */}
        <div className="m-1 p-1 word-wrap overflow-wrap h-[60%] md:w-[80%]">
          <h3 className="text-xl text-center font-extrabold text-gray-800 mb-2 md:text-justify md:text-2xl">
              {(internship.title).toUpperCase()}
          </h3>
          <p className="text-lg text-gray-600 mb-1">
            {" "}
            <i>{(internship.dependencia.name).toUpperCase()}</i>
          </p>


          <p className="text-gray-600 text-justify md:text-base lg:text-lg">
            <strong>📍Dirección de la Dependencia:</strong>{" "}
                <br/>
                Municipio {internship.dependencia.User.parroquia?.municipio.municipio},{" "}
                <strong>
                  Parroquia {(internship.dependencia.User.parroquia?.parroquia)},{" "}
                </strong>
                {internship.location}
          </p>

          <div className="flex flex-col gap-2 my-2 justify-center items-center mx-auto text-xs md:text-sm lg:text-base md:flex-row">
            <div className="w-[100%] md:w-auto mx-auto">
              <span className="text-sm font-medium text-gray-700">
                Estado de la Solicitud:
              </span>
              <p className={colorStatys(internship.status)} > 
                <b> {
                    internship.status === "active" ? 'Activa ✅' 
                      : internship.status === "inactive" ? 'Inactiva ⚠️' : 'Cerrada ⛔'

                    }</b>
              </p>
            </div>
            <div className="w-[100%] md:w-auto mx-auto">
              <span className="text-sm font-medium text-gray-700">
                Estado de tu Aplicacion:
              </span>
              <p>{statusFormated[internship.apply[0].status]}</p>
            </div>


            <div className="w-[100%] md:w-auto mx-auto">
              <span className="text-sm font-medium text-gray-700">
                Tipo de Oferta:
              </span>
              <p>
                {internship.type === "pasantia"
                  ? "Pasantias"
                  : internship.type === "servicio"
                  ? "Servicio Cominitario"
                  : internship.type === "proyecto"
                  ? "Proyecto de Tesis"
                  : ""}
              </p>
            </div>
          </div>

          {/* //! CONTAINER FLEX: OF SKILLS AND DESCRIPTION */}
          <div className="flex flex-col justify-center gap-2 my-2 lg:flex-row">
            <div className="m-1 w-[100%] lg:w-[40%]">
              <h4 className="text-sm font-medium text-gray-700 mb-2 md:text-lg">
                Habilidades requeridas 📝
              </h4>
              <ul className="list-disc list-inside">
                {internship.skills.map((skill, index) => (
                  <li key={index} className="text-gray-600">
                    {skillFormated[skill]}
                  </li>
                ))}
              </ul>
            </div>
            <div className="m-1 w-[100%] lg:w-[60%]">
              <h4 className="text-sm font-medium text-gray-700 mb-2 md:text-lg">
                Descripcion de la Vacante 📋
              </h4>
              <p className="text-justify">{internship.description}</p>
            </div>
          </div>
        </div>
      </div>


      <div className="flex justify-center">
        {internship.apply[0].status === "aprobado" && (
          <button
            onClick={() =>
              internship.handleAcceptApply(
                internship.id,
                internship.apply[0].id
              )
            }
            className="w-[100%] p-1 m-1 bg-green-500 hover:bg-green-600 text-white font-bold rounded transition duration-300 md:w-[50%]"
          >
            Aceptar Oferta
          </button>
        )}
        {internship.apply[0].status === "aprobado" ||
        internship.apply[0].status === "pendiente" ? (
          <button
            onClick={() =>
              internship.handleDeleteApply(
                internship.id,
                internship.apply[0].id
              )
            }
            className="w-[100%] p-1 m-1 bg-red-500 hover:bg-red-600 text-white font-bold rounded transition duration-300 md:w-[50%]"
          >
            Retirar aplicación
          </button>
        ) : null}
      </div>


    </div>
  );
  return (
    <>
      <div className="relative z-20 mx-auto py-2 rounded shadow w-[90%]">
        {internships.map((internship) => (
          <InternshipCard key={internship.id} internship={internship} />
        ))}
      </div>
    </>
  );
}
