"use client";
import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import axios from "axios";
import { cn } from "@/lib/utils";
import ContainerWeb from "@/components/ContainerWeb";
import GridContainer from "@/components/GridContainer";
import { Oval } from "react-loader-spinner";

export type Logs = {
  id: number;
  description: string;
  date: string;
  username: any;
  userCedula: number;
  createdAt: string;
  User: {
    role: string;
    depInfo: {
      name: string;
    } | null;
    alcaldiaInfo: {
      name: string;
    } | null;
  };
};

export default function WebLogs() {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [logs, setLogs] = useState<Logs[]>([]);
  const [totalLogs, setTotalLogs] = useState(0);
  const logsPerPage = 10;
  const totalPages = Math.ceil(totalLogs / logsPerPage);

  const getLogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/alcaldia/logs?page=${currentPage}`);
      setLogs(res.data.logs);
      setTotalLogs(res.data.count);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLogs();
  }, [currentPage]);

  return (
    <>
      <Header title="Registros de Actividad del Usuario" subtitle={""} />
      <ContainerWeb>
        <GridContainer>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha y Hora</TableHead>
                  <TableHead>Nombre de Usuario</TableHead>
                  <TableHead>ID/CEDULA</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Descripción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{new Date(log.date).toLocaleString()}</TableCell>
                    <TableCell>
                      {log.User.alcaldiaInfo
                        ? log.User.alcaldiaInfo.name
                        : log.User.depInfo?.name}
                    </TableCell>
                    <TableCell>{log.userCedula}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          `px-2 py-1 rounded-full text-xs font-mediu`,
                          log.User.role === "alcaldia"
                            ? "bg-green-400"
                            : "bg-yellow-400"
                        )}
                      >
                        {log.User.role.toLocaleUpperCase()}
                      </span>
                    </TableCell>
                    <TableCell>{log.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {loading && (
              <div className="flex justify-center items-center flex-col mt-10">
                <Oval
                  color="#000000"
                  secondaryColor="#FFFFFF"
                  height={50}
                  width={50}
                  strokeWidth={5}
                />
                <br />
                <span>Espere por favor...</span>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
            </Button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Siguiente <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </GridContainer>
      </ContainerWeb>
    </>
  );
}
