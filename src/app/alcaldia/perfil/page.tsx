"use client";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Skeleton from "@/components/ui/SkeletonComponent";
import DependenciaProfileForm from "@/components/perfiles/DependenciaFormActualizarProfile";
import DependenciaProfileListo from "@/components/perfiles/DependenciaProfileListo";

export default function EstudianteInfoForm() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { data: session, update } = useSession();

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  const getProfile = async () => {
    try {
      if (!session?.user.profile || session.user.dataProfile) {
        return;
      }
      const res = await axios.get("/api/dependencia/perfil");
      update({ profile: true, dataProfile: res.data.object });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error);
      }
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
          <DependenciaProfileForm
            onToggleForm={toggleFormVisibility}
            titleForm={"Completa los datos de tu Perfil!"}
          />
        </div>
      )}

      {!session?.user.dataProfile && session?.user.profile != false ? (
        <Skeleton />
      ) : (
        <div
          className={`${
            isFormVisible
              ? "grid grid-cols-1 mx-8 lg:grid-cols-[60%_40%] gap-2"
              : "flex justify-center w-[80%] mx-auto bg-white"
          }`}
        >
          {<DependenciaProfileListo
            onToggleForm={toggleFormVisibility}
            isFormVisible={isFormVisible}
          />}

          {isFormVisible && (
            <div className="bg-white mt-6 mx-4">
              <DependenciaProfileForm
                onToggleForm={toggleFormVisibility}
                titleForm={"Actualizando tu Perfil!"}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
