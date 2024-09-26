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
import { fullSchema, PreRegister } from "@/validations/preregister.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "./lib/utils";
import { Oval } from "react-loader-spinner";

export default function ListPreRegister() {
  const [preregistros, setPreregistros] = useState<PreRegister[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedValues, setEditedValues] = useState<PreRegister | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PreRegister>({
    resolver: zodResolver(fullSchema),
    mode: "onChange",
  });

  const getPreRegister = async () => {
    try {
      const res = await axios.get("/api/alcaldia/preregister");
      setPreregistros(res.data);
      console.log("res.data:", res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    }
  };

  useEffect(() => {
    getPreRegister();
  }, []);

  const handleEdit = (registro: PreRegister) => {
    setEditingId(registro.id);
    setValue("id", registro.id);
    setEditedValues({ ...registro });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedValues(null);
  };

  const handleSaveEdit = async () => {
    try {
      setLoading(true);
      if (editedValues) {
        const res = await axios.put("/api/alcaldia/preregister",{
          id: editedValues.id,
          mail: editedValues.mail,
          cedula: editedValues.cedula,
        } );
        setPreregistros(
          preregistros.map((reg) =>
            reg.id === editedValues.id ? editedValues : reg
          )
        );
        setEditingId(null);
        setEditedValues(null);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedValues) {
      setEditedValues({ ...editedValues, [e.target.name]: e.target.value });
    }
  };

  const handleBorrar = (id: number) => {
    setPreregistros(preregistros.filter((registro) => registro.id !== id));
  };

  const handleInsertar = () => {
    const nuevoRegistro: PreRegister = {
      id: preregistros.length + 1,
      mail: "nuevo@example.com",
      cedula: 12345678,
    };
    setPreregistros([...preregistros, nuevoRegistro]);
    handleEdit(nuevoRegistro);
  };
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Lista de Preregistros</h1>
      <Button onClick={handleInsertar} className="mb-4">
        <Plus className="mr-2 h-4 w-4" /> Insertar Nuevo
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Correo</TableHead>
            <TableHead>Cédula</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {preregistros.map((registro) => (
            <TableRow key={registro.id}>
              <TableCell>
                {editingId === registro.id ? (
                  <>
                    <Input
                      {...register("mail")}
                      name="mail"
                      value={editedValues?.mail}
                      onChange={handleChange}
                      className={cn("w-full",
                        errors.mail && "bg-red-100 focus:bg-red-100"
                      )}
                    />
                    {errors.mail && (
                      <p className="text-red-500 text-xs">
                        {errors.mail.message}
                      </p>
                    )}
                  </>
                ) : (
                  registro.mail
                )}
              </TableCell>
              <TableCell>
                {editingId === registro.id ? (
                  <>
                    <Input
                      {...register("cedula")}
                      name="cedula"
                      value={editedValues?.cedula}
                      onChange={handleChange}
                      className={cn("w-full",
                        errors.mail && "bg-red-100 focus:bg-red-100"
                      )}
                    />
                    {errors.cedula && (
                      <p className="text-red-500 text-xs">
                        {errors.cedula.message}
                      </p>
                    )}
                  </>
                ) : (
                  registro.cedula
                )}
              </TableCell>

              <TableCell>
                {editingId === registro.id ? (
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
                      onClick={() => handleEdit(registro)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleBorrar(registro.id)}
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
