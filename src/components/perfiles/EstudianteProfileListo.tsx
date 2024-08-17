import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

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
      if (pdfFile) {
        setLoading(true);
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
        setLoading(false);
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
    }
  };

  return (
    <div className="relative z-20 m-2 p-2 pb-0 mb-0 rounded-lg mt-1 shadow lg:shadow-none">
      {session?.user.profile && (
        <div className="my-2 bg-white mb-2 md:sticky md:top-[15vh]">
          <div className="flex flex-col items-center md:flex-row md:space-x-4">
            {/* Foto del Estudiante */}
            <div className="relative group m-1 p-1">
              <label htmlFor="profileImageInput" className="cursor-pointer">
                <img
                  className="h-60 w-60 rounded-full border-4 border-black-800 object-cover"
                  src={session?.user?.picture || "/images/no-image.png"}
                  alt="Foto del estudiante"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-bold">Cambiar Foto</span>
                </div>
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full transition-opacity duration-300">
                    <Oval
                      color="#000000"
                      secondaryColor="#FFFFFF"
                      height={50}
                      width={50}
                      strokeWidth={5}
                    />
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
            {/* //!Información del Estudiente */}
            <div className="m-1 p-1 word-wrap overflow-wrap">
              <h2 className="text-3xl font-bold text-gray-800 text-center md:text-5xl lg:text-4xl">
                {session.user.dataProfile.names}{" "}
                {session.user.dataProfile.lastnames}
              </h2>
              <h2 className="text-2xl font-bold text-gray-800 pt-5 pb-2 md:text-3xl lg:text-2xl">
                <i>{session.user.dataProfile.career}</i>
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
          <div className="m-6">
            <h4 className="text-2xl font-bold text-gray-800 m-2 text-center md:text-4xl lg:text-3xl">
              Perfil Profesional
            </h4>
            <div className="mt-2">
              <div className="m-2">
                <p className="text-gray-600 font-bold md:text-1x1">
                  Universidad:
                </p>
                {session.user.dataProfile.university}
              </div>
              <div className="m-2">
                <p className="text-gray-600 font-bold md:text-1x1">
                  Trimestre:
                </p>
                {session.user.dataProfile.quarter}
              </div>
              <div className="m-2">
                <p className="text-gray-600 font-bold md:text-1x1">
                  Intereses:
                </p>
                {session.user.dataProfile.interests}
              </div>
              <div className="m-2">
                <p className=" text-gray-600 font-bold md:text-1x1">
                  Descripción:
                </p>
                {session.user.dataProfile.description}
              </div>
              <div className="m-2">
                <p className="text-gray-600 font-bold md:text-1x1">
                  Habilidades:
                </p>
                {formatSkillsToList(session.user.dataProfile.skills)}
              </div>
              <p className="m-2 text-gray-600 md:text-1x1"></p>
            </div>
            <div className="m-2">
              {session?.user.dataProfile.curriculum && (
                <div>
                  <Link
                    className="underline text-blue-500 hover:text-blue-700 cursor-pointer"
                    href={session.user.dataProfile.curriculum}
                    target="_blank"
                  >
                    Resumen Curricular
                  </Link>
                </div>
              )}
              <>
                <Label>Sube tu currículum (Formato PDF)</Label>
                <div className="w-[100%] py-2 dm:w-[50%] sm:w-[50%] flex">
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
                    className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded md:w-[50%]"
                    onClick={() => {
                      handlePdfChange(pdfFile);
                    }}
                  >
                    ENVIAR
                  </button>
                </div>
                {pdfFile && (
                  <p className="m-2">Archivo seleccionado: {pdfFile?.name}</p>
                )}
              </>
            </div>
          </div>
          <div className="flex justify-center my-2">
            <button
              onClick={onToggleForm}
              className="m-2 w-[100%] bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded md:w-[50%]"
            >
              {isFormVisible
                ? "Descartar la Actualización"
                : "Actualizar Perfil"}
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
