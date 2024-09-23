"use client";
import { useState } from "react";
import Header from "@/components/Header";
import ContainerWeb from "@/components/ContainerWeb";
import { useRouter } from "next/navigation";
import GridMain from "@/components/GridMain";
import GridSecond from "@/components/GridSecond";
import GridContainer from "@/components/GridContainer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Plus, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Preregistro {
  id: number;
  correo: string;
  cedula: string;
  role: string;
}

export default function EstudentManagement() {
  const router = useRouter();
  const [preregistros, setPreregistros] = useState<Preregistro[]>([
    {
      id: 1,
      correo: "usuario1@example.com",
      cedula: "1234567890",
      role: "Usuario",
    },
    {
      id: 2,
      correo: "admin@example.com",
      cedula: "0987654321",
      role: "Administrador",
    },
    {
      id: 3,
      correo: "invitado@example.com",
      cedula: "1122334455",
      role: "Invitado",
    },
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedValues, setEditedValues] = useState<Preregistro | null>(null);

  const handleEdit = (registro: Preregistro) => {
    setEditingId(registro.id);
    setEditedValues({ ...registro });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedValues(null);
  };

  const handleSaveEdit = () => {
    if (editedValues) {
      setPreregistros(
        preregistros.map((reg) =>
          reg.id === editedValues.id ? editedValues : reg
        )
      );
      setEditingId(null);
      setEditedValues(null);
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
    const nuevoRegistro: Preregistro = {
      id: preregistros.length + 1,
      correo: "nuevo@example.com",
      cedula: "9876543210",
      role: "Nuevo",
    };
    setPreregistros([...preregistros, nuevoRegistro]);
    handleEdit(nuevoRegistro);
  };

  return (
    <>
      <Header
        title={"Gestion de Estudiantes"}
        subtitle={"Registrar, editar, borrar"}
      />
      <ContainerWeb>
        <div className="grid grid-cols-1 mx-8 lg:grid-cols-[40%_60%] gap-2 items-start">
          <div className="md:sticky md:top-[15vh]">
            <GridMain>
              <GridContainer>s</GridContainer>
            </GridMain>
          </div>
          <GridSecond>
            <GridContainer>
              <h1 className="text-2xl font-bold mb-4">Lista de Preregistros</h1>
              <Button onClick={handleInsertar} className="mb-4">
                <Plus className="mr-2 h-4 w-4" /> Insertar Nuevo
              </Button>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Correo</TableHead>
                    <TableHead>Cédula</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {preregistros.map((registro) => (
                    <TableRow key={registro.id}>
                      <TableCell>
                        {editingId === registro.id ? (
                          <Input
                            name="correo"
                            value={editedValues?.correo}
                            onChange={handleChange}
                            className="w-full"
                          />
                        ) : (
                          registro.correo
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === registro.id ? (
                          <Input
                            name="cedula"
                            value={editedValues?.cedula}
                            onChange={handleChange}
                            className="w-full"
                          />
                        ) : (
                          registro.cedula
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === registro.id ? (
                          <Input
                            name="role"
                            value={editedValues?.role}
                            onChange={handleChange}
                            className="w-full"
                          />
                        ) : (
                          registro.role
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === registro.id ? (
                          <>
                            <Button
                              variant="outline"
                              size="icon"
                              className="mr-2"
                              onClick={handleSaveEdit}
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
                </TableBody>
              </Table>
            </GridContainer>
          </GridSecond>
        </div>
      </ContainerWeb>
    </>
  );
}
