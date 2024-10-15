"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import GridContainer from "@/components/GridContainer";
import Header from "@/components/HeaderLucide";
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
  gender: "M" | "F" | "";
  vote: boolean | null;
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
  const [gender, setGender] = useState<"M" | "F" | "">("");
  const [genderOpen, setGenderOpen] = useState(false);
  const [month, setMonth] = useState<number | null>(null);
  const [monthOpen, setMonthOpen] = useState(false);
  const [vote, setVote] = useState<boolean | null>(null);
  const [voteOpen, setVoteOpen] = useState(false);
  const [report, setReport] = useState<Students[]>([]);
  const [notFound, setNotFound] = useState(null as boolean | null);

  const [showClearButton, setShowClearButton] = useState(false);

  const handleGenerateReport = () => {
    const filteredStudents = filtrarEstudiantes(students, {
      carrera,
      institucion,
      dependencia,
      parroquia,
      edad: edadTipo === "especifica" ? Number(edadEspecifica) : undefined,
      edadMin: edadTipo === "rango" ? Number(edadRangoInicio) : undefined,
      edadMax: edadTipo === "rango" ? Number(edadRangoFin) : undefined,
      gender,
      vote,
    });
    setNotFound(filteredStudents.length > 0);
    setReport(filteredStudents);
  };

  const arrayMonths = [
    { id: 1, name: "Enero" },
    { id: 2, name: "Febrero" },
    { id: 3, name: "Marzo" },
    { id: 4, name: "Abril" },
    { id: 5, name: "Mayo" },
    { id: 6, name: "Junio" },
    { id: 7, name: "Julio" },
    { id: 8, name: "Agosto" },
    { id: 9, name: "Septiembre" },
    { id: 10, name: "Octubre" },
    { id: 11, name: "Noviembre" },
    { id: 12, name: "Diciembre" },
  ];

  function filtrarPorMes(student: Students, mesBuscado: number) {
    const fecha = new Date(student.date);
    const mes = fecha.getMonth() + 1;
    return mes === mesBuscado;
  }

  function filtrarEstudiantes(
    estudiantes: Students[],
    filtro: FiltroEstudiantes
  ): Students[] {
    return estudiantes.filter((estudiante) => {
      const edad = calcularEdad(estudiante.esInfo.User.birthdate);

      const cumpleVote = filtro.vote !== null ? estudiante.esInfo.cneRegister === filtro.vote : true;

      const cumpleMes = month ? filtrarPorMes(estudiante, month) : true;

      const cumpleGener = filtro.gender
        ? estudiante.esInfo.gender === filtro.gender
        : true;

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
        cumpleEdadMax &&
        cumpleGener &&
        cumpleMes &&
        cumpleVote
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
  
  const clearAllInputs = () => {
    setCarrera("");
    setInstitucion("");
    setParroquia("");
    setDependencia("");
    setEdadTipo("nofiltrar");
    setEdadEspecifica("");
    setEdadRangoInicio("");
    setEdadRangoFin("");
    setGender("");
    setMonth(null);
    setVote(null);
    
    // Close all dropdowns
    setCareersOpen(false);
    setInstitutionsOpen(false);
    setparroquiasOpen(false);
    setDependenciasOpen(false);
    setGenderOpen(false);
    setMonthOpen(false);
    setVoteOpen(false);

    // Reset the report and notFound state
    setReport([]);
    setNotFound(null);
  };


  useEffect(() => {
    const hasValue = 
      carrera !== "" ||
      institucion !== "" ||
      parroquia !== "" ||
      dependencia !== "" ||
      edadTipo !== "nofiltrar" ||
      edadEspecifica !== "" ||
      edadRangoInicio !== "" ||
      edadRangoFin !== "" ||
      gender !== "" ||
      month !== null ||
      vote !== null;

    setShowClearButton(hasValue);
  }, [carrera, institucion, parroquia, dependencia, edadTipo, edadEspecifica, edadRangoInicio, edadRangoFin, gender, month, vote]);

  return (
    <>
      {/* <Header title={"REPORTES"} subtitle={"..."} /> */}
      <Header title="Sistema de generación de Reportes">
        <p className="mt-3 text-gray-700">
        Aquí podrás realizar consultas avanzadas y generar <span className="font-semibold">Reportes Detallados de la Población del Rol Estudiante</span> registrada en el sistema. Esta herramienta te permitirá:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Filtrar estudiantes por diversos criterios como edad, género, institución educativa, carrera y más.</li>
          <li>Generar reportes personalizados en formato Excel y visualizaciones en tablas web.</li>
          <li>Obtener información crucial para la toma de decisiones en la gestión de la alcaldía.</li>
          <li>Analizar tendencias y patrones en la población estudiantil del municipio.</li>
          <li>Facilitar la planificación de programas y políticas educativas locales.</li>
        </ul>
        <p className="mt-3 text-gray-700">
        Utiliza los filtros disponibles para afinar tus búsquedas y obtener datos precisos que respalden las iniciativas y proyectos de la alcaldía en el ámbito educativo.
      </p>
        </Header> 

      <ContainerWeb>
        <GridMain>
          <GridContainer>



            <div className="w-full flex flex-col md:flex-row"> 
            {/* INPUT MES */}
                        <div className="space-y-2 flex-1 p-4">
                          <Label htmlFor="month" className="text-xl text-gray-600 md:text-lg lg:text-2xl">Mes</Label>
                          <Input
                            id="month"
                            type="text"
                            value={
                              month ? arrayMonths.find((e) => e.id === month)?.name : ""
                            }
                            onClick={() => setMonthOpen(!monthOpen)}
                            readOnly
                            className="bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                            placeholder="Selecciona un Mes"
                          />
                          {monthOpen && (
                            <div className="z-20 mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
                              <div
                                onClick={() => {
                                  setMonth(null);
                                  setMonthOpen(false);
                                }}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                              >
                                {"- Selecciona un Mes -"}
                              </div>
                              {arrayMonths.map((e, index) => (
                                <div
                                  key={index}
                                  onClick={() => {
                                    setMonth(e.id);
                                    setMonthOpen(false);
                                  }}
                                  className="p-2 hover:bg-gray-100 cursor-pointer"
                                >
                                  {e.name}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

            {/* INPUT PARROQUIA */}
                        <div className="space-y-2 flex-1 p-4">
                          <Label htmlFor="parroquia" className="text-xl text-gray-600 md:text-lg lg:text-2xl">Parroquia</Label>
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
                            <div className="z-20 mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
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

            </div>

            <div className="flex flex-col md:flex-row">
            {/* INPUT CARRERA */}
                        <div className="space-y-2 flex-1 p-4">
                          <Label htmlFor="carrera" className="text-xl text-gray-600 md:text-lg lg:text-2xl">Carrera o  Mención</Label>
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
                            <div className="z-20 mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
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

            {/* INPUT INSTITUCIONES EDU */}
                        <div className="space-y-2 flex-1 p-4">
                          <Label htmlFor="institucion" className="text-xl text-gray-600 md:text-lg lg:text-2xl">Institución Educativa</Label>
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
                            <div className="z-20 mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
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
            </div>

            <div className="flex flex-col md:flex-row">
            {/* INPUT GENERO */}
                        <div className="space-y-2 flex-1 p-4">
                          <Label htmlFor="gender" className="text-xl text-gray-600 md:text-lg lg:text-2xl">Género</Label>
                          <Input
                            id="gender"
                            type="text"
                            value={
                              gender === "M"
                                ? "Masculino"
                                : gender === "F"
                                ? "Femenino"
                                : ""
                            }
                            onClick={() => setGenderOpen(!genderOpen)}
                            readOnly
                            className="bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                            placeholder="Selecciona un Género"
                          />
                          {genderOpen && (
                            <div className="z-20 mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
                              <div
                                onClick={() => {
                                  setGender("");
                                  setGenderOpen(false);
                                }}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                              >
                                {"- Selecciona un Genero -"}
                              </div>
                              <div
                                onClick={() => {
                                  setGender("M");
                                  setGenderOpen(false);
                                }}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                              >
                                Masculino
                              </div>
                              <div
                                onClick={() => {
                                  setGender("F");
                                  setGenderOpen(false);
                                }}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                              >
                                Femenino
                              </div>
                            </div>
                          )}
                        </div>

            {/* INPUT DEPENDENCIA */}
                        <div className="space-y-2 flex-1 p-4">
                          <Label htmlFor="dependencia" className="text-xl text-gray-600 md:text-lg lg:text-2xl">Dependencia de Alcaldía</Label>
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
                            <div className="z-20 mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
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


            
            </div>


            <div className="w-full flex flex-col md:flex-row"> 

            {/* INPUT EDAD */}
                        <div className="mt-4 space-y-2 flex-1 p-4">
                          <Label className="text-xl text-gray-600 md:text-lg lg:text-2xl" >Edad</Label>
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

            {/* INPUT VOTANTES */}
                        <div className="mt-4 space-y-2 flex-1 p-4">
                          <Label htmlFor="vote" className="text-xl text-gray-600 md:text-lg lg:text-2xl">Votantes</Label>
                          <Input
                            id="vote"
                            type="text"
                            value={vote === true ? "Si" : vote === false ? "No" : ""}
                            onClick={() => setVoteOpen(!voteOpen)}
                            readOnly
                            className="bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                            placeholder="Selecciona una opción"
                          />
                          {voteOpen && (
                            <div className="z-20 mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
                              <div
                                onClick={() => {
                                  setVote(null);
                                  setVoteOpen(false);
                                }}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                              >
                                {"- Selecciona una opción -"}
                              </div>
                              <div
                                onClick={() => {
                                  setVote(true);
                                  setVoteOpen(false);
                                }}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                              >
                                Si
                              </div>
                              <div
                                onClick={() => {
                                  setVote(false);
                                  setVoteOpen(false);
                                }}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                              >
                                No
                              </div>
                            </div>
                          )}
                        </div>
            </div>

          {showClearButton && (
            <div className="flex justify-center mt-6">
              <Button onClick={clearAllInputs}   className="w-full mt-6 bg-gray-500 text-white p-6 md:w-[70%]">
                LIMPIAR FILTROS Y TABLA
              </Button>
            </div>
          )}
          <div className="flex justify-center mt-6">
            <Button
              onClick={handleGenerateReport}
              className="w-full mt-4 bg-black text-white p-6 md:w-[70%]"
            >
              GENERAR REPORTE
            </Button>
            </div>

            {report.length > 0 && (
            <div className="flex justify-center mt-6">
              <Button
                onClick={() => {
                  handleDownloadReport(report);
                }}
                className="w-full mt-4 bg-green-800 text-white p-6 md:w-[70%]"
              >
                DESCARGAR REPORTE FORMATO EXCEL
              </Button>
              </div>
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
                      <TableHead>Fecha de Actividad</TableHead>
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
                        <TableCell>
                          {new Date(e.date).toLocaleDateString()}
                        </TableCell>
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
