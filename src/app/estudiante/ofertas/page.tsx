"use client";
import Header from "@/components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import OffertCards from "@/app/estudiante/ofertas/OffertCards";
import Skeleton from "@/components/ui/SkeletonComponent";

type Application = {
  id: number;
  title: string;
  type: "pasantia" | "servicio" | "proyecto";
  description: string;
  skills: string[];
  date: Date;
  location: string;
  status: string;
  pay: boolean | null;
  dependencia: {
    name: string;
    User: {
      image: string;
      parroquia: {
        parroquia: string;
        municipio: {
          municipio: string;
        };
      };
    };
  };
  apply: [
    {
      id: number;
      status: string;
    }
  ];
  _count: {
    apply: number;
  };
};

export default function Page() {
  const [applications, setApplications] = useState<Application[]>();
  const [squeleton, setSqueleton] = useState(true);



  const handleApply = async (id: number) => {
    try {
      const res = await axios.post("/api/estudiante/apply", { id });
      console.log(res.data);
      getApplications();
      alert("Solicitud enviada");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    }finally{
      setSqueleton(false)
    }
  };

  const getApplications = async () => {
    try {
      const res = await axios.get("/api/estudiante/apply");
      console.log(res.data);
      setApplications(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    }finally{
      setSqueleton(false)
    }
  };
  
  useEffect(() => {
    getApplications();
    
  }, []);

  const typeDesc = {
    pasantia: "Pasantía",
    servicio: "Servicio Comunitario",
    proyecto: "Proyecto",
  };
  
  return (
    <>
      <Header
        title={"TODAS LAS OFERTAS DE VACANTES"}
        subtitle={
          "Aqui podras encontrar todas las Vacantes de Pasantías, Servicio Comunitario y Proyectos de tesis que han sido publicadas por las dependencias de la alcaldia. Aplica a las que tengas interes."
        }
      />

      {squeleton ? (
        <Skeleton />
      ) : applications && applications.length === 0 ? (
        <div className="flex flex-col justify-center items-center mt-8 mx-auto bg-white w-[60%] min-h-[30vh]">
          <p className="m-2 p-2 text-center text-red-500">
            No tienes aplicaciones a Oferta de Vacante.
          </p>
          <p className="m-2 p-2 text-center">
            Entra a tu menú de navegación y haz clic en la opción{" "}
            <i>“Oferta de Vacantes”, </i> y ¡Aplica ya!
          </p>
        </div>
      ) : applications && applications.length > 0 ? (
        <OffertCards
          internships={applications.map((internship) => ({
            ...internship,
            handleApply: handleApply,
            //stado: internship.
           
          }))}
        />
      ) : null}

  
    </>
  );
}
