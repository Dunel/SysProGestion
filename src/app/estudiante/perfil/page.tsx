"use client";
import Header from "@/components/Header";
import EstudianteProfileListo from "@/components/perfiles/EstudianteProfileListo";
import EstudianteFormActualizarProfile from "@/components/perfiles/EstudianteFormActualizarProfile";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";
import  Skeleton  from "@/components/ui/SkeletonComponent";

export default function EstudianteInfoForm() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { data: session, update } = useSession();

  const [loading, setLoading] = useState(true);
  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };
  const [profileData, setProfileData] = useState<{
    address: string;
    university: string;
    career: string;
    quarter: string;
    skills: string[];
    interests: string;
    description: string;
    names: string;
    lastnames: string;
    phone: string;
    curriculum: string;
  } | null>(null);

  const getProfile = async () => {
    try {
      setLoading(true); // Muestra el loader
      if (!session?.user.profile || session.user.dataProfile) {
        setProfileData(session?.user.dataProfile || null);
        setLoading(false);
        return;
      }
      const res = await axios.get("/api/estudiante/perfil");
      update({ profile: true, dataProfile: res.data.object });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    } finally {
      setLoading(false); // Oculta el loader
    }
  };
  useEffect(() => {
    getProfile();
  }, [session?.user.profile]);

  return (
    <>
      <Header
        title={
          !session?.user.dataProfile ? "Registrando tu Perfil" : "Mi Perfil"
        }
        subtitle={
          !session?.user.profile
            ? "Este es tu formulario de registro. Por favor, sigue las indicaciones de las casillas y completa tu información personal y profesional."
            : "Este es tu perfil personal, el cual podras actualizar mediante el formulario que se abre al presionar el boton 'Actualizar Perfil'. Es muy facil, solo sigue las indicaciones de las casillas y actualiza tu información personal y profesional que ha cambiado."
        }
      />


      {session?.user.profile === false && (
        <div className="w-[80%] m-4 p-4 mx-auto">
          <EstudianteFormActualizarProfile
            onToggleForm={toggleFormVisibility}
            titleForm={"Completa los datos de tu Perfil!"}
            data={profileData}
          />
        </div>
      )}

      {/* //Muestra el loader aun sin saer si la data es null, false o true */}
      {!session?.user.dataProfile && session?.user.profile != false 
        ? (
            <Skeleton/> 
      ) : (
        <div
          className={`${
            isFormVisible
              ? "grid grid-cols-1 mx-8 lg:grid-cols-[60%_40%] gap-2"
              : "flex justify-center w-[80%] mx-auto bg-white"
          }`}
        >
          <EstudianteProfileListo
            onToggleForm={toggleFormVisibility}
            isFormVisible={isFormVisible}
          />

          {isFormVisible && (
            <div className="bg-white mt-6 mx-4">
              <EstudianteFormActualizarProfile
                onToggleForm={toggleFormVisibility}
                titleForm={"Actualizando tu Perfil!"}
                data={profileData}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
