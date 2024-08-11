import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

type ProfileData = {
  address: string;
  university: string;
  quarter: string;
  skills: string;
  interests: string;
  description: string;
  User:{
    names: string;
    lastnames: string;
    phone: string;
    cedula: number;
    mail: string;
  }
};

export default function EstudianteProfile() {
  const [dataProfile, setDataProfile] = useState<ProfileData>();
  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get("/api/estudiante/perfil");
        setDataProfile(res.data.profile);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("error lanzado:", error.response?.data.error);
        } else {
          console.error("error:", error);
        }
      }
    };
    getProfile();
  }, []);
  return (
    <>
      <div className="flex items-start">
        {/* Foto del Alcalde */}
        <div className="flex-shrink-0">
          <img
            className="h-40 w-40 rounded-full border-4 border-blue-500"
            src={'https://lgbtravel.com/wp-content/uploads/2023/11/paises-hombres-guapos-portada-1024x576.jpg'}
            alt="Foto del estudiante"
          />
        </div>
        {/* Información del Alcalde */}
        <div className="ml-4">
          <h2 className="text-3xl font-bold text-gray-800 pt-5 text-center">
            {dataProfile?.User.names} {dataProfile?.User.lastnames}
          </h2>
          <h2 className="text-2xl font-bold text-gray-800 pt-5">
            {"profileData.carreraEstudiante falta en db"}
          </h2>
          <p className="text-gray-600">
            <strong>Cedula de identidad:</strong> {dataProfile?.User.cedula}
          </p>
          <p className="text-gray-600">
            <strong>Teléfono:</strong> {dataProfile?.User.phone}
          </p>
          <p className="text-gray-600">
            <strong>Correo:</strong> {dataProfile?.User.mail}
          </p>
          <p className="text-gray-600">
            <strong>Domicilio:</strong> {dataProfile?.address}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-lg font-semibold text-gray-800">
          Perfil profesional
        </h4>
        <div className="mt-2">
          <p className="text-gray-600">
            <strong>Universidad:</strong> {dataProfile?.university}
          </p>
          <p className="text-gray-600">
            <strong>trimestre:</strong> {dataProfile?.quarter}
          </p>
          <p className="text-gray-6000">
            <strong>Habilidades:</strong> {dataProfile?.skills}
          </p>
          <p className="text-gray-6000">
            <strong>Intereses:</strong> {dataProfile?.interests}
          </p>
          <p className="text-gray-600">
            <strong>Descripción:</strong> {dataProfile?.description}
          </p>
          <p className="text-gray-6000">
            <Link
              className="underline text-blue-500 hover:text-blue-700 cursor-pointer"
              href={"profileData.reseumenCurricularEstudiante"}
            >
              {" "}
              Reseumen Curricular{" "}
            </Link>
          </p>
        </div>
      </div>
      <br />
      <button
        type="submit"
        className="w-full bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Actualizar Datos
      </button>
      </>
  );
}
