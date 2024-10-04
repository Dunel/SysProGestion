"use client";
import { useState } from "react";
import Header from "@/components/Header";
import axios from "axios";
import SearchStudents from "@/app/alcaldia/estudiantes/studentGestion/buscarEstudiante";
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
      //console.log(res.data);
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

  // const renderComponente = (tipo: string) => {
  //   switch (tipo) {
  //     case 'registrar':
  //       setComponente(<Registrar />);
  //       break;
  //     case 'buscar':
  //       setComponente(<SearchStudents
  //         searchTerm={searchTerm}
  //         setSearchTerm={setSearchTerm}
  //         searchUser={searchUser}
  //         setIsRegistering={setIsRegistering}
  //         setUser={setUser}
  //         user={user}
  //         handleDelete={handleEliminarUser}
  //       />);
  //       break;
  //     // case 'actualizar':
  //     //   setComponente(<Actualizar />);
  //     //   break;
  //     // case 'eliminar':
  //     //   setComponente(<Eliminar />);
  //     //   break;
  //     default:
  //       setComponente(null);
  //   }
  // }; 
  
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
            {
              arrayActiones.map( action => (
                <button
                  key={action}
                  className={`bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-md focus:outline-none ${
                    componente.toLowerCase() === action ? 'border-gray-900' : ''
                  }`}
                  onClick={() => setComponente(action)}
                >
                  {`${action.toUpperCase()} ESTUDIANTE`}
                </button>
              ))
            }
            
          </div>

    </div>

    { componente === 'buscar' &&
        <>
          <SearchStudents
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              searchUser={searchUser}
              setIsRegistering={setIsRegistering}
              setUser={setUser}
              user={user}
              handleDelete={handleEliminarUser}
              loading={loading}
          />
        </>
    }

              {componente === 'registrar' && 
                 (
                  <div className="bg-white mx-4 rounded-lg border gap-2">
                    <AlcaldiaFormEditStudent
                      regForm={true}
                      data={null}
                      handleReset={handleReset}
                    />
                  </div>
                  ) 
              }


              {componente === 'actualizar' && 
                      // <div className="bg-white mx-4 rounded-lg border gap-2">
                      //   <AlcaldiaFormEditStudent
                      //     regForm={false}
                      //     data={user}
                      //     handleReset={handleReset}
                      //   />
                      // </div>
                  <ActualizaEstudiante
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  searchUser={searchUser}
                  setIsRegistering={setIsRegistering}
                  setUser={setUser}
                  user={user}
                  handleDelete={handleEliminarUser}
                  loading={loading}
                  />
} 
     
    </>
  );
}
