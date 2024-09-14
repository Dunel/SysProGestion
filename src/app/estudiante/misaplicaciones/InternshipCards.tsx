import React, { useState } from "react";
import { FaMoneyCheckAlt } from "react-icons/fa";

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
  pay: boolean | null;
  apply: [
    {
      id: number;
      status: string;
    }
  ];
  _count: {
    apply: number;
  };
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

const colorStatys = (status: string) => {
  let colorText =
    status === "inactive"
      ? "text-yellow-500"
      : status === "active"
      ? "text-green-500"
      : status === "close"
      ? 'inactive: "text-red-500'
      : "";

  return colorText;
};
export default function InternshipCards({
  internships,
}: {
  internships: Internship[];
}) {
  const InternshipCard: React.FC<{ internship: Internship }> = ({
    internship,
  }) => (
    <div className="flex flex-col justify-center bg-white mb-8 mx-6 p-4 w-[90%] mx-auto my-1 shadow-md text-base text-justify rounded-lg md:p-8 lg:text-lg">
      
      {/* //!codigo & num students apply  */}
      <div className="flex flex-col lg:flex-row text-sm lg:gap-2">
        <span className="flex mr-2 text-red-500">
          <i>
            Codigo de Oferta de Vacante:{" "}
            {internship.type.substring(0, 3).toUpperCase() +
              "-" +
              new Date(internship.date).getFullYear() +
              "-" +
              internship.dependencia.name.substring(0, 3).toUpperCase() +
              "-000" +
              internship.id}
          </i>
        </span>

        <span className="flex mr-2 gap-2 text-gray-500 lg:ml-auto">
          Han aplicado {internship._count?.apply} 🧑🏽‍🎓 a esta Oferta de{" "}
          {internship.type === "pasantia"
            ? "Pasantias"
            : internship.type === "servicio"
            ? "Servicio Comunitario"
            : internship.type === "proyecto"
            ? "Proyecto de Tesis"
            : ""}
        </span>
      </div>

      { internship.pay &&
                <span className="flex gap-2 mr-2 text-base font-bold text-green-500 lg:ml-auto">
                Esta vacante ofrece incentivos
                <FaMoneyCheckAlt  style={{ color: 'green' }} size={30}/>  
              </span> 
        }

        {/* //! IMG, title, dependencia, direccion*/}
        <div className="flex flex-col mt-2 gap-[5%] md:flex-row">
              
              {/* //! IMG */}
              <div className="m-1 mx-auto">
                <img
                  src={internship.dependencia.User.image}
                  alt={`${internship.dependencia} logo`}
                  className="w-40 h-40 object-cover rounded-full border-4 border-black-800"
                />
              </div>

              {/* //! INFO */}
              <div className="flex flex-col m-1 w-[100%] md:w-[75%]">

                  <h3 className="text-xl text-center font-extrabold text-gray-800 mb-2 md:text-justify md:text-2xl">
                    {(internship.title).toUpperCase()}
                  </h3>
                  <p className="text-2xl text-gray-600 mb-1 font-bold">🏦
                    {" "}
                    <i>{(internship.dependencia.name).toUpperCase()}</i>
                  </p>
                  <p className="text-gray-600 text-justify md:text-1x1">
                    <strong>📍Dirección de la Dependencia:</strong>{" "}
                        <br/>
                        Municipio {internship.dependencia.User.parroquia?.municipio.municipio},{" "}
                        <strong>
                          Parroquia {(internship.dependencia.User.parroquia?.parroquia)},{" "}
                        </strong>
                        {internship.location}
                  </p>

              </div>
        </div>



        <div className="flex flex-col m-1 p-1 word-wrap overflow-wrap">

            {/* fecha, estado y tipo de oferta */}
            <div className="flex flex-col my-2 gap-2 md:flex-row">

                <div className="w-[100%] md:w-auto mx-auto">
                  <span className="font-bold text-gray-700 mb-2">
                          Estado de la Solicitud:
                  </span>
              <p className={colorStatys(internship.status)}>
                <b>
                  {" "}
                  {internship.status === "active"
                    ? "Activa ✅"
                    : internship.status === "inactive"
                    ? "Inactiva ⚠️"
                    : "Cerrada ⛔"}
                </b>
              </p>
            </div>
            <div className="w-[100%] md:w-auto mx-auto">
            <span className="font-bold text-gray-700 mb-2">
                Estado de tu Aplicacion:
              </span>
              <p>{statusFormated[internship.apply[0].status]}</p>
            </div>

            <div className="w-[100%] md:w-auto mx-auto">
            <span className="font-bold text-gray-700 mb-2 w-[100%] mx-auto md:w-auto">
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
          <div className="flex flex-col justify-center gap-4 my-2 md:flex-row">
                <div className="m-1 w-[100%] mx-auto md:w-auto">
                  <span className="font-bold text-gray-700 mb-2 md:text-x1">
                Habilidades requeridas 📝
                  </span>
              <ul className="list-disc list-inside">
                {internship.skills.map((skill, index) => (
                  <li key={index} className="text-gray-600">
                    {skillFormated[skill]}
                  </li>
                ))}
              </ul>
            </div>
            <div className="m-1 w-[100%] mx-auto md:w-[60%]">
                  <span className="font-bold text-gray-700 mb-2 md:text-x1">
                Descripcion de la Vacante 📋
              </span>
              <p className="text-justify">{internship.description}</p>
            </div>
          </div>

        </div>
   

        {/* ACCION BUTTONS */}
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
