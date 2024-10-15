"use client";
import ContainerWeb from "@/components/ContainerWeb";
import Header from "@/components/HeaderLucide";
import axios from "axios";
import { use, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

type stats = {
  processing: number;
  internshipsCompleted: number;
  serviceCompleted: number;
  pending: number;
};

type pendingList = {
  User: {
    names: string;
    lastnames: string;
    esInfo: {
      career: {
        name: string;
      };
    };
  };
};

type data = {
  labels: string[];
  datasets: { data: number[]; backgroundColor: string[] }[];
};

export default function Page() {
  const [stats, setStats] = useState<stats | null>(null);
  const [pendingList, setPendingList] = useState<pendingList[]>([]);
  const [data, setData] = useState<data>({
    labels: [
      "En proceso",
      "Pasantías Completadas",
      "Servicio Comunitario Completados",
      "Pendientes",
    ],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: ["#3b82f6", "#22c55e", "#f59e0b"],
      },
    ],
  });

  const getStats = async () => {
    try {
      const res = await axios.get("/api/alcaldia/stats");
      setStats({
        processing: res.data.processing,
        internshipsCompleted: res.data.internshipsCompleted,
        serviceCompleted: res.data.serviceCompleted,
        pending: res.data.pending,
      });
      setPendingList(res.data.pendingList);
      setData({
        labels: [
          "En proceso",
          "Pasantías Completadas",
          "Servicio Comunitario Completados",
          "Pendientes",
        ],
        datasets: [
          {
            data: [
              res.data.processing,
              res.data.internshipsCompleted,
              res.data.serviceCompleted,
              res.data.pending,
            ],
            backgroundColor: ["#3b82f6", "#22c55e", "#FFFF00", "#f59e0b"],
          },
        ],
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    }
  };

  ChartJS.register(ArcElement, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Distribución de estudiantes",
      },
    },
  };

  const totalEst = () => {
    if (stats)
      return (
        stats.internshipsCompleted +
        stats.serviceCompleted +
        stats.pending +
        stats.processing
      );
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <>
      <Header title="Métricas de Pasantías y Servicio Comunitario">
        <p>
          Bienvenido al panel de métricas de pasantías y servicios comunitarios. Esta herramienta proporciona una <span className="font-semibold">Visión Integral del Progreso y Participación de la Población del Rol Estudiante</span> registrada en el sistema. Esta herramienta te permitirá:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Segmnetar la cantidad de estudiantes involucrados en pasantías y servicio comunitario.</li>
          <li>Identificar facilmente los estudiantes en estatus <i>"Pendiente",</i> para su pronta respuesta.</li>
          <li>Identificar facilmente los estudiantes en estatus <i>"Activos y terminados",</i> para su seguimiento y archivo, respectivamente.</li>
          <li>Analiza la distribución por estados de cada proceso.</li>
          <li>Identifica tendencias y áreas de oportunidad para mejorar la participación estudiantil.</li>
          <li>Evalúa el impacto de estos programas en la comunidad y el desarrollo profesional de los estudiantes, dado el numero de procesos activos.</li>
          <li>Utiliza datos en tiempo real para tomar decisiones informadas y ajustar políticas educativas.</li>
        </ul>
        <p className="mt-3">
          Estas métricas son esenciales para optimizar la gestión de programas educativos y fortalecer la conexión entre la educación superior y las necesidades de nuestra comunidad.
        </p>
      </Header>
      <ContainerWeb>
        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-medium text-gray-500">
                Total de estudiantes
              </h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-2xl font-bold">{totalEst()}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-medium text-gray-500">
                Estudiantes en Proceso
              </h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-2xl font-bold">{stats?.processing}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-medium text-gray-500">
                Pasantías Completadas
              </h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-2xl font-bold">{stats?.internshipsCompleted}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-medium text-gray-500">
                Servicio Comunitario Completados
              </h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-2xl font-bold">{stats?.serviceCompleted}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-medium text-gray-500">
                Pendientes de Revisión
              </h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-2xl font-bold">{stats?.pending}</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-6"></div>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
              Distribución de estudiantes
            </h2>
            <div className="h-64">
              <Pie data={data} options={options} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
              Estudiantes Pendientes de Revisión
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              Últimos estudiantes pendientes
            </p>
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left text-sm font-medium text-gray-500">
                    Nombre
                  </th>
                  <th className="text-left text-sm font-medium text-gray-500">
                    Carrera
                  </th>
                </tr>
              </thead>
              <tbody>
                {pendingList?.map((student, index) => (
                  <tr key={index}>
                    <td className="py-2">
                      {student.User.names} {student.User.lastnames}
                    </td>
                    <td className="py-2">{student.User.esInfo.career.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ContainerWeb>
    </>
  );
}
