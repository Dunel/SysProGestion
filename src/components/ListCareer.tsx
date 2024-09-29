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
  formCareer,
  formFullCareer,
  fullCareerSchema,
} from "@/validations/career.schema";

export default function ListCareer() {
  const [careers, setCareers] = useState<formFullCareer[]>([]);
  const [loading, setLoading] = useState(false);
  const [insert, setInsert] = useState(false);
  const [editingId, setEditingId] = useState<number | undefined>(undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    unregister,
    watch,
  } = useForm<formFullCareer>({
    resolver: zodResolver(fullCareerSchema),
    mode: "onChange",
  });

  const getCareers = async () => {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValue(name as keyof formCareer, value);
  };

  useEffect(() => {
    getCareers();
  }, []);

  const handleEdit = (career: formFullCareer) => {
    handleCancelInsert();
    setEditingId(career.id);
    setValue("name", career.name);
    setValue("short", career.short);
    setValue("id", career.id);
  };

  const handleCancelEdit = () => {
    unregister();
    setEditingId(undefined);
  };

  const handleSaveEdit = async (editValue: formFullCareer) => {
    try {
      setLoading(true);
      if (editingId) {
        const res = await axios.put("/api/alcaldia/career", editValue);
        setCareers(
          careers.map((reg) => (reg.id === editValue.id ? editValue : reg))
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

  const handleBorrar = async (id: number) => {
    try {
      setLoading(true);
      const res = await axios.delete(`/api/alcaldia/career`, { data: { id } });
      await getCareers();
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

  const handleSaveInsert = async (career: formCareer) => {
    try {
      setLoading(true);
      if (insert) {
        const res = await axios.post("/api/alcaldia/career", career);
        setCareers([...careers, res.data]);
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
  };

  const handleInsert = () => {
    handleCancelEdit();
    setValue("name", "Nueva carrera");
    setValue("short", "NC");
    setInsert(true);
  };

  const handleCancelInsert = () => {
    handleCancelEdit();
    setInsert(false);
    unregister();
  };
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Lista de Preregistros</h1>
      <Button onClick={handleInsert} className="mb-4">
        <Plus className="mr-2 h-4 w-4" /> Insertar Nuevo
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre de la carrera</TableHead>
            <TableHead>Abreviatura</TableHead>
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
              <TableCell>
                <>
                  <Input
                    {...register("short")}
                    name="short"
                    value={watch("short") || ""}
                    onChange={handleChange}
                    className={cn(
                      "w-full",
                      errors.short && "bg-red-100 focus:bg-red-100"
                    )}
                  />
                  {errors.short && (
                    <p className="text-red-500 text-xs">
                      {errors.short.message}
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
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCancelInsert}
                >
                  <X className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          )}
          {careers.map((career) => (
            <TableRow key={career.id}>
              <TableCell>
                {editingId === career.id ? (
                  <>
                    <Input
                      {...register("name")}
                      name="mail"
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
                ) : (
                  career.name
                )}
              </TableCell>
              <TableCell>
                {editingId === career.id ? (
                  <>
                    <Input
                      {...register("short")}
                      name="short"
                      value={watch("short") || ""}
                      onChange={handleChange}
                      className={cn(
                        "w-full",
                        errors.short && "bg-red-100 focus:bg-red-100"
                      )}
                    />
                    {errors.short && (
                      <p className="text-red-500 text-xs">
                        {errors.short.message}
                      </p>
                    )}
                  </>
                ) : (
                  career.short
                )}
              </TableCell>

              <TableCell>
                {editingId === career.id ? (
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
                      onClick={handleCancelEdit}
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
                      onClick={() => handleEdit(career)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        career.id ? handleBorrar(career.id) : null
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
    </>
  );
}
