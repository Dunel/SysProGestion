"use client";
import ContainerWeb from "@/components/ContainerWeb";
import GridContainer from "@/components/GridContainer";
import GridMain from "@/components/GridMain";
import Header from "@/components/Header";
import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import InternshipCards from "@/app/alcaldia/ofertas/InternshipCards";
import axios from "axios";
import Modal from "@/components/Modal";
import { Oval } from "react-loader-spinner";

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
  dependencia: {
    name: string;
    User: {
      image: string;
    };
  };
  _count: {
    apply: number;
    applicationApproved: number;
  }
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
        const res = await axios.delete("/api/alcaldia/apply/myapply", {
          data: { id },
        });
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
      const res = await axios.get("/api/alcaldia/apply/myapply");
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

  const [loading, setLoading] = useState(false);
  const handleOficio = async (id: number) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `/api/alcaldia/doc`,
        { id },
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = `oficio${id}_modificado.docx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    }finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <>
      <Header title={"MIS OFERTAS"} subtitle={""} />
      <ContainerWeb>
        <GridMain>
          {squeleton ? (
            <GridContainer>
              <Skeleton />
            </GridContainer>
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
                  handleOficio,
                  loading:loading
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
        </GridMain>
      </ContainerWeb>
    </>
  );
}