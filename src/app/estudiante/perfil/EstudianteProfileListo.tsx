import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Loader from "@/components/Loader";

interface EstudianteProfileListoProps {
  onToggleForm: () => void;
  isFormVisible: boolean;
}

export default function EstudianteProfileListo({
  onToggleForm,
  isFormVisible,
}: EstudianteProfileListoProps) {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [pdfFile, setPdfFile] = useState(null as File | null);

  const handleImageChange = async (imageFile: File) => {
    try {
      if (imageFile) {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", imageFile);

        const response = await axios.post(
          "/api/estudiante/upload/UpImages",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data?.fileUrl) {
          update({ picture: response.data.fileUrl });
        }
        setLoading(false);
        alert(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.error);
        setLoading(false);
      } else {
        console.error("error:", error as Error);
        setLoading(false);
      }
    }
  };

  const handlePdfChange = async (pdfFile: File | null) => {
    try {
      if (!pdfFile) return;
      if (pdfFile) {
        setLoadingPDF(true);
        const formData = new FormData();
        formData.append("file", pdfFile);

        const response = await axios.post(
          "/api/estudiante/upload/UpPdf",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data?.fileUrl) {
          update({ pdfFile: response.data.fileUrl });
        }
        setLoadingPDF(false);
        alert(response.data.message);
      } else {
        alert("No se ha seleccionado un archivo");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.error);
        setLoading(false);
      } else {
        console.error("error:", error as Error);
        setLoading(false);
      }
    } finally {
      setLoadingPDF(false);
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
    <div className="flex flex-col w-[100%] relative z-20 text-base m-2 p-2 pb-0 mb-0 rounded-lg mt-2 shadow lg:shadow-none md:text-lg">
      {session?.user.profile && (
        
        <div className="flex flex-col w-[100%] my-2 mb-2 mt-2 pt-6 bg-white md:sticky md:top-[15vh]">
              <h2 className={`text-xl font-bold text-gray-800 text-center
                              ${isFormVisible ? 'text-lg sm:text-xl md:text-2xl lg:text-3xl' : "text-xl sm:text-2xl md:text-3xl lg:text-4xl"}
                              `}>
                {session.user.dataProfile.names}{" "}
                {session.user.dataProfile.lastnames}
              </h2>
          
          {/* //!foto + info personal */}
          <div className="flex flex-col items-center md:flex-row md:space-x-4">
            
            {/* Foto del Estudiante */}
            <div className="relative group m-1 p-1 mx-auto md:w-auto">
              <label htmlFor="profileImageInput" 
              className="cursor-pointer">
                <img
                  className="flex h-40 w-40 rounded-full border-4 border-black-800 object-cover sm:h-60 sm:w-60"
                  src={`${session?.user?.picture}?${new Date().getTime()}` || "/images/no-image.png"}
                  alt="Foto del estudiante"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-bold">Cambiar Foto</span>
                </div>
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full transition-opacity duration-300">
                    <Loader />
                  </div>
                )}
              </label>
              <input
                id="profileImageInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) {
                    const file = e.target.files[0];
                    handleImageChange(file);
                  }
                }}
              />
            </div>


            {/* !Información del Estudiente */}
            <div className="m-1 p-1 word-wrap overflow-wrap w-[100%] md:w-[80%] mx-auto">
             
              <h2 className={`font-bold text-gray-800 pt-5 pb-2 text-center
                              ${isFormVisible ? 'text-base sm:text-lg md:text-xl lg:text-2xl' : "text-lg sm:text-xl md:text-2xl lg:text-3xl"}
                              `}>
                <i>{session.user.dataProfile.career?.name}</i>
              </h2>
              <p className="text-gray-600 md:text-1x1">
                <strong>🪪 Cedula de identidad:</strong> {session.user.cedula}
              </p>
              <p className="text-gray-600 md:text-1x1">
                <strong>📲 Teléfono:</strong> {session.user.dataProfile.phone}
              </p>
              <p className="text-gray-600 md:text-1x1">
                <strong>📧 Correo:</strong> {session.user.email}
              </p>
              <p className="text-gray-600 md:text-1x1">
                <strong>📍 Domicilio:</strong> <br />
                Estado {session.user.dataProfile.estado}, Municipio{" "}
                {session.user.dataProfile.municipio},{" "}
                <strong>
                  Parroquia {session.user.dataProfile.parroquia},{" "}
                </strong>
                {session.user.dataProfile.address}
              </p>
              
              <p className="text-gray-600 md:text-1x1">
                <strong>🗓️ Fecha de nacimientos:</strong>{" "}
               {new Date(session.user.dataProfile.birthdate).toLocaleDateString('en-GB')}
              </p>

              <div className="flex flex-row gap-10">
              <p className="ext-gray-600 md:text-1x1">
                <strong>✔️Edad:</strong>{" "}
                {session.user.dataProfile.birthdate &&
                  calcularEdad(session.user.dataProfile.birthdate)}
              </p>
              <p className="text-gray-600 md:text-1x1">
                <strong>🚻Género:</strong>{" "}
                {session.user.dataProfile.gender === 'M' ? 'Hombre' : 'Mujer'}
              </p>
              </div>
              
            </div>
      </div>

      <div className="w-[100%] flex m-2 p-2 flex flex-col sm:flex-row sm:space-x-4">

          <div className="w-[33%]">
          <p className="text-gray-600 md:text-1x1">
            <strong>🗳️Votante:</strong>{" "}
          </p>
          <p>
            {session.user.dataProfile.cneRegister === false ? 'No Vota' : 'Si Vota'}
          </p>
        </div>
        {
          session.user.dataProfile.cneRegister &&
          <>
            <div className="w-[33%]">
              <p className="text-gray-600 md:text-1x1">
                <strong>🏫Centro de Votación:</strong>{" "}
              </p>
              <p>
                {session.user.dataProfile.cneCentroName}
              </p>
            </div>
            <div className="w-[33%]">
              <p className="text-gray-600 md:text-1x1">
                <strong>📍Parroquia de votación:</strong>{" "}
              </p>
              <p>
                {session.user.dataProfile.cneParroquia}
              </p>
            </div>
          </>
           
        }

    </div>

    {
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
    }

    

          {/* //!caja de PERFIL PROFESIONAL hasta CV */}
          <div>
            <h4 className={`font-bold text-gray-800 m-2 text-center
                              ${isFormVisible ? 'text-lg sm:text-xl md:text-2xl lg:text-3xl' : "text-xl sm:text-2xl md:text-3xl lg:text-4xl"}
                              `}>
              PERFIL PROFESIONAL
            </h4>

            {/* universidad y duracion del proceso */}
            <div className="flex flex-col items-start gap-2 md:flex-row">
              <div className="m-2 p-1 w-full md:w-[50%]">
                <p className="text-gray-600 font-bold md:text-1x1">
                  🏫Institución Educativa:
                </p>
                <p>{session.user.dataProfile.institution.name || ""}</p>
              </div>

              <div className="m-2 p-1 w-full md:w-[50%]">
                <p className="text-gray-600 font-bold md:text-1x1">
                  ⌛Duración del proceso:
                </p>
                <p>
                  {new Date(
                    session.user.dataProfile.dateStart
                  ).toLocaleDateString()}
                  {" a "}
                  {new Date(
                    session.user.dataProfile.dateEnd
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
            {/* universidad, trismestre e intereses */}
            <div className="m-2 p-1 w-full md:w-[100%]">
              <p className="text-gray-600 font-bold md:text-1x1">
                🏓 Intereses:
              </p>
              <p>{session.user.dataProfile.interests}</p>
            </div>

            {/* Habilidades y descripcion */}
            <div className="flex flex-col items-start gap-2 md:flex-row">
              <div className="m-2 p-1 w-full md:w-[30%]">
                <p className="text-gray-600 font-bold md:text-1x1">
                  🤹🏽 Habilidades:
                </p>
                {formatSkillsToList(session.user.dataProfile.skills)}
              </div>

              <div className="flex flex-col justify-center w-full md:w-[70%]">
                <div className="m-2 p-1 w-full md:w-[100%]">
                  <p className="text-gray-600 font-bold md:text-1x1">
                    🧑🏽‍🦱 Descripción:
                  </p>
                  <p>{session.user.dataProfile.description}</p>
                </div>

                <div className="flex-col gap-1 justify-center m-2 w-full">
                  {session?.user.dataProfile.curriculum && (
                    <div>
                      <Link
                        className="underline text-blue-500 hover:text-blue-700 cursor-pointer"
                        href={`${session.user.dataProfile.curriculum}?${new Date().getTime()}`}
                        target="_blank"
                      >
                        📜 Tu Resumen Curricular
                      </Link>
                    </div>
                  )}
                  <>
                    <div className="w-full md:text-3xl">
                      {session?.user.dataProfile.curriculum ? (
                        <Label className="md:text-[20px]">
                          Actualiza tu currículum (Formato PDF)
                        </Label>
                      ) : (
                        <Label className="text-base md:text-lg">
                          Sube tu currículum (Formato PDF)
                        </Label>
                      )}
                    </div>

                    <div className="flex gap-1 w-full">
                      <Input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => {
                          if (e.target.files) {
                            const file = e.target.files[0];
                            setPdfFile(file);
                          }
                        }}
                      />
                      <button
                        className="w-auto p-2 bg-black text-xs hover:bg-gray-700 text-white font-bold rounded md:text-sm"
                        onClick={() => {
                          handlePdfChange(pdfFile);
                        }}
                      >
                        ENVIAR
                      </button>
                    </div>

                    {loadingPDF && (
                      <div className="flex gap-1 w-full">
                        <Loader />
                      </div>
                    )}

                    {pdfFile && (
                      <p className="m-2">
                        Archivo seleccionado: {pdfFile?.name}
                      </p>
                    )}
                  </>
                </div>
              </div>
            </div>
          </div>

          {/* //!Botón para editar */}

          <div className="flex justify-center my-2">
            <button
              onClick={onToggleForm}
              className="m-2 w-[100%] bg-black hover:bg-gray-700 text-white font-bold py-4 px-4 rounded md:w-[50%]"
            >
              {isFormVisible ? "DESCARTAR ACTUALIZACIÓN" : "ACTUALIZAR PERFIL"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const formatSkillsToList = (skills: string[]): JSX.Element => {
  const skillMapping: { [key: string]: string } = {
    resoluciondeproblemas: "Resolución de problemas",
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

  const formattedSkills = skills.map((skill) => skillMapping[skill] || skill);

  return (
    <ol className="list-decimal pl-5">
      {formattedSkills.map((skill, index) => (
        <li key={index} className="text-gray-600">
          {skill}
        </li>
      ))}
    </ol>
  );
};
