"use client";
import { useState } from "react";
import Header from "@/components/Header";
import axios from "axios";
import BuscarEstudiante from "@/app/alcaldia/estudiantes/studentGestion/buscarEstudiante";
import ActualizaEstudiante from "@/app/alcaldia/estudiantes/studentGestion/actualizaEstudiante";
import AlcaldiaFormEditStudent from "@/app/alcaldia/estudiantes/studentGestion/AlcaldiaFormEditStudent";
import { useRouter } from "next/navigation";

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
  parroquia:string;
  phone: string;
  mail: string;
  birthdate: Date;
  image: string;
};

export default function EstudentManagement() {
  const [user, setUser] = useState<Estudiante | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false); //!PARA EL FORM

  const [loading, setLoading] = useState(false);
  const handleEliminarUser = async () => {
    try {
      setLoading(true);
      const res = await axios.delete("/api/alcaldia/users", {
        data: {
          cedula: user?.cedula,
        },
      });
      alert("Usuario eliminado!");
      setUser(null);
      router.push("/alcaldia/estudiantes");
      //console.log(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
        alert("ERROR: " + error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    }finally{
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUser(null);
    setIsRegistering(false);
  }

  const searchUser = async () => {
    try {
      setLoading(true);
      if (searchTerm === user?.cedula.toString()) {
        return;
      }
      const res = await axios.get("/api/alcaldia/users?ci=" + searchTerm);
      setUser(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
        alert("ERROR: " + error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    }finally{
      setLoading(false);
    }
  };

  //const [componente, setComponente] = useState<JSX.Element | null>(null);
  const [componente, setComponente] = useState('');

  const arrayActiones = ['registrar', 'buscar', 'actualizar', 'eliminar']
  
  return (
    <>
      <Header
        title={"Gestion de Estudiantes"}
        subtitle={`Aquí podrás registrar un nuevo estudiante en el sistema, así como visualizar, editar y eliminar 
          la información de un estudiante ya registrado. Para ejecutar estas acciones, necesitarás su número de 
          cédula de identidad.`}
      />
      <div>
          <h2 className="text-3xl text-center font-extrabold my-8">ELIGE LA ACCION</h2>
          <div className="flex flex-col w-[80%] justify-center my-4 mx-auto gap-5 md:flex-row md:w-[100%]">
            {/* Botones de accion */}
            {
              arrayActiones.map( action => (
                <button
                  key={action}
                  className={`bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-md focus:outline-none ${
                    componente.toLowerCase() === action ? 'border-gray-900' : ''
                  }`}
                  onClick={() => {
                    handleReset()
                    setIsOpen(false)
                    setComponente(action)
                    
                  }}
                >
                  {`${action.toUpperCase()} ESTUDIANTE`}
                </button>
              ))
            }
          </div>

    </div>

      { componente === 'buscar' &&
          <>
            <BuscarEstudiante
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                searchUser={searchUser}
                setIsRegistering={setIsRegistering}
                setUser={setUser}
                user={user}
                handleDelete={handleEliminarUser}
                loading={loading}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                titleAction={'BUSCAR ESTUDIANTE'}
            />

              {/* FORMULARIO DE ACTUALIZAR */}
              { isOpen && (
                <div className="w-[100%] px-4 mt-2 bg-white mx-4 rounded-lg border gap-2 lg:w-[90%]">
                  <AlcaldiaFormEditStudent
                    regForm={false}
                    data={user}
                    handleReset={handleReset}
                  searchUser={searchUser}
                  />
                </div>
               )
              }


          </>
      }

              {componente === 'registrar' && 
                 (
                  <div className="w-[100%] px-4 mt-2 bg-white mx-4 rounded-lg border gap-2 lg:w-[90%]">
                    <AlcaldiaFormEditStudent
                      regForm={true}
                      data={null}
                      handleReset={handleReset}
                      searchUser={searchUser}
                    />
                  </div>
                  ) 
              }


              {componente === 'actualizar' && 
                  <>
                  <BuscarEstudiante
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      searchUser={searchUser}
                      setIsRegistering={setIsRegistering}
                      setUser={setUser}
                      user={user}
                      handleDelete={handleEliminarUser}
                      loading={loading}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      titleAction={'ACTUALIZAR DATOS DEL ESTUDIANTE'}


                      
                  />
                  
      
                    {/* FORMULARIO DE ACTUALIZAR */}
                    {  (user || isOpen) && (
                      <div className={`w-[100%] px-4 mx-auto mt-2 bg-white mx-4 rounded-lg border gap-2 ${!isOpen ? 'hidden' : ''} lg:w-[90%]`}>
                        <AlcaldiaFormEditStudent
                          regForm={false}
                          data={user}
                          handleReset={handleReset}
                          searchUser={searchUser}
                        />
                      </div>
                     )
                    }
      
      
                </>
                  
              } 
     
    </>
  );
}
