"use client";
import ContainerWeb from "@/components/ContainerWeb";
import GridMain from "@/components/GridMain";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();

  return (
    <>
      <Header title={"Bienvenidos"} subtitle={""} />
      <ContainerWeb>
        <GridMain>
          <h2 className="text-center">ESTO DEBERIA SER INICIO</h2>
        </GridMain>
      </ContainerWeb>
    </>
  );
}
