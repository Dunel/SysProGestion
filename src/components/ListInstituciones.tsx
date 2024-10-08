import { Check, Pencil, Plus, Trash2, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useEffect, useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "./lib/utils";
import { Oval } from "react-loader-spinner";
import {
  fullInstituSchema,
  instituFormSchema,
} from "@/validations/institution.schema";

interface Estados {
  id: number;
  estado: string;
}

interface Municipios {
  id: number;
  estadoId: number;
  municipio: string;
}

interface Parroquias {
  id: number;
  municipioId: number;
  parroquia: string;
}

type institu = {
  name: string;
  estadoId: number;
  municipioId: number;
  parroquiaId: number;
  id?: number | undefined;
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

export default function ListInstituciones() {
  const [institution, setInstitution] = useState<institu[]>([]);
  const [loading, setLoading] = useState(false);
  const [insert, setInsert] = useState(false);
  const [editingId, setEditingId] = useState<number | undefined>(undefined);
  const [estados, setEstados] = useState<Estados[]>([]);
  const [estadoOpen, setEstadoOpen] = useState(false);
  const [municipios, setMunicipios] = useState<Municipios[]>([]);
  const [municipiosOpen, setMunicipiosOpen] = useState(false);
  const [parroquias, setParroquias] = useState<Parroquias[]>([]);
  const [parroquiasOpen, setparroquiasOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    unregister,
    watch,
    getValues,
  } = useForm<instituFormSchema>({
    resolver: zodResolver(fullInstituSchema),
    mode: "onChange",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValue(name as keyof instituFormSchema, value);
  };

  const getEstados = async () => {
    try {
      const res = await axios.get("/api/venezuela/estados");
      setEstados(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    }
  };

  const getMunicipios = async () => {
    try {
      if (watch("estadoId") === 0 || !watch("estadoId")) {
        setMunicipios([]);
        return;
      }
      const res = await axios.get(
        "/api/venezuela/municipios?estadoId=" + watch("estadoId")
      );
      setMunicipios(res.data);
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
      if (watch("municipioId") === 0 || !watch("municipioId")) {
        setParroquias([]);
        return;
      }
      const res = await axios.get(
        "/api/venezuela/parroquias?municipioId=" + watch("municipioId")
      );
      setParroquias(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    }
  };

  const getInstitu = async () => {
    try {
      const res = await axios.get("/api/alcaldia/institutions");
      setInstitution(res.data);
      //console.log("res.data:", res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    }
  };

  useEffect(() => {
    getInstitu();
    getEstados();
  }, []);

  const handleEdit = (instt: institu) => {
    handleCancelInsert();
    setEditingId(instt.id);
    setValue("name", instt.name);
    setValue("id", instt.id);
    setValue("estadoId", instt.estadoId);
    getMunicipios();
    setValue("municipioId", instt.municipioId);
    getParroquias();
    setValue("parroquiaId", instt.parroquiaId);
  };

  const handleCancelEdit = () => {
    unregister();
    setMunicipios([]);
    setParroquias([]);
    setEditingId(undefined);
  };

  const handleSaveEdit = async () => {
    try {
      setLoading(true);
      if (editingId) {
        const res = await axios.put("/api/alcaldia/institutions", getValues());
        setInstitution(
          institution.map((reg) =>
            reg.id === res.data.id ? res.data : reg
          )
        );
        handleCancelEdit();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
        alert("ERROR: " + error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBorrar = async(id: number) => {
    try {
      setLoading(true);
      const res = await axios.delete(`/api/alcaldia/institutions`,
        { data: { id } }
      );
      await getInstitu();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
        alert("ERROR: " + error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveInsert = async () => {
    try {
      setLoading(true);
      if (insert) {
        const res = await axios.post("/api/alcaldia/institutions", getValues());
        setInstitution([...institution, res.data]);
        handleCancelInsert();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
        alert("ERROR: " + error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    } finally {
      setLoading(false);
    }
  }

  const handleInsert = () => {
    handleCancelEdit();
    setValue("name", "Nombre de la institución");
    setValue("estadoId", 0);
    setValue("municipioId", 0);
    setValue("parroquiaId", 0);
    setInsert(true);
  };

  const handleCancelInsert = () => {
    unregister();
    setMunicipios([]);
    setParroquias([]);
    setInsert(false);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">
        Lista de Instituciones Educativas
      </h1>
      <Button onClick={() => handleInsert()} className="mb-4">
        <Plus className="mr-2 h-4 w-4" /> Insertar Nuevo
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Municipio</TableHead>
            <TableHead>Parroquia</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {insert && (
            <TableRow>

              <TableCell>
                <>
                  <Input
                    {...register("name")}
                    name="name"
                    value={watch("name") || ""}
                    onChange={handleChange}
                    className={cn(
                      "w-full",
                      errors.name && "bg-red-100 focus:bg-red-100"
                    )}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs">
                      {errors.name.message}
                    </p>
                  )}
                </>
              </TableCell>
              
              <TableCell className="relative">
                  <>
                    <Input
                      id="estado"
                      type="text"
                      value={
                        estados.find((e) => e.id === watch("estadoId"))
                          ?.estado || ""
                      }
                      onClick={() => setEstadoOpen(!estadoOpen)}
                      readOnly
                      className="bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                      placeholder="Selecciona un estado"
                    />
                    {estadoOpen && (
                      <div className="fixed z-20 mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
                        {estados.map((e, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              if (e.id !== watch("estadoId")) {
                                setValue("estadoId", e.id);
                                setValue("municipioId", 0);
                                setValue("parroquiaId", 0);
                                getMunicipios();
                              }
                              setEstadoOpen(false);
                            }}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                          >
                            {e.estado}
                          </div>
                        ))}
                      </div>
                    )}
                    {errors.estadoId && (
                      <p className="text-red-500 text-xs">
                        {errors.estadoId.message}
                      </p>
                    )}
                  </>
              </TableCell>

              <TableCell>
                  <>
                    <Input
                      id="municipioId"
                      type="text"
                      value={
                        municipios.find((e) => e.id === watch("municipioId"))
                          ?.municipio || ""
                      }
                      onClick={() => setMunicipiosOpen(!municipiosOpen)}
                      readOnly
                      className="bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                      placeholder="Selecciona una institución"
                    />
                    {municipiosOpen && (
                      <div className="fixed z-20 mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
                        {municipios.map((e, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              if (e.id !== watch("municipioId")) {
                                setValue("municipioId", e.id);
                                setValue("parroquiaId", 0);
                                getParroquias();
                              }
                              setMunicipiosOpen(false);
                            }}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                          >
                            {e.municipio}
                          </div>
                        ))}
                      </div>
                    )}
                    {errors.municipioId && (
                      <p className="text-red-500 text-xs">
                        {errors.municipioId.message}
                      </p>
                    )}
                  </>
              </TableCell>

              <TableCell>
                  <>
                    <Input
                      id="parroquiaId"
                      type="text"
                      value={
                        parroquias.find((e) => e.id === watch("parroquiaId"))
                          ?.parroquia || ""
                      }
                      onClick={() => setparroquiasOpen(!parroquiasOpen)}
                      readOnly
                      className="bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                      placeholder="Selecciona una institución"
                    />
                    {parroquiasOpen && (
                      <div className="fixed z-20 mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
                        {parroquias.map((e, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              setValue("parroquiaId", e.id);
                              setparroquiasOpen(false);
                            }}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                          >
                            {e.parroquia}
                          </div>
                        ))}
                      </div>
                    )}
                    {errors.parroquiaId && (
                      <p className="text-red-500 text-xs">
                        {errors.parroquiaId.message}
                      </p>
                    )}
                  </>
              </TableCell>

              <TableCell>
                <Button
                  variant="outline"
                  size="icon"
                  className="mr-2"
                  onClick={handleSubmit(handleSaveInsert)}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleCancelInsert()}>
                  <X className="h-4 w-4" />
                </Button>
              </TableCell>

            </TableRow>
          )}
          {institution.map((insttt) => (
            <TableRow key={insttt.id}>
              <TableCell>
                {editingId === insttt.id ? (
                  <>
                    <Input
                      {...register("name")}
                      name="name"
                      value={watch("name") || ""}
                      onChange={handleChange}
                      className={cn(
                        "w-full",
                        errors.name && "bg-red-100 focus:bg-red-100"
                      )}
                      type="text"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs">
                        {errors.name.message}
                      </p>
                    )}
                  </>
                ) : (
                  insttt.name
                )}
              </TableCell>
              <TableCell>
                {editingId === insttt.id ? (
                  <>
                    <Input
                      id="estado"
                      type="text"
                      value={
                        estados.find((e) => e.id === watch("estadoId"))
                          ?.estado || ""
                      }
                      onClick={() => setEstadoOpen(!estadoOpen)}
                      readOnly
                      className="bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                      placeholder="Selecciona un estado"
                    />
                    {estadoOpen && (
                      <div className="fixed z-20 mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
                        {estados.map((e, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              if (e.id !== watch("estadoId")) {
                                setValue("estadoId", e.id);
                                setValue("municipioId", 0);
                                setValue("parroquiaId", 0);
                                getMunicipios();
                              }
                              setEstadoOpen(false);
                            }}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                          >
                            {e.estado}
                          </div>
                        ))}
                      </div>
                    )}
                    {errors.estadoId && (
                      <p className="text-red-500 text-xs">
                        {errors.estadoId.message}
                      </p>
                    )}
                  </>
                ) : (
                  insttt.estado.estado
                )}
              </TableCell>

              <TableCell>
                {editingId === insttt.id ? (
                  <>
                    <Input
                      id="municipioId"
                      type="text"
                      value={
                        municipios.find((e) => e.id === watch("municipioId"))
                          ?.municipio || ""
                      }
                      onClick={() => setMunicipiosOpen(!municipiosOpen)}
                      readOnly
                      className="bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                      placeholder="Selecciona una institución"
                    />
                    {municipiosOpen && (
                      <div className="fixed z-20 mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
                        {municipios.map((e, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              if (e.id !== watch("municipioId")) {
                                setValue("municipioId", e.id);
                                setValue("parroquiaId", 0);
                                getParroquias();
                              }
                              setMunicipiosOpen(false);
                            }}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                          >
                            {e.municipio}
                          </div>
                        ))}
                      </div>
                    )}
                    {errors.municipioId && (
                      <p className="text-red-500 text-xs">
                        {errors.municipioId.message}
                      </p>
                    )}
                  </>
                ) : (
                  insttt.municipio.municipio
                )}
              </TableCell>

              <TableCell>
                {editingId === insttt.id ? (
                  <>
                    <Input
                      id="parroquiaId"
                      type="text"
                      value={
                        parroquias.find((e) => e.id === watch("parroquiaId"))
                          ?.parroquia || ""
                      }
                      onClick={() => setparroquiasOpen(!parroquiasOpen)}
                      readOnly
                      className="bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                      placeholder="Selecciona una institución"
                    />
                    {parroquiasOpen && (
                      <div className="fixed z-20 mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
                        {parroquias.map((e, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              setValue("parroquiaId", e.id);
                              setparroquiasOpen(false);
                            }}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                          >
                            {e.parroquia}
                          </div>
                        ))}
                      </div>
                    )}
                    {errors.parroquiaId && (
                      <p className="text-red-500 text-xs">
                        {errors.parroquiaId.message}
                      </p>
                    )}
                  </>
                ) : (
                  insttt.parroquia.parroquia
                )}
              </TableCell>

              <TableCell>
                {editingId === insttt.id ? (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      className="mr-2"
                      onClick={handleSubmit(handleSaveEdit)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCancelEdit()}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      className="mr-2"
                      onClick={() => handleEdit(insttt)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => insttt.id && handleBorrar(insttt.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
          {loading && ( // Muestra el loader si está cargando
            <div className="flex justify-center items-center flex-col mt-10">
              <Oval
                color="#000000"
                secondaryColor="#FFFFFF" // Color de fondo blanco
                height={50}
                width={50}
                strokeWidth={5}
              />
              <br />
              <span>Espere por favor...</span>
            </div>
          )}
        </TableBody>
      </Table>
    </>
  );
}
