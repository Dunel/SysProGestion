"use client";
import ContainerWeb from "@/components/ContainerWeb";
import GridContainer from "@/components/GridContainer";
import GridMain from "@/components/GridMain";
import GridSecond from "@/components/GridSecond";
import Header from "@/components/Header";
import { useSession, signOut } from "next-auth/react";
import EstudianteProfile from "@/components/perfiles/EstudianteProfile";
//import AlcaldiaFormProfile from "@/components/perfiles/AlcaldiaFormProfile";

export default function EstudianteProfil() {
  const { data: session } = useSession();
  console.log(session);

  const profileData = {
    nombreEstudiante: 'Jose Perez',
    carreraEstudiante: 'Ingeniería de Software',
    cedulaEstudiante: '1234567890',
    telefonoEstudiante: '0424 7613872',
    correoEstudiante: 'jose_p@gmail.com',
    domicilioEstudiante: 'Calle # 123, Maracaibo, Zulia',
    universidadEstudiante: 'Universidad del Zulia',
    trimestreEstudiante: '11',
    habilidadesEstudiante: 'Programación, Matemáticas, Inglés',
    interesesEstudiante: 'Programación, Matemáticas, Física',
    descripcionEstudiante: 'Soy un estudiante universitario apacionado por la ciencia. Me gusta la programación y la tecnología. Mis pasatiempos son el deporte y jugar videojuegos.',

    fotoDelEstudiante: 'https://lgbtravel.com/wp-content/uploads/2023/11/paises-hombres-guapos-portada-1024x576.jpg', // URL de la foto
   

  };
  
  

  return (
    <div>
      <Header title={"Tu Perfil"} />
      <ContainerWeb>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <GridMain>
            <GridContainer>
                  <h2 className="text-2xl font-bold">Bienvenido <i>Jose Perez.</i></h2>
              <div>
                <p className="text-justify mb-4 p-2" >
                  Este es tu perfil, aquí podrás visualizar tu información personal y actualizarla si es necesario.
                </p>
              </div>
              <EstudianteProfile profileData={profileData}/>
            </GridContainer>
          </GridMain>



            {/* //TODO:Debe estar en el header */}
          <GridSecond>
            <GridContainer>
              {session?.user?.email}
              <button
                className="relative z-50 w-full bg-gray-950 text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => signOut()}
              >
                Sign out
              </button>
            </GridContainer>
          </GridSecond>
        </div>
      </ContainerWeb>
    </div>
  );
}
