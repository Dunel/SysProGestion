import { useSession } from "next-auth/react";

interface EstudianteProfileListoProps {
  onToggleForm: () => void;
  isFormVisible: boolean;
}

export default function EstudianteProfileListo({
  onToggleForm,
  isFormVisible,
}: EstudianteProfileListoProps) {
  const { data: session } = useSession();


  //!MOSTRANDO ESTE !!!!
  return (
    <div className="relative z-20 m-2 mt-6 p-2 pb-0 mb-0 rounded-lg mt-1 shadow lg:shadow-none">
      {session?.user.profile ? (
        <div className="my-2 bg-white mb-2 md:sticky md:top-[15vh]">
          <div className="flex flex-col items-center md:flex-row md:space-x-4">
            {/* Foto del Estudiante */}
            <div className="m-1 p-1">
              <img
                className="h-60 w-60 rounded-full border-4 border-black-800"
                src={
                  "https://lgbtravel.com/wp-content/uploads/2023/11/paises-hombres-guapos-portada-1024x576.jpg"
                }
                alt="Foto del estudiante"
              />
            </div>
            {/* Información del Estudiente */}
            <div className="m-1 p-1 word-wrap overflow-wrap">
              <h2 className="text-3xl font-bold text-gray-800 text-center md:text-5xl lg:text-4xl">
                {session.user.dataProfile.names} {session.user.dataProfile.lastnames}
              </h2>
              <h2 className="text-2xl font-bold text-gray-800 pt-5 pb-2 md:text-3xl lg:text-2xl">
                <i>{"profileData.carreraEstudiante falta en db"}</i>
              </h2>
              <p className="text-gray-600 md:text-1x1">
                <strong>Cedula de identidad:</strong> {session.user.cedula}
              </p>
              <p className="text-gray-600 md:text-1x1">
                <strong>Teléfono:</strong> {session.user.dataProfile.phone}
              </p>
              <p className="text-gray-600 md:text-1x1">
                <strong>Correo:</strong> {session.user.email}
              </p>
              <p className="text-gray-600 md:text-1x1">
                <strong>Domicilio:</strong> {session.user.dataProfile.address}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-2xl font-bold text-gray-800 m-2 text-center md:text-4xl lg:text-3xl">
              Perfil Profesional
            </h4>
            <div className="mt-2">
              <p className=" m-2 text-gray-600 md:text-1x1">
                <strong>Universidad:</strong> {session.user.dataProfile.university}
              </p>
              <p className="m-2 text-gray-600 md:text-1x1">
                <strong>trimestre:</strong> {session.user.dataProfile.quarter}
              </p>
            
              <p className="m-2 text-gray-600 md:text-1x1">
                <strong>Intereses:</strong> {session.user.dataProfile.interests}
              </p>
              <p className="m-2 text-gray-600 md:text-1x1">
                <strong>Descripción:</strong> {session.user.dataProfile.description}
              </p>
              <p className="m-2 text-gray-600 md:text-1x1">
                <strong>Habilidades:</strong> {formatSkillsToList(session.user.dataProfile.skills)}
              </p>

              <p className="m-2 text-gray-600 md:text-1x1">
                
                {/* <Link
                  className="underline text-blue-500 hover:text-blue-700 cursor-pointer"
                  href={"profileData.reseumenCurricularEstudiante"}
                >
                  {" "}
                  Reseumen Curricular{" "}
                </Link> */}

              </p>
            </div>
          </div>
          
          <div className="flex justify-center my-2">
            <button
              onClick={onToggleForm}
              className="m-2 w-[100%] bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded md:w-[50%]"
            >
              {isFormVisible
                ? "Descartar la Actualizacion"
                : "Actualizar Perfil"}
            </button>
           
          </div>
        </div>
      ) : (
        <div className="justify-center">
          <p className="text-gray-600 text-center">
            No se ha encontrado información del perfil.
          </p>
          <button
            onClick={onToggleForm}
            className="m-2 bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded md:w-[70%]"
          >
            {isFormVisible ? "Descartar la Actualizacion" : "Actualizar Perfil"}
          </button>
        </div>
      )}
    </div>
  );
}



const formatSkillsToList = (skills: string[]): JSX.Element => {
  // Mapeo de habilidades aglutinadas a su forma formateada
  const skillMapping: { [key: string]: string } = {
    "resoluciondeproblemas": "Resolucion de problemas",
    "trabajoenequipo": "Trabajo en equipo",
    "adaptabilidad": "Adaptabilidad",
    "comunicacionefectiva": "Comunicacion efectiva",
    "liderazgo": "Liderazgo",
    "pensamientocritico": "Pensamiento crítico",
    "orientacionaresultados": "Orientacion a resultados",
    "creatividad": "Creatividad",
    "gestiondeltiempo": "Gestión del tiempo",
    "aprendizajecontinuo": "Aprendizaje continuo",
    "dondegente": "Don de gente",
    "ensenanza": "Enseñanza",
    "sociable": "Sociable",
    "salud": "Salud",
    "deportes": "Deportes",
    "logistica": "Logística",
    "expresionesartisticas": "Expresiones artísticas",
    "diseno": "Diseño",
    "musica": "Música",
    "ingles": "Inglés",
    "otrosidiomasnaturales": "Otros idiomas naturales",
    "lenguajesdeprogramacion": "Lenguajes de programación"
  };

  // Formatear habilidades usando el mapeo
  const formattedSkills = skills.map(skill => skillMapping[skill] || skill);

  return (
    <ol className="list-decimal pl-5">
      {formattedSkills.map((skill, index) => (
        <li key={index} className="text-gray-600">{skill}</li>
      ))}
    </ol>
  );
};