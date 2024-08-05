"use client";
import ContainerWeb from "@/components/ContainerWeb";
import GridContainer from "@/components/GridContainer";
import GridMain from "@/components/GridMain";
import GridSecond from "@/components/GridSecond";
import Header from "@/components/Header";
import AnuncioVacantePasantias from "@/components/Estudiante";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";


import FormStepRegister  from "@/components/register/FormStepRegister";

import { ExclamationTriangleIcon as ExclamationIcon } from '@heroicons/react/24/outline'; // Para el ícono de alerta en contorno



export default function Register() {
  
  
  const { data: session } = useSession();

  
  return (
    <>

      <Header title={"Carlos Pérez - Universidad Privada Dr. Rafael Belloso Chacín"} />
   
      <ContainerWeb>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GridMain>
            <GridContainer>
                  <h2 className="text-2xl font-bold">Bienvenido <i>Carlos Pérez.</i></h2>
              <div>
                <p className="text-justify mb-4 p-2" >
                  {/* Aquí podrás conocer la información y actualizaciones de los procesos mas relevante que tu Alcaldía tramita y precisa saber. */}
                  Aquí podrás conocer la información y actualizaciones de tu proceso de pasantias.
                </p>
              </div>
              <AnuncioVacantePasantias />
            </GridContainer>
          </GridMain>
          
          
          <GridSecond>
            
            <GridContainer>

            <GridContainer>
              {session?.user?.email}
              <button
                className="w-full bg-gray-950 text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => signOut()}
              >
                Sign out
              </button>
            </GridContainer>

              <p className="text-justify mb-4 p-2">
              <ExclamationIcon className="h-5 w-5 mr-2 text-yellow-600" />
              Tu aplicación  COVP-2024-1001 ha sido rechazada! Amino, sigue intentando!🙂
              <br/>
              <Link className="text-blue-500 hover:underline" href={"/alcaldia/contratar-pasante"}>Ir a la pagina de tus aplicaciones</Link>
              </p>
            </GridContainer>
            <GridContainer>
              <p className="text-justify mb-4 p-2">
              <ExclamationIcon className="h-5 w-5 mr-2 text-yellow-600"/>
              Tienes una cita para vacante de Pasantías codigo  COVP-2024-2001 de el Instituto Autónomo de la Mujer! Suerte!🤓 
              <br/>
              <Link className="text-blue-500 hover:underline" href={"/alcaldia/contratar-pasante"}>tus entrevistas </Link>
              </p>
            </GridContainer>

          </GridSecond>
        </div>
      </ContainerWeb>
    </>
  );
}