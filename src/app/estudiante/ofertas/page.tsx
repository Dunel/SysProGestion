// "use client";
// import Header from "@/components/Header";
// import axios from "axios";
// import { useSession } from "next-auth/react";
// import { useState, useEffect } from "react";
// import Skeleton from '@/components/ui/SkeletonComponentLines';
// import OffertCards from '@/app/estudiante/ofertas/OffertCards'


// type Application = {
//   id: number;
//   title: string;
//   type: "pasantia" | "servicio" | "proyecto";
//   description: string;
//   imagen: string;
//   skills: string[];
//   date: Date;
//   location: string;
//   status: string;
//   apply: [
//     {
//       id: number;
//     }
//   ];
// };

// export default function Page() {
//   const { data: session } = useSession();
//   const [applications, setApplications] = useState<Application[]>();
//   const [squeleton, setSqueleton] = useState(true);


//   const handleApply = async (id: number) => {
//     try {
//       const res = await axios.post("/api/estudiante/apply", { id });
//       console.log(res.data);
//       getApplications();
//       alert("Solicitud enviada");
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.log("error lanzado:", error.response?.data.error);
//       } else {
//         console.error("error:", error);
//       }
//     }
//   };

//   const handleDeleteApply = async (idAplication: number, applyId: number) => {
//     try {
//       const res = await axios.delete("/api/estudiante/apply", {
//         data: { idAplication, applyId },
//       });
//       console.log(res.data);
//       getApplications();
//       alert("Solicitud eliminada");
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.log("error lanzado:", error.response?.data.error);
//       } else {
//         console.error("error:", error);
//       }
//     }
//   };

//   const getApplications = async () => {
//     try {
//       const res = await axios.get("/api/estudiante/apply");
//       setApplications(res.data.applications);
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.log("error lanzado:", error.response?.data.error);
//       } else {
//         console.error("error:", error);
//       }
//     }
//   };
//   useEffect(() => {
//     getApplications();
//   }, []);

//   const typeDesc = {
//     pasantia: "Pasantía",
//     servicio: "Servicio Comunitario",
//     proyecto: "Proyecto",
//   };

//   console.log('Application', applications);
 
"use client";
import Header from "@/components/Header";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Skeleton from '@/components/ui/SkeletonComponentLines';
import InternshipCards from "./OffertCards";


type Application = {
  id: number;
  title: string;
  type: "pasantia" | "servicio" | "proyecto";
  description: string;
  skills: string[];
  date: Date;
  location: string;
  status: string;
  dependencia: {
    name: string;
    User: {
      image: string;
    };
  };
  apply: [
    {
      id: number;
    }
  ];
};

export default function Page() {
  const { data: session } = useSession();
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
    }
  };

  const handleDeleteApply = async (idAplication: number, applyId: number) => {
    try {
      const res = await axios.delete("/api/estudiante/apply", {
        data: { idAplication, applyId },
      });
      console.log(res.data);
      getApplications();
      alert("Solicitud eliminada");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error);
      }
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
      <Header title={"OFERTAS DE VACANTES"} subtitle={"Aquí podras ver todas las ofertas de Vacante de Pasantias y Servicio Comunitarios que las Dependencias han publicado"} />
      {squeleton && <Skeleton/>}

      <div className="flex flex-col items-center bg-white rounded-lg shadow-md m-4 mb-8 p-2 w-[90%] mx-auto my-5"> 
            {applications && applications.length > 0 
              ? (
                applications.map((noti) => (

                      //           <InternshipCards
                      //             internships={applications.map((internship) => ({
                      //             ...internship,
                      //             handleDeleteApply:confirmDelete, // Pasamos la función confirmDelete
                      //             handleApply:handleApply,
                      //             flagOffer:true //Funcion de vista Oferta
                      //   }))}
                      // />
                            
                    <>hola</>

                ))
                ) 
              : (
                <div className="flex flex-col justify-center items-center mt-12 mx-auto bg-white w-[60%] min-h-[30vh]">
                    <p className="m-2 p-2 text-center text-red-500">No tienes Notificaciones.</p>
                    <p className="m-2 p-2 text-center">Entra a tu menú de navegación y haz clic en la opción <i>“Oferta de Vacantes”, </i> y sé parte de procesos!</p>
                  </div>
              )}
           
        </div>
    </>
  );
}