import React, { useState } from "react";
import {
  FaExclamation,
  FaFire,
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaMoneyCheckAlt,
  FaRegLaughSquint
} from "react-icons/fa";

type Internship = {
  handleApply: Function;
  id: number;
  title: string;
  type: "pasantia" | "servicio" | "proyecto";
  description: string;
  skills: string[];
  date: Date;
  location: string;
  status: string;
  pay: boolean | null;
  tutor: string;
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
  apply: [
    {
      id: number;
      status: string;
    }
  ];
  _count: {
    apply: number;
  };
};

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

function formatearFechaYHora(fecha: Date) {
  const date = new Date(fecha);
  const año = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, "0"); // Los meses son 0-indexados
  const dia = String(date.getDate()).padStart(2, "0");
  return `${año}/${mes}/${dia}`;
}

export default function InternshipCards({
  internships,
  btnactive,
}: {
  internships: Internship[];
  btnactive: number;
}) {
  const InternshipCard: React.FC<{ internship: Internship }> = ({
    internship,
  }) => (
    <div className="flex flex-col justify-center bg-white mb-8 p-4 w-[90%] mx-auto my-1 shadow-md text-base text-justify rounded-lg md:p-8 lg:text-lg">
      {/* codigo & num students que han apply  */}
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
          Han aplicado {internship._count.apply} 🧑🏽‍🎓 a esta Oferta de{" "}
          {internship.type === "pasantia"
            ? "Pasantias"
            : internship.type === "servicio"
            ? "Servicio Comunitario"
            : internship.type === "proyecto"
            ? "Proyecto de Tesis"
            : ""}
        </span>
      </div>

      {/* internship.pay  */}
      {internship.pay && (
        <span className="flex gap-2 mr-2 text-base font-bold text-green-500 lg:ml-auto">
          Esta vacante ofrece incentivos
          <FaMoneyCheckAlt style={{ color: "green" }} size={30} />
        </span>
      )}

      {/* //! {internship.apply[0].status === "aprobado" && INAVILITAR LOS BOTONES} */}

      {/*  IMG, title, dependencia, direccion*/}
      <div className="flex flex-col mt-2 gap-[5%] md:flex-row">
        {/*  IMG */}
        <div className="m-1 mx-auto">
          <img
            src={internship.dependencia.User.image}
            alt={`${internship.dependencia} logo`}
            className="w-40 h-40 object-cover rounded-full border-4 border-black-800"
          />
        </div>

        {/* INFO */}
        <div className="flex flex-col m-1 w-[100%] md:w-[75%]">
          <h3 className="text-center font-extrabold text-gray-800 mb-2 text-lg md:text-justify sm:text-xl md:text-2xl lg:text-3xl">
            {internship.title.toUpperCase()}
          </h3>
          <p className="text-gray-600 mb-1 font-bold text-base sm:text-lg md:text-xl lg:text-2xl">
            🏦 <i>{internship.dependencia.name.toUpperCase()}</i>
          </p>
          <p className="text-gray-600 text-justify md:text-1x1">
            <strong>📍Dirección de la Dependencia:</strong> <br />
            Municipio{" "}
            {internship.dependencia.User.parroquia?.municipio.municipio},{" "}
            <strong>
              Parroquia {internship.dependencia.User.parroquia?.parroquia},{" "}
            </strong>
            {internship.location}
          </p>
        </div>
      </div>

      <div className="flex flex-col word-wrap overflow-wrap md:text-x1">
        {/* fecha, estado y tipo de oferta */}
        <div className="flex flex-col my-2 gap-2 sm:flex-row">
          <div className="w-[100%] md:w-auto mx-auto">
            <span className="font-bold text-gray-700 mb-2">
              Fecha de la Oferta:
            </span>
            <p>{formatearFechaYHora(internship.date)}</p>
          </div>

          <div className="w-[100%] md:w-auto mx-auto">
            <span className="font-bold text-gray-700 mb-2">
              Estado de la Oferta:
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
            <span className="font-bold text-gray-700 mb-2 w-[100%] mx-auto md:w-auto">
              Tipo de Oferta:
            </span>

            <p>
              {internship.type === "pasantia"
                ? "Pasantias"
                : internship.type === "servicio"
                ? "Servicio Comunitario"
                : internship.type === "proyecto"
                ? "Proyecto de Tesis"
                : ""}
            </p>
          </div>
          <div className="w-[100%] md:w-auto mx-auto">
            <span className="font-bold text-gray-700 mb-2 w-[100%] mx-auto md:w-auto">
              Tutor o responsable:
            </span>
            <p>
              {internship.tutor
                ? internship.tutor
                : "No se ha asignado un tutor o responsable"}
            </p>
          </div>
        </div>

        {/*CONTAINER FLEX: OF SKILLS AND DESCRIPTION */}
        <div className="flex flex-col justify-center gap-4 my-2 md:flex-row">
          <div className="m-1 w-[100%] mx-auto md:w-auto">
            <span className="font-bold text-gray-700 mb-2 md:text-x1">
              🤹🏽Habilidades requeridas
            </span>
            <ul className="list-disc list-inside">
              {internship.skills.map((skill, index) => (
                <li key={index} className="text-gray-700">
                  {skillFormated[skill]}
                </li>
              ))}
            </ul>
          </div>

          <div className="m-1 w-[100%] mx-auto md:w-[60%]">
            <span className="font-bold text-gray-700 mb-2 md:text-x1">
              📋Descripcion de la Vacante
            </span>
            <p>{internship.description}</p>
          </div>
        </div>
      </div>

  {/* BUTTON TO APPLY TO THE OFFERT */}
      <div className="flex justify-center w-[100%]">
        {internship.apply.length > 0 
        ? 
          (
            <button
              className="w-full bg-gray-500 text-white font-bold py-2 rounded md:w-[50%] cursor-not-allowed"
              disabled
              >
                
              {
                internship.status === "inactive" 
                ? (
                  <div className="flex gap-2 justify-center">
                    <span>OFERTA INACTIVA</span>
                    <FaExclamation style={{ color: "white" }} size={30} />
                  </div>
                ) : internship.apply.length > 0 &&
                  internship.apply[0]?.status != "declinado" 
                  ? (
                  <div className="flex gap-2 justify-center">
                    <span>YA HAS APLICADO A ESTA OFERTA</span>
                    <FaRegThumbsUp style={{ color: "white" }} size={30} />
                  </div>
                ) : internship.apply[0]?.status === "declinado" 
                  ? (
                  <div className="flex gap-2 justify-center">
                    <span>HAS DECLINADO ESTA OFERTA</span>
                    <FaRegThumbsDown style={{ color: "white" }} size={30} />
                  </div>
                ) : null
              }
            </button>

          ) : internship.status !== "inactive" 
            ? (
                <button
                  className={`relative group/btn from-black dark:from-zinc-900 
                    dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white 
                    rounded-md h-10 font-medium 
                    shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] 
                    lg:w-[50%]
                    ${btnactive === 0 ? 'bg-green-400' : 'bg-gray-400 disabled:opacity-50 cursor-not-allowed'}
                    `}
                  onClick={() => internship.handleApply(internship.id)}
                  
                >
                  <div className="flex gap-2 justify-center">
                    <span>
                      {btnactive === 0 ? " APLICA A ESTA OFERTA!!" : "YA HAZ ACEPTADO OTRA OFERTA"}
                    </span>
                    {(btnactive === 0) 
                      ? <FaFire style={{ color: "white" }} size={30} /> 
                      : <FaRegLaughSquint style={{ color: 'white' }} size={30}/>
                    }
                  </div>

                  <BottomGradient />
                </button>
              ) 
              : 
              (
                internship.status === "inactive" && (
                  <button
                    className="w-full bg-gray-500 text-white font-bold py-2 px-4 rounded md:w-[50%]"
                    disabled
                  >
                    <div className="flex gap-2 justify-center">
                      <span>OFERTA INACTIVA</span>
                      <FaExclamation style={{ color: "white" }} size={30} />
                    </div>
                  </button>)
              )
        }

      </div>
    </div>
  );
  return (
    <>
      <div className="flex-col justify-center items-center relative z-20 py-2 mx-auto rounded shadow w-[90%]">
        {internships.map((internship) => (
          <InternshipCard key={internship.id} internship={internship} />
        ))}
      </div>
    </>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
