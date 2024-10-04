import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Oval } from "react-loader-spinner";

type CardSearch = {
  loading: boolean;
  searchTerm: string;
  setSearchTerm: Function;
  searchUser: Function;
  setIsRegistering: Function;
  setUser: Function;
  user: Estudiante | null;
  handleDelete: () => void;
};

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


export default function SearchStudents({
  loading,
  searchTerm,
  setSearchTerm,
  searchUser,
  setIsRegistering,
  setUser,
  user,
  handleDelete,
}: CardSearch) {



  const skillFormated: { [key: string]: string } = {
    resoluciondeproblemas: "Resolucion de problemas",
    trabajoenequipo: "Trabajo en equipo",
    adaptabilidad: "Adaptabilidad",
    comunicacionefectiva: "Comunicación efectiva",
    liderazgo: "Liderazgo",
    pensamientocritico: "Pensamiento crítico",
    orientacionaresultados: "Orientación a resultados",
    creatividad: "Creatividad",
    gestiondeltiempo: "Gestión del tiempo",
    aprendizajecontinuo: "Aprendizaje continuo",
    dondegente: "Don de gente",
    ensenanza: "Enseñanza",
    sociable: "Sociable",
    salud: "Salud",
    deportes: "Deportes",
    logistica: "Logística",
    expresionesartisticas: "Expresiones artísticas",
    diseno: "Diseño",
    musica: "Música",
    ingles: "Inglés",
    otrosidiomasnaturales: "Otros idiomas naturales",
    lenguajesdeprogramacion: "Lenguajes de programación",
  };

 
  return (
    <Card>
      <CardHeader>
        <h2 className="text-3xl text-center font-extrabold my-2">ACTUALIZAR DATOS DEL ESTUDIANTE</h2>
      </CardHeader>
      
      <CardContent>
        
        {/* EL INPUT SEARCH + BUTTON + LOADER */}
        <div>
          <div className="w-[100%] flex flex-row gap-2 justify-center py-4">
            <Input
              placeholder="Buscar estudiante por su número de cédula de identidad"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[30vw]"
              type="search"
            />
            <button
              onClick={() => {
                setIsRegistering(false)
                searchUser(searchTerm)
              }}
              className="w-[20%] inline-flex items-center justify-center rounded-md px-6 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              BUSCAR DATOS
            </button>
          </div>
         
          {loading && 
              ( // Muestra el loader si está cargando
              <div className="flex justify-center items-center flex-col mt-4">
                  <Oval
                    color="#000000"
                    secondaryColor="#000000" // Color de fondo NEGRO pq el fondo es blanco
                    height={50}
                    width={50}
                    strokeWidth={5}
                  />
                  <br />
                  <span>Espere por favor...</span>
              </div>
              )
          }
        </div>

          {
            user && (
              <>form</>
            )
          }

      </CardContent>

    </Card>
  );
}
