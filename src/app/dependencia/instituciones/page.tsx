"use client";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import  Skeleton  from "@/components/ui/SkeletonComponent";
import FormInstituciones from "@/app/dependencia/instituciones/FormInstituciones"
import TableInstituciones from "@/app/dependencia/instituciones/TableInstituciones"

export default function EstudianteInfoForm() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { data: session, update } = useSession();
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

  const [records, setRecords] = useState<{
    codigoinstitucion: string;
    nombreinstituto: string;
    parroquiainstituto: string;
  }[]>([]);


  const getProfile = async () => {
    try {
      if (!session?.user.profile || session.user.dataProfile) {
        setProfileData(session?.user.dataProfile || null);
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
    }
  };

  useEffect(() => {
    getProfile();
  }, [session?.user.profile]);

  return (
    <>
      <Header
          title={
            !update ? "Actualizando el registro de la Institucion Educativa" : "Agrega una nueva Institucion Educativa" }
          subtitle={
              "Este es tu formulario y tabla que muestra las Instituciones Educativas que has registrado en sistema. Por favor, sigue las indicaciones de las casillas y completa tu informaciónrequerida."
          }
        />


        <div className="w-[90%] m-2 mx-auto">
            <FormInstituciones
                  titleForm={'Formulario de las instituciones educativas'}
                  setRecords={setRecords} // Asegúrate de que FormInstituciones acepte setRecords
            />

            <TableInstituciones 
            titleTable={'Tabla de las instituciones educativas'}
            records={records} setRecords={setRecords} />
    
        </div>
    </>
  );
}
