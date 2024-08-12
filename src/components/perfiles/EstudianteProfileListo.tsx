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


interface EstudianteProfileListoProps {
  onToggleForm: () => void;
  isFormVisible: boolean;
}

export default function EstudianteProfileListo ({ onToggleForm, isFormVisible }: EstudianteProfileListoProps) {
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

  //!MOSTRANDO ESTE !!!!
  return (
    <div className="relative z-20 m-4 my-4 p-4 rounded-lg mt-10  bg-white shadow lg:shadow-none">
      
    <div className="flex flex-col items-center md:flex-row md:space-x-4">
            
        {/* Foto del Estudiante */}
        <div className="m-1 p-1">
          <img
            className="h-60 w-60 rounded-full border-4 border-black-800"
            src={'https://lgbtravel.com/wp-content/uploads/2023/11/paises-hombres-guapos-portada-1024x576.jpg'}
            alt="Foto del estudiante"
          />
        </div>
        {/* Información del Estudiente */}
        <div className="m-1 p-1 word-wrap overflow-wrap">
          <h2 className="text-3xl font-bold text-gray-800 text-center md:text-5xl lg:text-4xl">
            {dataProfile?.User.names} {dataProfile?.User.lastnames}
          </h2>
          <h2 className="text-2xl font-bold text-gray-800 pt-5 pb-2 md:text-3xl lg:text-2xl">
            <i>{"profileData.carreraEstudiante falta en db"}</i>
          </h2>
          <p className="text-gray-600 md:text-1x1">
            <strong>Cedula de identidad:</strong> {dataProfile?.User.cedula}
          </p>
          <p className="text-gray-600 md:text-1x1">
            <strong>Teléfono:</strong> {dataProfile?.User.phone}
          </p>
          <p className="text-gray-600 md:text-1x1">
            <strong>Correo:</strong> {dataProfile?.User.mail}
          </p>
          <p className="text-gray-600 md:text-1x1">
            <strong>Domicilio:</strong> {dataProfile?.address}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-2xl font-bold text-gray-800 pt-5 pb-2 text-center md:text-4xl lg:text-3xl">
          Perfil Profesional
        </h4>
        <div className="mt-2">
          <p className="text-gray-600 md:text-1x1">
            <strong>Universidad:</strong> {dataProfile?.university}
          </p>
          <p className="text-gray-600 md:text-1x1">
            <strong>trimestre:</strong> {dataProfile?.quarter}
          </p>
          <p className="text-gray-600 md:text-1x1">
            <strong>Habilidades:</strong> {dataProfile?.skills}
          </p>
          <p className="text-gray-600 md:text-1x1">
            <strong>Intereses:</strong> {dataProfile?.interests}
          </p>
          <p className="text-gray-600 md:text-1x1">
            <strong>Descripción:</strong> {dataProfile?.description}
          </p>
          <p className="text-gray-600 md:text-1x1">
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
      {/* Botón para actualizar los datos */}
  
        <div className="flex justify-center">
          <button
              onClick={onToggleForm}
              className="w-[100%] bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded md:w-[50%]"
              >
             {isFormVisible ? "Descartar la Actualizacion" : "Actualizar Perfil"}

            </button>
        </div>
      
    </div>
  );
}
