"use client";
import Header from "@/components/HeaderLucide";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Skeleton from "@/components/ui/SkeletonComponent";
import AlcaldiaProfileForm from "@/app/alcaldia/perfil/AlcaldiaFormProfile";
import AlcaldiaProfile from "@/app/alcaldia/perfil/AlcaldiaProfileListo";

export default function AlcaldiaInfoForm() {
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
      const res = await axios.get("/api/alcaldia/perfil");
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
      <Header title="MI PERFIL">
        {!session?.user.profile ? (
          <>
            <p>
              Bienvenido al formulario de registro de tu perfil. Por favor, sigue cuidadosamente las indicaciones para completar tu información personal y profesional.
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Proporciona información precisa y actualizada.</li>
              <li>Asegúrate de llenar todos los campos obligatorios.</li>
              <li>Verifica la información antes de enviar el formulario.</li>
              <li>Si tienes dudas, consulta la sección de ayuda o contacta al soporte.</li>
            </ul>
            <p className="mt-3">
              Completar tu perfil es esencial para acceder a todos los servicios y oportunidades que el sistema ofrece. ¡Comencemos!
            </p>
          </>
        ) : (
          <>
            <p>
              Este es tu perfil personal, el cual podrás actualizar mediante el formulario que se abre al presionar el botón inferior <span className="inline-block bg-gray-300 text-black font-semibold py-1 px-1 rounded cursor-pointer hover:bg-gray-400 transition duration-200">Actualizar Perfil</span>
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Revisa tu información actual y asegúrate de que esté al día.</li>
              <li>Actualiza cualquier dato que haya cambiado recientemente.</li>
            </ul>
            <p className="mt-3">
              Recuerda que mantener tu perfil actualizado es crucial para una comunicación efectiva con el resto de usuarios del sistema.
            </p>
          </>
        )}
      </Header>
      

      {session?.user.profile === false && (
        <div className="w-[80%] m-4 p-4 mx-auto">
          <AlcaldiaProfileForm
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
              : "flex justify-center w-[95%] mx-auto bg-white"
          }`}
        >
          {<AlcaldiaProfile
            onToggleForm={toggleFormVisibility}
            isFormVisible={isFormVisible}
          />}

          {isFormVisible && (
            <div className="bg-white mt-6 mx-4">
              <AlcaldiaProfileForm
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
