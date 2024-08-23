"use client";
import Header from "@/components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import InternshipCards from './InternshipCards';
import Modal from '@/components/Modal';
import Skeleton from '@/components/ui/SkeletonComponent';



type Application = {
  id: number;
  title: string;
  description: string;
  location: string;
  type: "pasantia" | "servicio" | "proyecto";
  imagen: string;
  date: Date;
  skills: string[];
  status: string;
  apply: [
    {
      id: number;
      status: string;
    }
  ];
};

export default function Page() {
  const [applications, setApplications] = useState<Application[]>();
  const [loading, setLoading] = useState(false);
  const [squeleton, setSqueleton] = useState(true);
  const [spanRetirar, setSpanRetirar] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [codeOferta, setCodeOferta] = useState(0);//!ESTO DEBERIA SER EL CODIGO DE LA OFERTA EJ P-2024-1001, para identificarla en el modal al preguntar si la desea retirar
  const [applicationToDelete, setApplicationToDelete] = useState<{ id: number; applyId: number } | null>(null);

//!QUE HACE ESTA FUNCION? NO ES UTILIZADA!
  // const handleApply = async (id: number) => {
  //   try {
  //     setLoading(true);
  //     setSqueleton(true);
  //     const res = await axios.post("/api/estudiante/apply", { id });
  //     console.log(res.data);
  //     getApplications();
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       console.log("error lanzado:", error.response?.data.error);
  //     } else {
  //       console.error("error:", error);
  //     }
  //   } finally {
  //     setLoading(false);
  //     setSqueleton(false)
  //   }
  // };

  const handleDeleteApply = async () => {
    if (applicationToDelete) {

      const { id, applyId } = applicationToDelete;

      try {
        setSpanRetirar(true)
        const res = await axios.delete("/api/estudiante/apply", {
          data: { idAplication: id, applyId },
        });
        console.log(res.data);
        getApplications();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("error lanzado:", error.response?.data.error);
        } else {
          console.error("error:", error);
        }
      } finally {
        setSpanRetirar(false);
        setModalOpen(false); // Cierra el modal después de la eliminación
        setApplicationToDelete(null); // Resetea el estado
      }
    }
  };

  const confirmDelete = (id: number, applyId: number) => {
    setApplicationToDelete({ id, applyId });
    setCodeOferta(id)
    setModalOpen(true);
  };

  const getApplications = async () => {
    try {
      setLoading(true);
      setSqueleton(true);

      const res = await axios.get("/api/estudiante/apply/myapply");
      console.log("data: ", res.data.applications);
      setApplications(res.data.applications);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    } finally {
      setLoading(false);
      setSqueleton(false)

    }
  };

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <>
   
      <Header 
          title={"MIS APLICACIONES A OFERTAS DE VACANTE"} 
          subtitle={"Aquí podrás visualizar todas las Ofertas de Vacantes de Pasantías, Servicio Comunitario y Proyectos de tesis a las que has aplicado exitosamente."} 
          />
 
         {squeleton 
         
            ? <Skeleton/>

            : applications && applications.length === 0 
                ? <div className="flex flex-col justify-center items-center mt-12 mx-auto bg-white w-[60%] min-h-[30vh]">
                    <p className="m-2 p-2 text-center text-red-500">No tienes aplicaciones a Oferta de Vacante.</p>
                    <p className="m-2 p-2 text-center">Entra a tu menú de navegación y haz clic en la opción <i>“Oferta de Vacantes”, </i> y ¡Aplica ya!</p>
                  </div>
                : applications && applications.length > 0
                  ? <InternshipCards 
                        internships={applications.map(internship => ({
                          ...internship,
                          dependencia: 'Instituto de la Mujer del Sur',
                          handleDeleteApply: confirmDelete, // Pasamos la función confirmDelete
                          imagen: "https://media.noticiaalminuto.com/wp-content/uploads/2021/01/IMM-Maracaibo.jpg",
                          skills: [
                            { id: 1, name: "Don de Gente" },
                            { id: 2, name: "Trabajo en Equipo" },
                            { id: 3, name: "Resolución de Problemas" },
                          ],
                        }))} 
                    />
                    : null
          }

          <Modal
              info={`¿Estás seguro de que deseas retirar su aplicación a la oferta ID: ${codeOferta}`}
              isLoading={spanRetirar}
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
              onConfirm={handleDeleteApply}
          />
    
    </>
  );
}


