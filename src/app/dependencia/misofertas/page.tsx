"use client";
import GridContainer from "@/components/GridContainer";
import Header from "@/components/Header";
import Skeleton from "@/components/ui/SkeletonComponent";
import { useEffect, useState } from "react";
import InternshipCards from "./InternshipCards";
import axios from "axios";
import Modal from "@/components/Modal";

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
  pay: boolean;
  tutor: string;
  apply: [];
  _count: {
    apply: number;
  };
  dependencia: {
    name: string;
    User: {
      image: string;
    };
  };
};

export default function Page() {
  const [applications, setApplications] = useState<Application[]>();
  const [squeleton, setSqueleton] = useState(true);
  const [spanRetirar, setSpanRetirar] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [codeOferta, setCodeOferta] = useState(0);
  const [applicationToDelete, setApplicationToDelete] = useState<{
    id: number;
    code: string;
  } | null>(null);

  const handleDeleteApply = async () => {
    if (applicationToDelete) {
      const { id } = applicationToDelete;
      try {
        setSpanRetirar(true);
        const res = await axios.delete("/api/dependencia/apply/myapply", {
          data: { id },
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
        setModalOpen(false);
        setApplicationToDelete(null);
      }
    }
  };

  const confirmDelete = (id: number, code: string) => {
    setApplicationToDelete({ id, code });
    setCodeOferta(id);
    setModalOpen(true);
  };

  const getApplications = async () => {
    try {
      setSqueleton(true);

      const res = await axios.get("/api/dependencia/apply/myapply");
      //console.log("data: ", res.data.applications);
      setApplications(res.data.applications);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    } finally {
      setSqueleton(false);
    }
  };

  const handleCloseApp = async (id: number) => {
    try {
      setSpanRetirar(true);
      const res = await axios.put("/api/dependencia/apply/myapply", { id });
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
    }
  }

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <>
      <Header title={"MIS OFERTAS DE VACANTES"} 
      subtitle={"Aquí puedes visualizar todas las ofertas a vacantes de Pasantías y Servicio Comunitario que has creado."} />
     
          {squeleton ? (
       
              <Skeleton />
          ) : applications && applications.length === 0 ? (
            <GridContainer>
              <p className="m-2 p-2 text-center text-red-500">
                No tienes aplicaciones a Oferta de Vacante.
              </p>
              <p className="m-2 p-2 text-center">
                Entra a tu menú de navegación y haz clic en la opción{" "}
                <i>“Oferta de Vacantes”, </i> y ¡Aplica ya!
              </p>
            </GridContainer>
          ) : applications && applications.length > 0 ? (
            <InternshipCards
              internships={applications.map((internship) => ({
                ...internship,
                handleDeleteApply: confirmDelete,
                handleCloseStatus: () => handleCloseApp(internship.id),
              }))}
            />
          ) : null}

          <Modal
            info={`¿Estás seguro de que deseas ELIMINAR la oferta ID: ${applicationToDelete?.code}`}
            isLoading={spanRetirar}
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            onConfirm={handleDeleteApply}
          />

   
    </>
  );
}
