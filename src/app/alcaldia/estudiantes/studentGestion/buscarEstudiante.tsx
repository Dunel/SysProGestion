import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Oval } from "react-loader-spinner";

type CardSearch = {
  loading: boolean;
  setIsOpen:Function;
  isOpen: boolean;
  titleAction:string;
  searchTerm: string;
  setSearchTerm: Function;
  searchUser: Function;
  setIsRegistering: Function;
  setUser: Function;
  user: Estudiante | null;
  confirmDelete: Function;
  setIsNotFoundError: Function;
  isDelete: boolean;
};

type Estudiante = {
  cedula: number;
  address: string;
  institution: {
    id: number;
    name: string;
  };
  career: {
    id: number;
    name: string;
  };
  skills: string[];
  interests: string;
  curriculum: string;
  description: string;
  names: string;
  lastnames: string;
  dateStart: Date;
  dateEnd: Date;
  estadoId: number;
  municipioId: number;
  municipio: string;
  parroquiaId: number;
  parroquia:string;
  phone: string;
  mail: string;
  birthdate: Date;
  image: string;
};


export default function SearchStudents({
  loading,
  setIsOpen,
  isDelete,
  titleAction,
  isOpen,
  searchTerm,
  setSearchTerm,
  searchUser,
  setIsRegistering,
  setUser,
  user,
  confirmDelete,
  setIsNotFoundError
}: CardSearch) {

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

  const handleReset = () => {
    setUser(null);
    setIsRegistering(false);
  } 


  const handleToggle = () => {
    setIsOpen(!isOpen); // Cambia el estado a su valor opuesto
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl text-center font-extrabold my-2 md:text-3xl">{titleAction}</h2>
      </CardHeader>
      
      <CardContent>
        
        {/* EL INPUT SEARCH + BUTTON + LOADER */}
        <div>
          <div className="w-[100%] flex flex-row gap-2 justify-center py-4">
            <Input
              placeholder="Buscar estudiante por su número de cédula de identidad"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[30vw]"
              type="search"
            />
            <button
              onClick={() => {
                setIsRegistering(false)
                searchUser(searchTerm)
                handleReset()
                setIsNotFoundError(false)

              }}
              className="w-[20%] inline-flex items-center justify-center rounded-md px-6 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              BUSCAR
            </button>
          </div>
         
          {loading && 
              ( // Muestra el loader si está cargando
              <div className="flex justify-center items-center flex-col mt-4">
                  <Oval
                    color="#000000"
                    secondaryColor="#000000" // Color de fondo NEGRO pq el fondo es blanco
                    height={50}
                    width={50}
                    strokeWidth={5}
                  />
                  <br />
                  <span>Espere por favor...</span>
              </div>
              )
          }
        </div>

        {/* CARD del Estudiante */}
          {
            user && (
              <div
                className="bg-white p-6 shadow-[0px_0px_10px_rgba(0,0,0,0.5)] flex flex-col w-full my-2 p-2 border-2 border-gray-300 rounded-lg 
                h-autotext-lg sm:sticky sm:top-[-45vh] text-sm md:text-base lg:text-lg"
                >
                <h2
                  className={`text-xl font-bold text-gray-800 text-center sm:text-2xl md:text-3xl lg:text-4xl`}
                >
                  {user.names} {user.lastnames}
                </h2>
                {/* //!foto + info personal */}
                <div className="flex flex-col items-center md:flex-row md:space-x-4">
                  {/* Foto del Estudiante */}
                  <div className="relative group m-1 p-1 mx-auto md:w-auto">
                    <img
                      className="flex h-40 w-40 rounded-full border-4 border-black-800 object-cover sm:h-60 sm:w-60"
                      src={user.image || "/images/no-image.png"}
                      alt="Foto del estudiante"
                    />
                  </div>

                  {/* !Información del Estudiente */}
                  <div className="m-1 p-1 word-wrap overflow-wrap w-[100%] md:w-[80%] mx-auto">
                    
                    <p className="text-gray-600 md:text-1x1">
                      <strong>🪪 Cedula de identidad:</strong>{" "}
                      {user.cedula}
                    </p>

                    <p className="text-gray-600 md:text-1x1">
                      <strong>📲 Teléfono:</strong> {user.phone}
                    </p>

                    <p className="text-gray-600 md:text-1x1">
                      <strong>📧 Correo:</strong> {user.mail}
                    </p>

                    <p className="text-gray-600 md:text-1x1">
                      <strong>📍 Domicilio:</strong> <br />
                        Municipio: {user.municipio}{", "} <strong>Parroquia: {user.parroquia}{", "}</strong>
                      {user.address}.
                    </p>

                    <p className="text-gray-600 md:text-1x1">
                      <strong>🗓️ Fecha de nacimiento:</strong>{" "}
                      {new Date(user.birthdate).toLocaleDateString()}
                    </p>

                    <p className="text-gray-600 md:text-1x1">
                      <strong>✔️Edad:</strong>{" "}
                      {user.birthdate &&
                        calcularEdad(user.birthdate)}
                    </p>

                  </div>

                </div>
                
                {/* //! DATOS BANCARIOS DE ESTUDIANTE */}
                {/* {
                  user.dataProfile.bankAccount &&
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

                {/* //!info academica */}
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
                            {user.institution.name}
                          </span>
                        </p>

                        <div>
                          <p className="font-semibold">Carrera 🧑🏽‍🎓 </p>
                          <p className="font-bold text-white">
                            <span className="bg-black">
                              {user.career.name}
                            </span>
                          </p>
                        </div>

                        <h4 className="text-lg font-medium text-gray-700 mb-1">
                          Habilidades 📝
                        </h4>
                        <ul className="list-disc list-inside">
                          {user.skills.map((skill, index) => (
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
                        {user.description}
                      </p>
                      <h4 className="text-lg font-medium text-gray-700 mb-1">
                        Curriculum 📄
                      </h4>
                      <a
                        href={user.curriculum}
                        target="_blank"
                        className="text-blue-500"
                      >
                        Ver Curriculum
                      </a>

                    </div>

                  </div>
                  
                </div>
                
                
                
              { isDelete 
                  ?
                  <button
                      onClick={() => {
                      confirmDelete(user.cedula) 
                      }}
                      className="inline-flex mx-auto justify-center text-center rounded-md px-6 py-4 text-xl font-medium text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                    {
                      "ELIMINAR ESTUDIANTE DEL SISTEMA" 
                    } 
                  </button>
                  :
                  <button
                    onClick={handleToggle}
                    className="inline-flex mx-auto justify-center text-center rounded-md px-6 py-4 text-xl font-medium text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                  {isOpen ? 'DESCARTAR ACTIALIZACION' : 'ACTUALIZAR DATOS'} 
                </button>
              }
                  


              </div>

            )
          }

      </CardContent>


    </Card>
  );
}
