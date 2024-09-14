"use client";
import Header from "@/components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import InternshipCards from "./InternshipCards";
import Modal from "@/components/Modal";
import Skeleton from "@/components/ui/SkeletonComponent";

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
  const [spanRetirar, setSpanRetirar] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [codeOferta, setCodeOferta] = useState(0);
  const [applicationToDelete, setApplicationToDelete] = useState<{
    id: number;
    applyId: number;
  } | null>(null);

  const handleDeclineApply = async () => {
    if (applicationToDelete) {
      const { id, applyId } = applicationToDelete;

      try {
        setSpanRetirar(true);
        const res = await axios.put("/api/estudiante/apply/myapply", {
          idAplication: id,
          applyId,
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
    setCodeOferta(id);
    setModalOpen(true);
  };

  const getApplications = async () => {
    try {
      setSqueleton(true);

      const res = await axios.get("/api/estudiante/apply/myapply");
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

  const acceptOffer = async (idApp: number, applyId: number) => {
    try {
      const res = await axios.post("/api/estudiante/apply/myapply", {
        idApp,
        applyId,
      });
      console.log(res.data);
      getApplications();
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

  return (
    <>
      <Header
        title={"MIS APLICACIONES A OFERTAS DE VACANTE"}
        subtitle={
          "Aquí podrás visualizar todas las Ofertas de Vacantes de Pasantías, Servicio Comunitario y Proyectos de tesis a las que has aplicado exitosamente."
        }
      />

      {squeleton ? (
        <Skeleton />
      ) : applications && applications.length === 0 ? (
        <div className="flex flex-col justify-center items-center mt-12 mx-auto bg-white w-[60%] min-h-[30vh]">
          <p className="m-2 p-2 text-center text-red-500">
            No tienes aplicaciones a Oferta de Vacante.
          </p>
          <p className="m-2 p-2 text-center">
            Entra a tu menú de navegación y haz clic en la opción{" "}
            <i>“Oferta de Vacantes”, </i> y ¡Aplica ya!
          </p>
        </div>
      ) : applications && applications.length > 0 ? (
        <InternshipCards
          internships={applications.map((internship) => ({
            ...internship,
            handleDeleteApply: confirmDelete, // Pasamos la función confirmDelete
            handleAcceptApply: acceptOffer,
          }))}
        />
      ) : null}

      <Modal
        info={`¿Estás seguro de que deseas retirar su aplicación a la oferta ID: ${codeOferta}`}
        isLoading={spanRetirar}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDeclineApply}
      />
    </>
  );
}
