import axios from "axios";
import { FaMoneyCheckAlt } from "react-icons/fa";
import InternshipCards from "../InternshipCards";

interface Internship {
  id: number;
  title: string;
  description: string;
  location: string;
  type: "pasantia" | "servicio" | "proyecto";
  date: Date;
  skills: string[];
  status: string;
  pay: boolean | null;
  tutor: string;
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
        parroquia: {
          parroquia: string;
        };
        esInfo: {
          institution: {
            institutionCode: string;
            name: string;
          };
          career: {
            careerCode: string;
            name: string;
          };
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
  { key: "active", name: "Activa✅", color: "green" },
  { key: "inactive", name: "Inactiva⚠️", color: "yellow" },
  {
    key: "aceptado",
    name: `🎉El estudiante ha Aceptado esta oferta🎉 Puedes contactarlo para comenzar el proceso. Ahora el estudiante debe dirigirse a la Dirección de Educación y Asuntos Universitarios de la Alcaldía, para retirar el Oficio de su postulación, y entregártelo. El lapso del proceso de este estudiante ha comenzado.`,
    color: "green",
  },
  {
    key: "pendiente",
    name: "Pendiente⌚, debes Aprobar o Rechazar solicitud de estudiante",
    color: "blue",
  },
  {
    key: "aprobado",
    name: "Haz Aprobadó a este estudiante, espera que él acepte⌚",
    color: "blue",
  },
  {
    key: "rechazado",
    name: "Has Rechazado a este estudiente ⛔",
    color: "red",
  },
  {
    key: "declinado",
    name: "El estudiante ha Declinado esta Oferta⛔",
    color: "red",
  },
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

  function calcularEdad(fechaNacimiento: string | Date): string {
    // Convertir a objeto Date si es necesario
    const fechaNacimientoDate =
      typeof fechaNacimiento === "string"
        ? new Date(fechaNacimiento)
        : fechaNacimiento;

    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
    const mes = hoy.getMonth() - fechaNacimientoDate.getMonth();

    // Ajustar la edad si el mes o el día actual es anterior al de nacimiento
    if (
      mes < 0 ||
      (mes === 0 && hoy.getDate() < fechaNacimientoDate.getDate())
    ) {
      edad--;
    }

    return edad.toString() + " años";
  }

  return (
    <>
      {internship ? (
        <div className="flex flex-col justify-center mb-8 w-[90%] mx-auto text-sm md:text-base lg:text-lg">
         
          <div className="flex flex-col items-start md:items-end">
            <span className="flex p-1 text-red-500">
              Codigo de Oferta de Vacante: {"P-2024-000" + internship.id}
            </span>
            {/* //!internship.pay  */}
            {internship.pay  && (
              <span className="flex gap-2 mr-2 text-base font-bold text-green-500">
                {`Esta vacante ofrece incentivos`}
                <FaMoneyCheckAlt style={{ color: "green" }} size={30} />
              </span>
            )}
          </div>

          <h2 className="font-bold text-gray-800 mb-2 text-center text-2xl md:text-3xl lg:text-4xl">
            {internship.title.toUpperCase()}
          </h2>

          <div className="flex flex-col items-center md:flex-row md:space-x-4">
            <div className="w-[95%] m-1 p-1 word-wrap overflow-wrap">
              <div className="flex flex-col gap-2 mx-auto items-center md:flex-row">
                {/* lado izquierdo - La foto */}
                <div className="relative group m-1 p-1 mx-auto md:w-auto">
                  <img
                    src={internship.dependencia.User.image}
                    alt={`${internship.dependencia} logo`}
                    className="flex h-40 w-40 rounded-full border-4 border-black-800 object-cover sm:h-50 sm:w-50"
                  />
                </div>

                {/* lado derecho foto */}
                <div className="w-[100%] m-1 p-1 md:w-[70%]">
                  <p className="text-gray-600 mb-1 font-bold text-lg md:text-xl lg:text-2xl">
                    {" "}
                    <i>{internship.dependencia.name}</i>
                  </p>

                  <p className="text-gray-500">📍{internship.location}</p>
                  

                  <div className="flex flex-col my-1 gap-2 sm:flex-row">
                    <div className="w-[50%]">
                      <span className="font-medium text-gray-700 mb-2">
                        Estado de la Solicitud:
                      </span>
                      <p
                        className={`text-${
                          ofertsStatus.find((e) => e.key === internship.status)
                            ?.color
                        }-500 font-extrabold p-2`}
                      >
                        {
                          ofertsStatus.find((e) => e.key === internship.status)
                            ?.name
                        }
                      </p>
                    </div>

                    <div className="w-[50%]">
                      <span className="font-medium text-gray-700 mb-2">
                        Tipo de Oferta:
                      </span>
                      <p>
                        {
                          ofertsType.find(
                            (type) => type.key === internship.type
                          )?.name
                        }
                      </p>
                    </div>
                    
                  </div>
                  
                  <div className="text-gray-600">
                    <p> <b>Tutor Industrial o Responsable:</b>{' '}
                    {internship.tutor ? internship.tutor : "No asignado"}
                    </p>
                  </div>

                </div>
              </div>

              <div className="flex flex-col justify-center gap-2 my-2 lg:flex-row">
                <div className="m-1 w-[100%] lg:w-[40%]">
                  <h4 className="font-bold text-gray-700 mb-2">
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
                <div className="m-1 w-[100%] text-justify lg:w-[60%]">
                  <h4 className="font-bold text-gray-700 mb-2">
                    Descripcion de la Vacante 📋
                  </h4>
                  <p>{internship.description}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <h3 className="font-bold text-gray-800 mb-4 text-xl underline md:text-2xl lg:text-3xl">
              {internship.apply.length > 0
                ? "SOLICITUDES RECIBIDAS"
                : "NO HAS RECIBIDO SOLICITUDES"}
            </h3>

            {internship.apply.map((apply, index) => (
              <div
                key={index}
                className="bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.5)] flex flex-col w-full my-2 p-2 border-2 border-gray-300 rounded-lg 
                h-autotext-lg text-sm md:text-base lg:text-lg"
              >
                <h2
                  className={`text-xl font-bold text-gray-800 text-center sm:text-2xl md:text-3xl lg:text-4xl`}
                >
                  {apply.User.names} {apply.User.lastnames}
                </h2>

                {/* //!foto + info personal */}
                <div className="flex flex-col items-center md:flex-row md:space-x-4">
                  {/* Foto del Estudiante */}
                  <div className="relative group m-1 p-1 mx-auto md:w-auto">
                    <img
                      className="flex h-40 w-40 rounded-full border-4 border-black-800 object-cover sm:h-60 sm:w-60"
                      src={apply.User.image || "/images/no-image.png"}
                      alt="Foto del estudiante"
                    />
                  </div>

                  {/* !Información del Estudiente */}
                  {/* //! parrokia */}
                  <div className="m-1 p-1 word-wrap overflow-wrap w-[100%] md:w-[80%] mx-auto">
                    <p className="text-gray-600 md:text-1x1">
                      <strong>🪪 Cedula de identidad:</strong>{" "}
                      {apply.User.cedula}
                    </p>
                    <p className="text-gray-600 md:text-1x1">
                      <strong>📲 Teléfono:</strong> {apply.User.phone}
                    </p>
                    <p className="text-gray-600 md:text-1x1">
                      <strong>📧 Correo:</strong> {apply.User.mail}
                    </p>
                    <p className="text-gray-600 md:text-1x1">
                      <strong>📍 Domicilio:</strong> <br />
                      Parroquia: {apply.User.parroquia?.parroquia}.{" "}
                      {apply.User.esInfo.address}.
                    </p>
                    <p className="text-gray-600 md:text-1x1">
                      <strong>🗓️ Fecha de nacimiento:</strong>{" "}
                      {new Date(apply.User.birthdate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 md:text-1x1">
                      <strong>✔️Edad:</strong>{" "}
                      {apply.User.birthdate &&
                        calcularEdad(apply.User.birthdate)}
                    </p>
                  </div>
                </div>

{/* //! DATOS BANCARIOS DE ESTUDIANTE */}
                {/* {
                  session.user.dataProfile.bankAccount &&
                  <div  className="w-[100%] flex m-2 p-2 flex flex-col sm:flex-row sm:space-x-4">
                    <div className="w-[50%]">
                          <p className="text-gray-600 md:text-1x1">
                            <strong>💵Banco:</strong>{" "}
                          </p>
                          <p>
                            {session.user.dataProfile.bankName}
                          </p>
                        </div>
                        <div className="w-[50%]">
                          <p className="text-gray-600 md:text-1x1">
                            <strong>🔢Número de cuenta:</strong>{" "}
                          </p>
                          <p>
                            {session.user.dataProfile.bankAccount}
                          </p>
                        </div>
                  </div>
                } */}



                <div>
                  <h2 className="font-bold text-gray-700 mb-1 text-center text-lg md:xl lg:text-2xl">
                    INFORMACION ACADEMICA 📚
                  </h2>

                  <div className="flex flex-col p-2 gap-5 lg:flex-row">
                    {/* lado izquierdo */}
                    <div className="w-[100%] lg:w-[50%]">
                      <p>
                        <span className="font-semibold">
                          Institución Educativa 🏛️{" "}
                        </span>
                        <br />
                        <span className="">
                          {apply.User.esInfo.institution.name}
                        </span>
                      </p>

                      <div>
                        <p className="font-semibold">Carrera 🧑🏽‍🎓 </p>
                        <p className="font-bold text-white">
                          <span className="bg-black">
                            {apply.User.esInfo.career.name}
                          </span>
                        </p>
                      </div>

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

                    {/* lado derecho */}
                    <div className="w-[100%] lg:w-[50%]">
                      <h4 className="text-lg font-medium text-gray-700 mb-1">
                        Descripcion 📋
                      </h4>
                      <p className="text-justify">
                        {apply.User.esInfo.description}
                      </p>
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
                    </div>
                  </div>
                </div>

                <div
                  className={`p-2 m-2 text-center mx-auto bg-${
                    ofertsStatus.find((e) => e.key === apply.status)?.color
                  }-100 w-[100%]`}
                >
                  <p
                    className={`text-${
                      ofertsStatus.find((e) => e.key === apply.status)?.color
                    }-500 font-extrabold p-2`}
                  >
                    {"Estado de la Oferta: "}
                    {ofertsStatus.find((e) => e.key === apply.status)?.name}
                  </p>
                </div>

                {/* //!BOTONES  */}

                <div className="flex flex-row items-center gap-2">
                  {apply.status === "pendiente" ? (
                    <>
                      <button
                        className="w-[100%] bg-green-600 hover:bg-green-900 text-white font-extrabold p-4 rounded-lg md:w-[50%]"
                        onClick={() => updateStatus("aprobado", apply.id)}
                      >
                        Aprobar Solicitud
                      </button>

                      <button
                        className="w-[100%] bg-red-600 hover:bg-red-900 text-white font-extrabold p-4 rounded-lg md:w-[50%]"
                        onClick={() => updateStatus("rechazado", apply.id)}
                      >
                        Rechazar Solicitud
                      </button>
                    </>
                  ) : (
                    ""
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
