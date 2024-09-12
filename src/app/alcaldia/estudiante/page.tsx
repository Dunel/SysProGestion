"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import ContainerWeb from "@/components/ContainerWeb";
import SearchStudents from "@/components/estudentGestion/searchStudents";
import axios from "axios";
import AlcaldiaFormEditStudent from "@/components/perfiles/AlcaldiaFormEditStudent";

type User = {
  id: number;
  name: string;
  email: string;
};

type Estudiante = {
  cedula: number;
  address: string;
  institution: {
    id: number;
  };
  career: {
    id: number;
  };
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
  mail: string;
  birthdate: Date;
};

export default function EstudentManagement() {
  const [user, setUser] = useState<Estudiante>();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<Estudiante | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSelectUser = () => {};

  const handleUpdateUser = () => {
    setSelectedUser(null);
  };

  const handleRegisterUser = () => {
    setIsRegistering(false);
  };

  const searchUser = async () => {
    try {
      if(searchTerm === user?.cedula.toString()){
        return
      }
      const res = await axios.get("/api/alcaldia/users?ci=" + searchTerm);
      setUser(res.data);
      //console.log(res.data);
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
        <div className="grid grid-cols-1 mx-8 lg:grid-cols-[40%_60%] gap-2 items-start">
          <div className="md:sticky md:top-[15vh]">
            <SearchStudents
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              searchUser={searchUser}
              setIsRegistering={setIsRegistering}
              setSelectedUser={setSelectedUser}
              user={user}
              handleSelectUser={handleSelectUser}
            />
          </div>

          {isRegistering ? (
            <div className="bg-white mx-4 rounded-lg border gap-2">
            <AlcaldiaFormEditStudent regForm={true} data={null} />
            </div>
          ) : (
            user && (
              <div className="bg-white mx-4 rounded-lg border gap-2">
                <AlcaldiaFormEditStudent regForm={false} data={user} />
              </div>
            )
          )}
        </div>
      </ContainerWeb>
    </>
  );
}
