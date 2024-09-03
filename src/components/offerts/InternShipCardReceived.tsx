import axios from "axios";

interface Internship {
  id: number;
  title: string;
  description: string;
  location: string;
  type: "pasantia" | "servicio" | "proyecto";
  date: Date;
  skills: string[];
  status: string;
  dependencia: {
    name: string;
    User: {
      image: string;
    };
  };
  apply: [
    {
      id: number;
      status: string;
      User: {
        cedula: string;
        names: string;
        lastnames: string;
        mail: string;
        birthdate: string;
        phone: string;
        image: string;
        esInfo: {
          university: string;
          career: string;
          quarter: string;
          address: string;
          skills: string[];
          description: string;
          curriculum: string;
        };
      };
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

const ofertsType = [
  { key: "pasantia", name: "Pasantía" },
  { key: "servicio", name: "Servicio Comunitario" },
];

const ofertsStatus = [
  { key: "active", name: "Activa" },
  { key: "inactive", name: "Inactiva" },
  { key: "aceptado", name: "Aceptada" },
  { key: "pendiente", name: "Pendiente" },
  { key: "aprobado", name: "Aprobada"},
  { key: "rechazado", name: "Rechazada" },
];

export default function InternShipCardReceived({
  internship,
  getApplication,
}: {
  internship: Internship | undefined;
  getApplication: () => void;
}) {
  const updateStatus = async (status: string, id: number) => {
    try {
      const res = await axios.post(`/api/dependencia/apply/myapply/received`, {
        id,
        status,
      });
      getApplication();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data);
      } else {
        console.error("error:", error);
      }
    }
  };

  return (
    <>
      {internship ? (
        <div className="flex flex-col justify-center mb-8 w-[90%] mx-auto">
          <div className="flex">
            <span className="flex  ml-auto p-1 text-red-500">
              Codigo de Oferta de Vacante: {"P-2024-000" + internship.id}
            </span>
          </div>
          <div className="flex flex-col items-center md:flex-row md:space-x-4">
            <div className="flex m-1 p-1 mx-auto h-[40%] md:w-[30%] lg:w-[20%]">
              <img
                src={internship.dependencia.User.image}
                alt={`${internship.dependencia} logo`}
                className="mx-auto w-60 h-60 object-cover rounded-full border-4 border-black-800 md:w-40 md:h-40"
              />
            </div>

            <div className="m-1 p-1 word-wrap overflow-wrap h-[60%] md:w-[80%]">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {internship.title}
              </h3>
              <p className="text-lg text-gray-600 mb-1">
                {" "}
                <i>{internship.dependencia.name}</i>
              </p>
              <p className="text-sm text-gray-500">📍{internship.location}</p>

              <div className="flex my-2 gap-2">
                <div className="w-[33%]">
                  <span className="text-lg font-medium text-gray-700 mb-2">
                    Estado de la Solicitud:
                  </span>
                  <p>
                    {
                      ofertsStatus.find((e) => e.key === internship.status)
                        ?.name
                    }
                  </p>
                </div>
                <div className="w-[33%]">
                  <span className="text-lg font-medium text-gray-700 mb-2">
                    Tipo de Oferta:
                  </span>
                  <p>
                    {
                      ofertsType.find((type) => type.key === internship.type)
                        ?.name
                    }
                  </p>
                </div>
              </div>
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
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              {internship.apply.length > 0
                ? "Solicitudes Recibidas"
                : "No hay Solicitudes Recibidas"}
            </h3>
            {internship.apply.map((apply, index) => (
              <div
                key={index}
                className="flex flex-row items-center gap-2 p-2 border-2 border-gray-300 rounded-lg w-full"
              >
                <div className="flex-shrink-0">
                  <img
                    src={apply.User.image}
                    alt={`${apply.User.names} ${apply.User.lastnames}`}
                    className="w-20 h-20 object-cover rounded-full border-2 border-black-800"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {apply.User.names} {apply.User.lastnames}
                    </h3>
                    <p className="text-sm text-gray-600">
                      <i>{apply.User.mail}</i>
                    </p>
                    <h4 className="text-lg font-medium text-gray-700 mb-1">
                      Informacion Academica 📚
                    </h4>
                    <p>
                      <span className="font-semibold">Cedula: </span>
                      {apply.User.cedula}
                    </p>
                    <p>
                      <span className="font-semibold">Universidad: </span>
                      {apply.User.esInfo.university}
                    </p>
                    <p>
                      <span className="font-semibold">Carrera: </span>
                      {apply.User.esInfo.career}
                    </p>
                    <p>
                      <span className="font-semibold">Trimestre: </span>
                      {apply.User.esInfo.quarter}
                    </p>
                    <h4 className="text-lg font-medium text-gray-700 mb-1">
                      Habilidades 📝
                    </h4>
                    <ul className="list-disc list-inside">
                      {apply.User.esInfo.skills.map((skill, index) => (
                        <li key={index} className="text-gray-600">
                          {skillFormated[skill]}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold">Direccion: </span>
                      {apply.User.esInfo.address}
                    </p>
                    <h4 className="text-lg font-medium text-gray-700 mb-1">
                      Descripcion 📋
                    </h4>
                    <p>{apply.User.esInfo.description}</p>
                    <h4 className="text-lg font-medium text-gray-700 mb-1">
                      Curriculum 📄
                    </h4>
                    <a
                      href={apply.User.esInfo.curriculum}
                      target="_blank"
                      className="text-blue-500"
                    >
                      Ver Curriculum
                    </a>
                    <h4 className="text-lg font-medium text-gray-700 mb-1">
                      Contacto 📞
                    </h4>
                    <p>
                      <span className="font-semibold">Telefono: </span>
                      {apply.User.phone}
                    </p>
                    <p>
                      <span className="font-semibold">Correo: </span>
                      {apply.User.mail}
                    </p>
                    <h4 className="text-lg font-medium text-gray-700 mb-1">
                      Estado de la Solicitud:
                    </h4>
                    <p>
                      {ofertsStatus.find((e) => e.key === apply.status)?.name}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  {apply.status === "pendiente" ? (
                    <>
                      <button
                        className="bg-blue-600 hover:bg-blue-900 text-white p-2 rounded-lg"
                        onClick={() => updateStatus("aprobado", apply.id)}
                      >
                        Aceptar Solicitud
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-900 text-white p-2 rounded-lg"
                        onClick={() => updateStatus("rechazado", apply.id)}
                      >
                        Rechazar Solicitud
                      </button>
                    </>
                  ) : (
                    <p className="text-lg font-semibold text-gray-800">
                      {ofertsStatus.find((e) => e.key === apply.status)?.name}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        "No existe la oferta"
      )}
    </>
  );
}
