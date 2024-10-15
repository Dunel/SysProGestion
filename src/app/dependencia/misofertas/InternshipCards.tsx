import { useRouter } from "next/navigation";
import React from "react";
import { FaMoneyCheckAlt } from "react-icons/fa";

interface Internship {
  handleDeleteApply: Function;
  handleCloseStatus: Function;
  dependencia: {
    name: string;
    User: {
      image: string;
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
  pay: boolean;
  tutor: string;
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

export default function InternshipCards({
  internships,
}: {
  internships: Internship[];
}) {
  const router = useRouter();

  const InternshipCard: React.FC<{ internship: Internship }> = ({
    internship,
  }) => (
    <div className="flex flex-col justify-center bg-white mb-8 p-4 w-[98%] mx-auto my-1 shadow-md text-base text-justify rounded-lg md:p-8 lg:text-lg">
      {/* //!codigo & num students que han apply  */}
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
          {/* //! Han aplicado {internship._count.apply} 🧑🏽‍🎓 a esta Oferta de {internship.type === "pasantia" */}
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

      {/* //!internship.pay  */}
      {internship.pay  && (
        <span className="flex gap-2 mr-2 text-base font-bold text-green-500 lg:ml-auto">
          {`Esta vacante ofrece incentivos`}
          <FaMoneyCheckAlt style={{ color: "green" }} size={30} />
        </span>
      )}

      <div className="">
        <h3 className="text-center font-bold text-gray-800 text-lg md:text-justify sm:text-xl md:text-2xl lg:text-3xl">
          {internship.title.toUpperCase()}
        </h3>

        <div className="flex flex-col items-center md:flex-row md:space-x-4">
          {/* //! IMG */}
          <div className="relative group m-1 p-1 mx-auto md:w-auto">
            <img
              className="flex h-20 w-20 rounded-full border-4 border-black-800 object-cover sm:h-40 sm:w-40"
              src={internship.dependencia.User.image}
              alt={`${internship.dependencia} logo`}
            />
          </div>

          {/* //! INFO */}
          <div className="m-1 p-1 word-wrap overflow-wrap w-[100%] md:w-[80%] mx-auto">
            {/* <h3 className="text-center font-extrabold text-gray-800 mb-2 text-lg md:text-justify sm:text-xl md:text-2xl lg:text-3xl">
                {(internship.title).toUpperCase()}
              </h3> */}
            <p className="text-gray-600 mb-1 font-bold text-base sm:text-lg md:text-xl lg:text-2xl">
              🏦 <i>{internship.dependencia.name.toUpperCase()}</i>
            </p>
            <p className="text-gray-600 text-justify md:text-1x1">
              <strong>
                📍Ubicación de la institución a realizar la pasantia o Servicio
                Comunitario:
              </strong>{" "}
              <br />
              {internship.location}
            </p>
          </div>
        </div>

        {/* //! INFO */}
        <div className="m-1 p-1 word-wrap overflow-wrap h-[60%] md:w-[80%]">
          <div className="flex flex-col my-2 gap-2 md:flex-row">
            <div className="w-[100%] md:w-[100%]">
              <span className="text-lg font-medium text-gray-700 mb-2">
                Estado de la Oferta:
              </span>
              <p className={`font-bold ${internship.status === "active" ? 'text-green-500':'text-yellow-500'}`}>
                {internship.status === "active" ? "Activa ✅" : "Inactiva ⚠️"}
              </p>
            </div>
            <div className="w-[100%] md:w-[100%]">
              <span className="text-lg font-medium text-gray-700 mb-2">
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
            <div className="w-[100%] md:w-[100%]">
              <span className="text-lg font-medium text-gray-700 mb-2">
              {internship.type === "pasantia" ? 'Tutor Industrial:' : 'Responsable'}
              </span>
              <p>
                {internship.tutor?.length > 0 ? internship.tutor : "No asignado"}
              </p>
            </div>
          </div>

          {/* //! CONTAINER FLEX: OF SKILLS AND DESCRIPTION */}
          <div className="flex flex-col justify-center gap-2 my-2 lg:flex-row">
            <div className="m-1 w-[100%] lg:w-[40%]">
              <h4 className="text-lg font-medium text-gray-700 mb-2">
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
              <h4 className="text-lg font-medium text-gray-700 mb-2">
                Descripcion de la Vacante 📋
              </h4>
              <p>{internship.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center lg:flex-row">
        <button
          onClick={() => router.push("./misofertas/modificar/" + internship.id)}
          className="w-[100%] p-4 m-1 bg-green-700 hover:bg-green-800 text-white font-bold rounded transition duration-300 md:w-[80%]"
        >
          MODIFICAR OFERTA
        </button>
        <button
          onClick={() => router.push("./misofertas/received/" + internship.id)}
          className="w-[100%] p-4 m-1 bg-blue-700 hover:bg-blue-900 text-white font-bold rounded transition duration-300 md:w-[80%]"
        >
          GESTIONAR SOLICITUDES RECIBIDAS
        </button>
        <button
          onClick={() => internship.handleDeleteApply(internship.id, (internship.type).substring(0, 3).toUpperCase()+ "-"+ new Date(internship.date).getFullYear() +"-" +(internship.dependencia.name).substring(0, 3).toUpperCase() +"-000"+ internship.id)}
          className="w-[100%] p-4 m-1 bg-red-500 hover:bg-red-600 text-white font-bold rounded transition duration-300 md:w-[80%]"
        >
          ELIMINAR OFERTA
        </button>
        <button
          onClick={() => internship.handleCloseStatus(internship.id)}
          className="w-[100%] p-4 m-1 bg-red-500 hover:bg-red-600 text-white font-bold rounded transition duration-300 md:w-[80%]"
        >
          Cerrar Oferta
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="relative z-20 mx-auto py-2 rounded shadow w-[98%]">
        {internships.map((internship) => (
          <InternshipCard key={internship.id} internship={internship} />
        ))}
      </div>
    </>
  );
}
