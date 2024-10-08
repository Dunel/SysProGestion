"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import GridContainer from "@/components/GridContainer";
import Header from "@/components/Header";
import GridMain from "@/components/GridMain";
import ContainerWeb from "@/components/ContainerWeb";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Students = {
  date: string;
  application: {
    tutor: string;
    dependencia: {
      name: string;
    };
  };
  esInfo: {
    gender: "M" | "F";
    bankName: string;
    bankAccount: string;
    cneRegister: boolean;
    cneCentroName: string;
    cneParroquia: string;
    institution: {
      name: string;
    };
    career: {
      name: string;
    };
    address: string;
    User: {
      names: string;
      lastnames: string;
      cedula: number;
      mail: string;
      birthdate: string;
      phone: string;
      estado: {
        estado: string;
      };
      municipio: {
        municipio: string;
      };
      parroquia: {
        parroquia: string;
      };
    };
  };
};

type Careers = {
  id: number;
  name: string;
};

type Institutions = {
  id: number;
  name: string;
};

type Dependencia = {
  id: number;
  name: string;
};

type Parroquia = {
  id: number;
  municipioId: number;
  parroquia: string;
};

type FiltroEstudiantes = {
  carrera?: string;
  institucion?: string;
  dependencia?: string;
  parroquia?: string;
  edad?: number;
  edadMin?: number;
  edadMax?: number;
};

export default function ReportGenerator() {
  const [students, setStudents] = useState<Students[]>([]);
  const [careers, setCareers] = useState<Careers[]>([]);
  const [careersOpen, setCareersOpen] = useState(false);
  const [institutions, setInstitutions] = useState<Institutions[]>([]);
  const [institutionsOpen, setInstitutionsOpen] = useState(false);
  const [parroquias, setParroquias] = useState<Parroquia[]>([]);
  const [parroquiasOpen, setparroquiasOpen] = useState(false);
  const [dependencias, setDependencias] = useState<Dependencia[]>([]);
  const [dependenciasOpen, setDependenciasOpen] = useState(false);
  const [carrera, setCarrera] = useState("");
  const [institucion, setInstitucion] = useState("");
  const [parroquia, setParroquia] = useState("");
  const [dependencia, setDependencia] = useState("");
  const [edadTipo, setEdadTipo] = useState("nofiltrar");
  const [edadEspecifica, setEdadEspecifica] = useState("");
  const [edadRangoInicio, setEdadRangoInicio] = useState("");
  const [edadRangoFin, setEdadRangoFin] = useState("");
  const [report, setReport] = useState<Students[]>([]);
  const [notFound, setNotFound] = useState(null as boolean | null);

  const handleGenerateReport = () => {
    const filteredStudents = filtrarEstudiantes(students, {
      carrera,
      institucion,
      dependencia,
      parroquia,
      edad: edadTipo === "especifica" ? Number(edadEspecifica) : undefined,
      edadMin: edadTipo === "rango" ? Number(edadRangoInicio) : undefined,
      edadMax: edadTipo === "rango" ? Number(edadRangoFin) : undefined,
    });
    setNotFound(filteredStudents.length > 0);
    setReport(filteredStudents);
  };

  function filtrarEstudiantes(
    estudiantes: Students[],
    filtro: FiltroEstudiantes
  ): Students[] {
    return estudiantes.filter((estudiante) => {
      const edad = calcularEdad(estudiante.esInfo.User.birthdate);

      const cumpleCarrera = filtro.carrera
        ? estudiante.esInfo.career.name.toLowerCase() ===
          filtro.carrera.toLowerCase()
        : true;

      const cumpleInstitucion = filtro.institucion
        ? estudiante.esInfo.institution.name.toLowerCase() ===
          filtro.institucion.toLowerCase()
        : true;

      const cumpleDependencia = filtro.dependencia
        ? estudiante.application.dependencia.name.toLowerCase() ===
          filtro.dependencia.toLowerCase()
        : true;

      const cumpleParroquia = filtro.parroquia
        ? estudiante.esInfo.User.parroquia.parroquia.toLowerCase() ===
          filtro.parroquia.toLowerCase()
        : true;

      const cumpleEdad =
        filtro.edad !== undefined ? edad === filtro.edad : true;

      const cumpleEdadMin =
        filtro.edadMin !== undefined ? edad >= filtro.edadMin : true;

      const cumpleEdadMax =
        filtro.edadMax !== undefined ? edad <= filtro.edadMax : true;

      return (
        cumpleCarrera &&
        cumpleInstitucion &&
        cumpleDependencia &&
        cumpleParroquia &&
        cumpleEdad &&
        cumpleEdadMin &&
        cumpleEdadMax
      );
    });
  }

  function calcularEdad(birthdate: string): number {
    const fechaNacimiento = new Date(birthdate);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }

    return edad;
  }

  const handleDownloadReport = async (report: Students[]) => {
    try {
      const res = await axios.post(
        "/api/alcaldia/doc/reports",
        {
          students: report,
        },
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = "reporte.xlsx";
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
    }
  };

  const getEstudiantes = async () => {
    try {
      const res = await axios.get("/api/alcaldia/stats/students");
      setStudents(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    }
  };

  const getCareer = async () => {
    try {
      const res = await axios.get("/api/alcaldia/career");
      setCareers(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    }
  };

  const getInstitucion = async () => {
    try {
      const res = await axios.get("/api/alcaldia/institutions");
      setInstitutions(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    }
  };

  const getParroquias = async () => {
    try {
      const res = await axios.get("/api/venezuela/parroquias?municipioId=454");
      setParroquias(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    }
  };

  const getDependencias = async () => {
    try {
      const res = await axios.get("/api/alcaldia/dependencias");
      setDependencias(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    }
  };

  const isInstitucionSelected = !!institucion;

  useEffect(() => {
    getEstudiantes();
    getParroquias();
    getCareer();
    getInstitucion();
    getDependencias();
  }, []);

  return (
    <>
      <Header title={"REPORTES"} subtitle={"..."} />
      <ContainerWeb>
        <GridMain>
          <GridContainer>
            <div className="space-y-2">
              <Label htmlFor="parroquia">Parroquia</Label>
              <Input
                id="parroquia"
                type="text"
                value={parroquia}
                onClick={() => setparroquiasOpen(!parroquiasOpen)}
                readOnly
                className="bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                placeholder="Selecciona una Parroquia"
              />
              {parroquiasOpen && (
                <div className="fixed z-20 mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
                  <div
                    onClick={() => {
                      setParroquia("");
                      setparroquiasOpen(false);
                    }}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {"- Selecciona una Parroquia -"}
                  </div>
                  {parroquias.map((e, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setParroquia(e.parroquia);
                        setparroquiasOpen(false);
                      }}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {e.parroquia}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="carrera">Carrera</Label>
              <Input
                id="career"
                type="text"
                value={carrera}
                onClick={() => setCareersOpen(!careersOpen)}
                readOnly
                className="bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                placeholder="Selecciona una Carrera"
              />
              {careersOpen && (
                <div className="fixed z-20 mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
                  <div
                    onClick={() => {
                      setCarrera("");
                      setCareersOpen(false);
                    }}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {"- Selecciona una Carrera -"}
                  </div>
                  {careers.map((e, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setCarrera(e.name);
                        setCareersOpen(false);
                      }}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {e.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="institucion">Institución</Label>
              <Input
                id="institucion"
                type="text"
                value={institucion}
                onClick={() => setInstitutionsOpen(!institutionsOpen)}
                readOnly
                className="bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                placeholder="Selecciona una Institución"
              />
              {institutionsOpen && (
                <div className="fixed z-20 mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
                  <div
                    onClick={() => {
                      setInstitucion("");
                      setInstitutionsOpen(false);
                    }}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {"- Selecciona una Institución -"}
                  </div>
                  {institutions.map((e, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setInstitucion(e.name);
                        setInstitutionsOpen(false);
                      }}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {e.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dependencia">Dependencia</Label>
              <Input
                id="dependencia"
                type="text"
                value={dependencia}
                onClick={() => setDependenciasOpen(!dependenciasOpen)}
                readOnly
                className="bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                placeholder="Selecciona una Dependencia"
              />
              {dependenciasOpen && (
                <div className="fixed z-20 mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
                  <div
                    onClick={() => {
                      setDependencia("");
                      setDependenciasOpen(false);
                    }}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {"- Selecciona una Dependencia -"}
                  </div>
                  {dependencias.map((e, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setDependencia(e.name);
                        setDependenciasOpen(false);
                      }}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {e.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 space-y-2">
              <Label>Edad</Label>
              <RadioGroup
                value={edadTipo}
                onValueChange={setEdadTipo}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nofiltrar" id="nofiltrar" />
                  <Label htmlFor="nofiltrar">No filtrar por edad</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="especifica" id="especifica" />
                  <Label htmlFor="especifica">Edad específica</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rango" id="rango" />
                  <Label htmlFor="rango">Rango de edad</Label>
                </div>
              </RadioGroup>

              {edadTipo === "especifica" && (
                <Input
                  id="edadEspecifica"
                  type="number"
                  value={edadEspecifica}
                  onChange={(e) => setEdadEspecifica(e.target.value)}
                  className="w-full"
                  placeholder="Edad"
                />
              )}
              {edadTipo === "rango" && (
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    id="edadRangoInicio"
                    type="number"
                    value={edadRangoInicio}
                    onChange={(e) => setEdadRangoInicio(e.target.value)}
                    className="w-full"
                    placeholder="Min"
                  />
                  <Input
                    id="edadRangoFin"
                    type="number"
                    value={edadRangoFin}
                    onChange={(e) => setEdadRangoFin(e.target.value)}
                    className="w-full"
                    placeholder="Max"
                  />
                </div>
              )}
            </div>
            <Button
              onClick={handleGenerateReport}
              className="w-full mt-6 bg-black text-white p-6"
            >
              GENERAR REPORTE
            </Button>
            {report.length > 0 && (
              <Button
                onClick={() => {
                  handleDownloadReport(report);
                }}
                className="w-full mt-6 bg-green-800 text-white p-6"
              >
                DESCARGAR REPORTE FORMATO EXCEL
              </Button>
            )}
          </GridContainer>

          {notFound === false ? (
            <>NO EXISTEN REGISTRO CON ESE CRITERIO DE BUSQUEDA</>
          ) : (
            notFound && (
              <div className="bg-white">
                <h1 className="text-xl text-center font-extrabold my-6 md:text-3xl">
                  REPORTE GENERADO
                </h1>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-black text-white">
                      <TableHead>No.</TableHead>
                      <TableHead>Cedula</TableHead>
                      <TableHead>Nombres</TableHead>
                      <TableHead>Apellidos</TableHead>
                      <TableHead>Genero</TableHead>
                      <TableHead>Edad</TableHead>
                      <TableHead>Parroquia</TableHead>
                      <TableHead>Carrera</TableHead>
                      <TableHead>Institucion</TableHead>
                      <TableHead>Dependencia</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {report.map((e, index) => (
                      <TableRow
                        key={index}
                        className={`text-xs ${
                          index % 2 === 0 ? "bg-gray-100" : "bg-white"
                        }`}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{e.esInfo.User.cedula}</TableCell>
                        <TableCell>{e.esInfo.User.names}</TableCell>
                        <TableCell>{e.esInfo.User.lastnames}</TableCell>
                        <TableCell>
                          {e.esInfo.gender === "M" ? "Hombre" : "Mujer"}
                        </TableCell>
                        <TableCell>
                          {calcularEdad(e.esInfo.User.birthdate)}
                        </TableCell>
                        <TableCell>
                          {e.esInfo.User.parroquia.parroquia}
                        </TableCell>
                        <TableCell>{e.esInfo.career.name}</TableCell>
                        <TableCell>{e.esInfo.institution.name}</TableCell>
                        <TableCell>{e.application.dependencia.name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )
          )}
        </GridMain>
      </ContainerWeb>
    </>
  );
}
