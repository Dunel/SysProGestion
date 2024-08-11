"use client";
import ContainerWeb from "@/components/ContainerWeb";
import GridContainer from "@/components/GridContainer";
import GridMain from "@/components/GridMain";
import GridSecond from "@/components/GridSecond";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import EstudianteProfile from "@/components/perfiles/EstudianteProfile";

export default function EstudianteProfil() {
  const { data: session } = useSession();
  console.log(session); 
  

  return (
    <div>
      <Header title={"Tu Perfil"} subtitle={"Este es tu perfil, aquí podrás visualizar tu información personal y actualizarla si es necesario."}/>
      <ContainerWeb>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <GridMain>
            <GridContainer>             
              <EstudianteProfile/>
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
