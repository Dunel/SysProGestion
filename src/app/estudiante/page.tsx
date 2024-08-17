"use client";
import GridMain from "@/components/GridMain";
import { useSession } from "next-auth/react";

export default function EstudianteProfil() {
  const { data: session } = useSession();
  console.log(session); 
  

  return (
    <>
      
        <GridMain>
          <div className="h-screen">

            <h2 className="text-center">ESTO DEBERIA SER INICIO</h2>
          </div>
          </GridMain>



    </>
  );
}
