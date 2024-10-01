import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Loader from "@/components/Loader";

//!ESTE ES EL ARCHOVO DE ESTUDIANTE QUE ESTOY CUSTOM PA DEPENDE

interface DependenciaProfileListoProps {
  onToggleForm: () => void;
  isFormVisible: boolean;
}

export default function DependenciaProfileListo({
  onToggleForm,
  isFormVisible,
}: DependenciaProfileListoProps) {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (imageFile: File) => {
    try {
      if (imageFile) {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", imageFile);

        const response = await axios.post(
          "/api/dependencia/upload/UpImages",
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

  return (
    <div className={`flex flex-col w-[100%] relative z-20 m-2 p-2 pb-0 mb-0 rounded-lg mt-2 shadow lg:shadow-none
       ${isFormVisible ? 'text-sm sm:text-sm md:text-base lg:text-lg' : "text-base sm:text-base md:text-lg lg:text-xl"}
    `}>
      {session?.user.profile && (

        <div className={`bg-white flex flex-col w-[100%] my-2 mb-2 mt-2 pt-6 px-4 md:sticky
           ${isFormVisible ? 'top-[10vh]' : "md:top-[5vh]"}
          `}>
              <h2 className={`text-xl font-bold text-gray-800 text-center
                              ${isFormVisible ? 'text-lg sm:text-xl md:text-2xl lg:text-3xl' : "text-xl sm:text-2xl md:text-3xl lg:text-4xl"}
                              `}>
                  {'🏛️ '}{session.user.dataProfile.name } 
                </h2>
          
          {/* //!foto + info institucional */}
           <div className="flex flex-col items-start md:flex-row">
              
              {/* Foto de la dependencia */}
              <div className="relative group pt-2 mx-auto w-auto">
                <label htmlFor="profileImageInput" 
                className="cursor-pointer">
                  <img
                    className="flex h-40 w-40 rounded-full border-4 border-black-800 object-cover"
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


              {/* !Información de la dependencia */}
              <div className="pt-2 word-wrap overflow-wrap md:w-[70%] lg:w-[75%]">
                <p className="text-gray-600">
                  <strong>🏛️RIF:</strong>{" "}
                  {session.user.dataProfile.rif}
                </p>
              
                <p className="text-gray-600">
                  <strong>📲 Teléfono:</strong> {session.user.dataProfile.phone}
                </p>
                <p className="text-gray-600 md:text-1x1">
                  <strong>📧 Correo:</strong> {session.user.email}
                </p>
                <p className="text-gray-600 md:text-xl">
                  <strong>🤳🏽Red Social:</strong> 
                  <Link href={session.user.dataProfile.social}>   {' '}
                      <span className="inline-block w-1/2 text-blue-500 hover:text-blue-700 underline overflow-hidden whitespace-nowrap truncate">
                        {session.user.dataProfile.social}
                      </span>
                  </Link>
                </p>
              </div>
          </div>

          {/* {!direccion y razon social */}
          <div className="flex flex-col">
          <p className="text-gray-600 md:text-1x1">
                <strong>📍Direccion:</strong>
                <p>
                   {' '} Estado {session.user.dataProfile.estado}, Municipio{" "}
                {session.user.dataProfile.municipio},{" "}
                <strong>
                  Parroquia {session.user.dataProfile.parroquia},{" "}
                </strong>
                {session.user.dataProfile.address}
                </p>
              </p>
              
              <p className="text-gray-600 font-bold md:text-1x1">
                🏛️Razón Social:
              </p>
                <p>{session.user.dataProfile.description}</p>
          
          </div>


          {/* //!caja de PERFIL PROFESIONAL hasta CV */}
          <div className="flex flex-col">
              <h4 className={`font-bold text-gray-800 m-2 mt-4 text-center
                                ${isFormVisible ? 'text-lg sm:text-xl md:text-2xl lg:text-3xl' : "text-xl sm:text-2xl md:text-3xl lg:text-4xl"}
                                `}>
                RESPONSABLE DE LA DEPENDENCIA
              </h4>

            
            <div className="word-wrap overflow-wrap">
              
              <p className="text-gray-600 md:text-1x1">
                  <strong>👤Nombre:</strong>{" "}
                  {session.user.dataProfile.names}{" "}
                  {session.user.dataProfile.lastnames}
              </p>
              <p>
  <strong>Carrera:</strong> {session.user?.dataProfile?.career?.name || 'Carrera no disponible'}
</p>

              <p className="text-gray-600 md:text-1x1">
                  <strong>🪪Cedula de Identidad:</strong>{" "}
                  {session.user.cedula}
              </p>
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
