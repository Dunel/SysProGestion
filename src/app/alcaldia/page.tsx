"use client";
import ContainerWeb from "@/components/ContainerWeb";
import GridContainer from "@/components/GridContainer";
import GridMain from "@/components/GridMain";
import GridSecond from "@/components/GridSecond";
import Header from "@/components/Header";
import AnuncioVacantePasantias from "@/components/pasantias/AnuncioVacantePasantias";
import Link from "next/link";

import { ExclamationTriangleIcon as ExclamationIcon } from '@heroicons/react/24/outline'; // Para el ícono de alerta en contorno



export default function Register() {
  
  
  
  
  return (
    <>
      <Header title={"ALCALDIA DE MARACAIBO"} />
    
      <ContainerWeb>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GridMain>
            <GridContainer>
                  <h2 className="text-2xl font-bold">Bienvenido <i>Jose Pérez.</i></h2>
              <div>
                <p className="text-justify mb-4 p-2" >
                  Aquí podrás conocer la información y actualizaciones de los procesos mas relevante que tu Alcaldía tramita y precisa saber.
                </p>
              </div>
              <AnuncioVacantePasantias />
            </GridContainer>
          </GridMain>
          
          
          <GridSecond>
            
            <GridContainer>

              <p className="text-justify mb-4 p-2">
              <ExclamationIcon className="h-5 w-5 mr-2 text-yellow-600" />
              Un pasante ha sido contradado! 
              <br/>
              <Link className="text-blue-500 hover:underline" href={"/alcaldia/contratar-pasante"}>Ir a la pagina de contratación de pasantes</Link>
              </p>
            </GridContainer>
            <GridContainer>
              <p className="text-justify mb-4 p-2">
              <ExclamationIcon className="h-5 w-5 mr-2 text-yellow-600"/>
              Listado mensual de servicios comunitarios culminados! 
              <br/>
              <Link className="text-blue-500 hover:underline" href={"/alcaldia/contratar-pasante"}>Ir al cuadro de servicios comunitarios</Link>
              </p>
            </GridContainer>



          </GridSecond>
        </div>
      </ContainerWeb>
    </>
  );
}