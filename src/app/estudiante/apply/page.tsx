"use client";
import ContainerWeb from "@/components/ContainerWeb";
import GridContainer from "@/components/GridContainer";
import GridMain from "@/components/GridMain";
import GridSecond from "@/components/GridSecond";
import Header from "@/components/Header";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

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
      <Header title={"SOLICITUDES"} subtitle={"Aquí podras "} />
      <ContainerWeb>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GridMain>
            {applications && applications.length > 0 ? (
              applications.map((application) => (
                <div
                  key={application.id}
                  className="bg-white shadow-md rounded-lg p-8 mb-3"
                >
                  <div>
                    <h2 className="text-gray-800 text-3xl font-semibold">
                      {application.title}
                    </h2>
                    <p className="mt-2 text-gray-600">
                      {typeDesc[application.type]}
                    </p>
                    <p className="mt-2 text-gray-600">
                      {application.description}
                    </p>
                    <p className="mt-2 text-gray-600">{application.location}</p>
                    <p className="mt-2 text-gray-600">
                      {application.status === "active" ? "Activa" : "Inactiva"}
                    </p>
                    
                    
                    
                    
                    <div className="flex justify-between items-start mt-4">
                      {application.status === "inactive" ||
                      application.apply.length > 0 ? (
                        <>
                          <button
                            className="bg-gray-600 text-white font-bold py-2 px-4 rounded"
                            disabled
                          >
                            {application.status === "inactive"
                              ? "Oferta inactiva"
                              : "Solicitud enviada"}
                          </button>
                          {application.apply.length > 0 && (
                            <button
                              className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                              onClick={() =>
                                handleDeleteApply(
                                  application.id,
                                  application.apply[0].id
                                )
                              }
                            >
                              Borrar solicitud
                            </button>
                          )}
                        </>
                      ) : (
                        <button
                          className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleApply(application.id)}
                        >
                          Enviar solicitud
                        </button>
                      )}
                    </div>



                    
                  </div>
                </div>
              ))
            ) : (
              <GridContainer>
                <p>No hay solicitudes disponibles</p>
              </GridContainer>
            )}
          </GridMain>

          <GridSecond>
            <GridContainer>{session?.user?.email}</GridContainer>
          </GridSecond>
        </div>
      </ContainerWeb>
    </>
  );
}