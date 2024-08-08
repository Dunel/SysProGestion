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
      <Header title={"Tu Perfil"} subtitle={"Este es tu perfil, aquí podrás visualizar tu información personal y actualizarla si es necesario."}/>
      <ContainerWeb>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <GridMain>
            <GridContainer>             
              <EstudianteProfile profileData={profileData}/>
            </GridContainer>
          </GridMain>



            {/* //TODO:Debe estar en el header */}
          <GridSecond>
            <GridContainer>
              {session?.user?.email}
            </GridContainer>
          </GridSecond>
        </div>
      </ContainerWeb>
    </div>
  );
}
