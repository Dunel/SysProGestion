import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Loader from "../Loader";

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

  function formatDate(date: Date | string): string {
    // Si se pasa un string, convertirlo a un objeto Date
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    // Asegurarse de que dateObj es un objeto Date válido
    if (isNaN(dateObj.getTime())) {
        throw new Error('Invalid date');
    }

    // Obtener el día, mes y año
    const day = String(dateObj.getDate()).padStart(2, '0'); // Asegura que el día tenga dos dígitos
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
    const year = dateObj.getFullYear();

    // Retornar la fecha en formato 'dd/mm/yyyy'
    return `${day}/${month}/${year}`;
}

function calcularEdad(fechaNacimiento: string | Date): string {
  // Convertir a objeto Date si es necesario
  const fechaNacimientoDate = typeof fechaNacimiento === 'string' ? new Date(fechaNacimiento) : fechaNacimiento;
  
  const hoy = new Date();
  let edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
  const mes = hoy.getMonth() - fechaNacimientoDate.getMonth();
  
  // Ajustar la edad si el mes o el día actual es anterior al de nacimiento
  if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimientoDate.getDate())) {
    edad--;
  }

  return edad.toString()+' años';
}
  return (
    <div className="flex flex-col w-[100%] relative z-20 text-1xl m-2 p-2 pb-0 mb-0 rounded-lg mt-1 shadow lg:shadow-none md:text-2xl">
      {session?.user.profile && (
        <div className="flex flex-col w-[100%] my-2 mb-2 bg-white md:sticky md:top-[15vh]">
          {/* //!Padre de foto + info personal */}
          <div className="flex flex-col items-center md:flex-row md:space-x-4">
            {/* Foto del Estudiante */}
            <div className="relative group m-1 p-1">
              <label htmlFor="profileImageInput" className="cursor-pointer">
                <img
                  className="flex h-60 w-60 rounded-full border-4 border-black-800 object-cover"
                  src={session?.user?.picture || "/images/no-image.png"}
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
            <div className="m-1 p-1 word-wrap overflow-wrap">
              <h2 className="text-3xl font-bold text-gray-800 text-center md:text-5xl lg:text-4xl">
                {session.user.dataProfile.names}{" "}
                {session.user.dataProfile.lastnames}
              </h2>
              <h2 className="text-2xl font-bold text-gray-800 pt-5 pb-2 md:text-3xl lg:text-2xl">
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
                <strong>📍 Domicilio:</strong>{" "}
                <br/>
                Estado {session.user.dataProfile.estado},{" "}
                Municipio {session.user.dataProfile.municipio},{" "}
                <strong>
                Parroquia {session.user.dataProfile.parroquia},{" "} 
                </strong>
                {session.user.dataProfile.address}
              </p>
              <p className="text-gray-600 md:text-1x1">
                <strong>🗓️ Fecha de nacimiento:</strong>{" "}
                <mark>traer la fecha de nacimiento</mark>
                {formatDate(session.user.dataProfile.dateStart)},
              </p>
              <p className="text-gray-600 md:text-1x1">
                <strong>✔️Edad:</strong>{" "}
                {calcularEdad(session.user.dataProfile.dateEnd)}
              </p>
            </div>
          </div>

          {/* //!caja de PERFIL PROFESIONAL hasta CV */}
          <div className="m-6">
            <h4 className="text-2xl font-bold text-gray-800 m-2 text-center md:text-4xl lg:text-3xl">
              Perfil Profesional
            </h4>

            {/* universidad, trismestre e intereses */}
            <div className="flex flex-col items-start gap-2 md:flex-row">
              <div className="m-2 p-1 w-full md:w-[30%]">
                <p className="text-gray-600 font-bold md:text-1x1">🏫Institucion Educativa:</p>
                <p>{session.user.dataProfile.institution.name || ""}</p>
              </div>

              <div className="m-2 p-1 w-full md:w-[20%]">
                <p className="text-gray-600 font-bold md:text-1x1">
                  ⌛duracion del proceso:
                </p>

                <p>{formatDate(session.user.dataProfile.dateStart)} a {formatDate(session.user.dataProfile.dateEnd)}</p> 
              </div>

              <div className="m-2 p-1 w-full md:w-[50%]">
                <p className="text-gray-600 font-bold md:text-1x1">
                  🏓 Intereses:
                </p>
                <p>{session.user.dataProfile.interests}</p>
              </div>
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
                        href={session.user.dataProfile.curriculum}
                        target="_blank"
                      >
                        📜 Tu Resumen Curricular
                      </Link>
                    </div>
                  )}
                  <>
                    <div className="w-full md:text-3xl">
                      {session?.user.dataProfile.curriculum ? (
                        <Label className="md:text-[20px]">Actualiza tu currículum (Formato PDF)</Label>
                      ) : (
                        <Label className="md:text-[20px]">Sube tu currículum (Formato PDF)</Label>
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
                        className="w-[30%] bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
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
              {isFormVisible
                ? "DESCARTAR ACTUALIZACIÓN"
                : "ACTUALIZAR PERFIL"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const formatSkillsToList = (skills: string[]): JSX.Element => {
  const skillMapping: { [key: string]: string } = {
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

