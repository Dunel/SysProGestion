"use client";
import Header from "@/components/Header";
import EstudianteProfileListo from "@/components/perfiles/EstudianteProfileListo";
import EstudianteFormActualizarProfile from "@/components/perfiles/EstudianteFormActualizarProfile";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Oval } from 'react-loader-spinner'; 


type ProfileData = {
  address: string;
  university: string;
  quarter: string;
  skills: string;
  interests: string;
  description: string;
  User: {
    names: string;
    lastnames: string;
    phone: string;
    cedula: number;
    mail: string;
  };
};

export default function EstudianteInfoForm() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  //!ARREGLA ESTO
  const [dataProfile, setDataProfile] = useState<ProfileData[] | null | boolean>(false) ; 

  const [loading, setLoading] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  const { data: session } = useSession();
  const getProfile = async () => {
    try {
      setLoading(true); // Muestra el loader
      const res = await axios.get("/api/estudiante/perfil");
      console.log("res.data.profile: ", res.data.profile);
        setDataProfile(res.data.profile);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    }finally {
      setLoading(false); // Oculta el loader
    }
  };
  useEffect(() => {
    getProfile();
  }, [session?.user.profile]);


  return (
    <>
        <Header
             title={!dataProfile ? "Registrando tu Perfil": 'Tu Perfil'}
             subtitle={
              !dataProfile 
                ?"Este es tu formulario de registro. Por favor, sigue las indicaciones de las casillas y completa tu información personal y profesional." 
                :"Este es tu tu perfil personal, el cual podras actualizar mediante el formulario que se abre al presionar el boton 'Actualizar Perfil'. Es muy facil, solo sigue las indicaciones de las casillas y actualiza tu información personal y profesional que ha cambiado."
              }
           />

          {dataProfile === false && (
              loading  && // Muestra el loader si está cargando
              <div className="flex justify-center items-center flex-col mt-10">
                <Oval color="#000000"
                secondaryColor="#FFFFFF" // Color de fondo blanco
                height={50} width={50}  strokeWidth={5} />
                <br/>
                <span>Espere por favor, su informacion se esta cargando...</span>
              </div>
            )}


{/* //!ARREGLA ESTO, ES CUANDO NO HAY REGISTRO DEL ESTUDIANTE EN LA TABLA Y SE DEBE ABRIR EL FORMULARIO. */}
        {dataProfile === null && (
             <div className="w-[80%] m-4 p-4 mx-auto">
               <EstudianteFormActualizarProfile 
               onToggleForm={toggleFormVisibility}
               titleForm={'Completa los datos de tu Perfil!'} />
             </div>
       )}

        {dataProfile &&
      
              <div className={`${isFormVisible ? 'grid grid-cols-1 mx-8 lg:grid-cols-[60%_40%] gap-2' :'flex justify-center w-[80%] mx-auto bg-white'}`}>
                  
                  <EstudianteProfileListo onToggleForm={toggleFormVisibility} isFormVisible={isFormVisible} />
            
                  {isFormVisible && (
                    <div className="bg-white mx-4">
                    <EstudianteFormActualizarProfile 
                      onToggleForm={toggleFormVisibility}
                      titleForm={'Actualizando tu Perfil!'} />
                    </div>
                  )}
                </div>
  
        }
        
     
    

    
    </>
  );
}
