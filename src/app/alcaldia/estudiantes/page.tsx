"use client";
import { useState } from "react";
import Header from "@/components/Header";
import axios from "axios";
import BuscarEstudiante from "@/app/alcaldia/estudiantes/studentGestion/buscarEstudiante";
import AlcaldiaFormEditStudent from "@/app/alcaldia/estudiantes/studentGestion/AlcaldiaFormEditStudent";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";

type Estudiante = {
  cedula: number;
  address: string;
  institution: {
    id: number;
    name: string;
  };
  career: {
    id: number;
    name: string;
  };
  skills: string[];
  interests: string;
  curriculum: string;
  description: string;
  names: string;
  lastnames: string;
  dateStart: Date;
  dateEnd: Date;
  estadoId: number;
  municipioId: number;
  municipio: string;
  parroquiaId: number;
  parroquia: string;
  phone: string;
  mail: string;
  birthdate: Date;
  image: string;
};

export default function EstudentManagement() {
  const [user, setUser] = useState<Estudiante | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false); //!PARA EL FORM
  const [isDelete, setIsDelete] = useState(false); //!PARA ELIMINAR EL STUD
  const [loading, setLoading] = useState(false);
  const [isNotFoundError, setIsNotFoundError] = useState(false);

  const [spanRetirar, setSpanRetirar] = useState(false);
  const [cedula, setCedula] = useState(0);
  const [applicationToDelete, setApplicationToDelete] = useState<{
    cedula: number;

  } | null>(null);

  const confirmDelete = (cedula:number) => {
    setApplicationToDelete({cedula});
    setCedula(cedula);
    setModalOpen(true);
  };
  
  const handleEliminarUser = async () => {
    try {
      setLoading(true);
      const res = await axios.delete("/api/alcaldia/users", {
        data: {
          cedula: user?.cedula,
        },
      });
  
      setUser(null);
      router.push("/alcaldia/estudiantes");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
        alert("ERROR: " + error.response?.data.error);
        setIsNotFoundError(true)
      } else {
        console.error("error:", error);
      }
    } finally {
      setLoading(false);
      setModalOpen(false);
      setApplicationToDelete(null);
    }
  };

  const handleReset = () => {
    setUser(null);
    setIsRegistering(false);
  };

  const searchUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/alcaldia/users?ci=" + searchTerm);
      setUser(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
        setIsNotFoundError(true)
      } else {
        console.error("error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const [componente, setComponente] = useState("");

  const arrayActiones = ["registrar", "buscar o actualizar", "eliminar"];

  
  return (
    <>
      <Header
        title={"Gestion de Estudiantes"}
        subtitle={`Aquí podrás registrar un nuevo estudiante en el sistema, así como visualizar, editar y eliminar 
          la información de un estudiante ya registrado. Para ejecutar estas acciones, necesitarás su número de 
          cédula de identidad.`}
        />
      <div>
        <h2 className="text-3xl text-center font-extrabold my-8">
          ELIGE LA ACCION
        </h2>
          {/* Botones de accion */}
        <div className="flex flex-col w-[80%] justify-center my-4 mx-auto gap-5 md:flex-row md:w-[100%]">
          {arrayActiones.map((action) => (
            <button
              key={action}
              className={`bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-md focus:outline-none ${
                componente.toLowerCase() === action ? "border-gray-900" : ""
              }`}
              onClick={() => {
                componente === "eliminar" && setIsDelete(true)
                handleReset();
                setIsOpen(false);
                setComponente(action);
                setIsNotFoundError(false);
              }}
            >
              {`${action.toUpperCase()} ESTUDIANTE`}
            </button>
          ))}
        </div>
      </div>


      {/* FORMULARIO DE REGISTRO */}
      {componente === "registrar" && (
        <div className="w-[100%] px-4 mt-2 bg-white mx-auto rounded-lg border gap-2 lg:w-[95%]">
          <AlcaldiaFormEditStudent
            regForm={true}
            data={null}
            handleReset={handleReset}
            searchUser={searchUser}
          />
        </div>
      )}

      {/* BUSCAR Y ACTUALIZAR ESTUDIANTE */}
      {componente === "buscar o actualizar" && (
        <>
          <BuscarEstudiante
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            searchUser={searchUser}
            setIsRegistering={setIsRegistering}
            setUser={setUser}
            user={user}
            confirmDelete={confirmDelete}
            loading={loading}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            titleAction={"BUSCAR O ACTUALIZAR DATOS DEL ESTUDIANTE"}
            isDelete={false}
            setIsNotFoundError={setIsNotFoundError}
          />

          {/*FORMULARIO DE ACTUALIZAR */}
          {isOpen && (
            <div className="w-[100%] px-4 mt-2 bg-white mx-auto rounded-lg border gap-2 lg:w-[95%]">
              <AlcaldiaFormEditStudent
                regForm={false}
                data={user}
                handleReset={handleReset}
                searchUser={searchUser}
              />
            </div>
          )}

        </>
      )}

     
      {/* ELIMINAR ESTUDIANTE  */}
      {componente === "eliminar" && (
        <>
        <BuscarEstudiante
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            searchUser={searchUser}
            setIsRegistering={setIsRegistering}
            setUser={setUser}
            user={user}
            confirmDelete={confirmDelete}
            loading={loading}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            titleAction={"ELIMINAR ESTUDIANTE DEL SISTEMA"}
            isDelete={isDelete}
            setIsNotFoundError={setIsNotFoundError}
          />

        </> 
      )}

      <Modal
            info={`¿Estás seguro de que deseas ELIMINAR el estudiante con cedula de identidad: ${applicationToDelete?.cedula}`}
            isLoading={spanRetirar}
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            onConfirm={handleEliminarUser}
          />

          {
            isNotFoundError &&
            <div>
              <div className="flex justify-center items-center">
                <div className="text-center">
                  <h2 className="text-3xl font-bold">No se encontró el estudiante.</h2>
                  <button
                    className="w-[80%] bg-black hover:bg-gray-800 text-white font-bold py-3 px-3 mt-4 rounded focus:shadow-outline md:w-[80%]"
                    onClick={() => 
                      setIsNotFoundError(false)
                    }
                  >
                    Volver a intentar
                  </button>
                </div>
              </div>
            </div>
          }
    </>
  );
}
