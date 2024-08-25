import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Loader from "../Loader";

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
    <div className="flex flex-col w-[100%] relative z-20 m-2 p-2 pb-0 mb-0 rounded-lg mt-1 shadow lg:shadow-none">
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
            {/* !Información de la dependencia */}
            <div className="m-1 p-1 word-wrap overflow-wrap">
              <h2 className="text-3xl font-bold text-gray-800 text-center md:text-5xl lg:text-4xl">
                {session.user.dataProfile.names}{" "}
                {session.user.dataProfile.lastnames}
              </h2>
              <h2 className="text-2xl font-bold text-gray-800 pt-5 pb-2 md:text-3xl lg:text-2xl">
                <i>{session.user.dataProfile.name}</i>
              </h2>
              <p className="text-gray-600 md:text-1x1">
                <strong>🪪 Cedula de identidad:</strong> {session.user.cedula}
              </p>
              <p className="text-gray-600 md:text-1x1">
                <strong>📄 RIF:</strong> {session.user.dataProfile.rif}
              </p>
              <p className="text-gray-600 md:text-1x1">
                <strong>📲 Teléfono:</strong> {session.user.dataProfile.phone}
              </p>
              <p className="text-gray-600 md:text-1x1">
                <strong>📧 Correo:</strong> {session.user.dataProfile.email}
              </p>
              <p className="text-gray-600 md:text-1x1">
                <strong>🔗 Red Social: </strong>
                {session.user.dataProfile.social}
              </p>
              <p className="text-gray-600 md:text-1x1">
                <strong>📍 Domicilio: </strong>
                {session.user.dataProfile.address}
              </p>
            </div>
          </div>

          {/* //!caja de PERFIL PROFESIONAL hasta CV */}
          <div className="m-6">
            <h4 className="text-2xl font-bold text-gray-800 m-2 text-center md:text-4xl lg:text-3xl">
              Perfil Profesional
            </h4>

            {/* Habilidades y descripcion */}
            <div className="flex flex-col items-start gap-2 md:flex-row">
              <div className="flex flex-col justify-center w-full md:w-[70%]">
                <div className="m-2 p-1 w-full md:w-[100%]">
                  <p className="text-gray-600 font-bold md:text-1x1">
                    🧑🏽‍🦱 Descripción:
                  </p>
                  <p>{session.user.dataProfile.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* //!Botón para editar */}

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
