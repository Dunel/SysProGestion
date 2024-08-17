"use client";
import GridContainer from "@/components/GridContainer";
import Header from "@/components/Header";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import InternshipCards from './InternshipCards';

type Application = {
  id: number;
  title: string;
  description: string;
  location: string;
  status: string;
  apply: [
    {
      id: number;
      status: string;
    }
  ];
};

export default function Page() {

  const internships = [
    {
      id: 1,
      titleVacante: "Practicante de Derecho para la defensa de niños y niñas en situación de vulnerabilidad",
      dependencia: "Instituto de la Mujer del Sur",
      location: "Parroquia Casique Mara, Municipio Maracaibo, calle 23 con Av 20", 
      descriptionVacante: "Se requiere de...", 
      statusVacante: 'Activa',
      statusAplication: [{ id: 1, status: "En proceso" }],
      imgDependencia: "https://media.noticiaalminuto.com/wp-content/uploads/2021/01/IMM-Maracaibo.jpg",
      skills: [
        { id: 1, name: "Don de Gente" },
        { id: 2, name: "Trabajo en Equipo" },
        { id: 3, name: "Resolución de Problemas" },
      ],
    },
    // ... más pasantías
  ];

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
      const res = await axios.get("/api/estudiante/apply/myapply");
      console.log("data: ", res.data.applications);
      setApplications(res.data.applications);
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
          subtitle={"Aqui podras visuazar todas las Ofertas de Vacantes de Pasantias y Servicio Comunitario a las que has demostrado interes aplicando."} 
         />  
       
          <InternshipCards internships={internships.map(internship => ({
           ...internship,
           statusAplication: [{ id: internship.statusAplication[0].id, status: internship.statusAplication[0].status }]
          }))} />

    

      <div>
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
                      {application.description}
                    </p>
                    <p className="mt-2 text-gray-600">
                      Ubicación: {application.location}
                    </p>
                    <p className="mt-2 text-gray-600">
                      Estado de la solicitud: {application.status}
                    </p>
                    <p className="mt-2 text-gray-600">
                      Estado de tu apply: {application.apply[0].status}
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
                <p>No tienes solicitudes</p>
              </GridContainer>
            )}
      </div>


         
        
    </>
  );
}