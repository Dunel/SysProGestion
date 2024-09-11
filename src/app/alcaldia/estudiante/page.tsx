"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import ContainerWeb from "@/components/ContainerWeb";
import SearchStudents from "@/components/estudentGestion/searchStudents";
import axios from "axios";

type User = {
  id: number;
  name: string;
  email: string;
};

interface Estudiante {
  address: string;
  institution: {};
  career: {};
  skills: string[];
  interests: string;
  description: string;
  names: string;
  lastnames: string;
  dateStart: Date;
  dateEnd: Date;
  estadoId: number;
  municipioId: number;
  parroquiaId: number;
  phone: string;
  email: string;
}

const initialUsers: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com" },
  { id: 2, name: "Bob Smith", email: "bob@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
];

export default function EstudentManagement() {
  const [user, setUser] = useState<Estudiante>();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");

  const handleSelectUser = () => {};

  const handleUpdateUser = () => {
    setSelectedUser(null);
  };

  const handleRegisterUser = () => {
    setIsRegistering(false);
  };

  const searchUser = async () => {
    try {
      const res = await axios.get("/api/alcaldia/users?search=" + searchTerm);
      setUser(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    }
  };

  return (
    <>
      <Header
        title={"Gestion de Estudiantes"}
        subtitle={"Registrar, editar, borrar"}
      />
      <ContainerWeb>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SearchStudents
            searchTerm={searchTerm}
            setIsRegistering={setIsRegistering}
            setSearchTerm={setSearchTerm}
            setSelectedUser={setSelectedUser}
            user={user}
            handleSelectUser={handleSelectUser}
          />

          {isRegistering ? (
            <Card>
              <CardHeader>
                <CardTitle>Registrar Nuevo Usuario</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="newName">Nombre</Label>
                    <Input
                      id="newName"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="newEmail">Email</Label>
                    <Input
                      id="newEmail"
                      type="email"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                    />
                  </div>
                  <button
                    className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleRegisterUser}
                  >
                    Registrar Estudiante
                  </button>
                </form>
              </CardContent>
            </Card>
          ) : (
            selectedUser && (
              <Card>
                <CardHeader>
                  <CardTitle>Editar Estudiante</CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="space-y-4"
                  >
                    <div>
                      <Label htmlFor="name">Nombre</Label>
                      <Input
                        id="name"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                      />
                    </div>
                    <button
                      className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleUpdateUser}
                    >
                      Actualizar Estudiante
                    </button>
                  </form>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </ContainerWeb>
    </>
  );
}
