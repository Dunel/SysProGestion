"use client";
import ContainerWeb from "@/components/ContainerWeb";
import GridContainer from "@/components/GridContainer";
import GridMain from "@/components/GridMain";
import Header from "@/components/Header";
import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import InternShipCardReceived from "@/components/offerts/InternShipCardReceived";

interface Internship {
  id: number;
  title: string;
  description: string;
  location: string;
  type: "pasantia" | "servicio" | "proyecto";
  date: Date;
  skills: string[];
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
      status: string;
      User: {
        cedula: string;
        names: string;
        lastnames: string;
        mail: string;
        birthdate: string;
        phone: string;
        image: string;
        esInfo: {
          university: string;
          career: string;
          quarter: string;
          address: string;
          skills: string[];
          description: string;
          curriculum: string;
        };
      };
    }
  ];
}

export default function Page({ params }: { params: { id: string } }) {
  const [applications, setApplications] = useState<Internship>();
  const [squeleton, setSqueleton] = useState(true);
  const router = useRouter();

  const getApplication = async () => {
    try {
      setSqueleton(true);
      const res = await axios.get(
        "/api/dependencia/apply/myapply/received?id=" + params.id
      );
      //console.log(res.data);
      setApplications(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data);
      } else {
        console.error("error:", error);
      }
      router.push("/dependencia/misofertas");
    } finally {
      setSqueleton(false);
    }
  };

  const skillsOptions = [
    { value: "resoluciondeproblemas", label: "Resolución de Problemas" },
    { value: "trabajoenequipo", label: "Trabajo en Equipo" },
    { value: "adaptabilidad", label: "Adaptabilidad" },
    { value: "comunicacionefectiva", label: "Comunicación Efectiva" },
    { value: "liderazgo", label: "Liderazgo" },
    { value: "pensamientocritico", label: "Pensamiento Crítico" },
    { value: "orientacionaresultados", label: "Orientación a Resultados" },
    { value: "creatividad", label: "Creatividad" },
    { value: "gestiondeltiempo", label: "Gestión del Tiempo" },
    { value: "aprendizajecontinuo", label: "Aprendizaje Continuo" },
    { value: "dondegente", label: "Don de Gente" },
    { value: "ensenanza", label: "Enseñanza" },
    { value: "sociable", label: "Sociable" },
    { value: "salud", label: "Salud" },
    { value: "deportes", label: "Deportes" },
    { value: "logistica", label: "Logística" },
    { value: "expresionesartisticas", label: "Expresiones Artísticas" },
    { value: "diseno", label: "Diseño" },
    { value: "musica", label: "Música" },
    { value: "ingles", label: "Inglés" },
    { value: "otrosidiomasnaturales", label: "Otros Idiomas Naturales" },
    { value: "lenguajesdeprogramacion", label: "Lenguajes de Programación" },
  ];

  const ofertsType = [
    { key: "pasantia", name: "Pasantía" },
    { key: "servicio", name: "Servicio Comunitario" },
  ];

  const ofertsStatus = [
    { key: "active", name: "Activa" },
    { key: "inactive", name: "Inactiva" },
  ];

  const updateOfert = async () => {};

  useEffect(() => {
    getApplication();
  }, []);

  return (
    <>
      <Header title={"Solicitudes Recibidas"} subtitle={""} />
      <ContainerWeb>
        <GridMain>
          <GridContainer>
            {squeleton ? (
              <Skeleton />
            ) : (
              <>
                <InternShipCardReceived internship={applications} getApplication={getApplication}/>
              </>
            )}
          </GridContainer>
        </GridMain>
      </ContainerWeb>
    </>
  );
}