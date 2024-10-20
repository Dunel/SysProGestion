
"use client";
import ContainerWeb from "@/components/ContainerWeb";
import GridMain from "@/components/GridMain";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import ViewHome from "./inicio/ViewHome";

export default function Page() {
  const { data: session } = useSession();

  return (
    <>
      <Header title={"Bienvenido"} subtitle={""} />
      <ContainerWeb>
        <GridMain>
          <ViewHome/>
        </GridMain>
      </ContainerWeb>
    </>
  );
}
