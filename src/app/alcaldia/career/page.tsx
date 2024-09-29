"use client";
import Header from "@/components/Header";
import ContainerWeb from "@/components/ContainerWeb";
import GridMain from "@/components/GridMain";
import GridContainer from "@/components/GridContainer";
import ListCareer from "@/components/ListCareer";

export default function Page() {
  return (
    <>
      <Header
        title={"Gestion de Carreras"}
        subtitle={"Registrar, editar, borrar"}
      />
      <ContainerWeb>
        <div className="grid grid-cols-1 gap-2 items-start">
          <GridMain>
            <GridContainer>
              <ListCareer/>
            </GridContainer>
          </GridMain>
        </div>
      </ContainerWeb>
    </>
  );
}
