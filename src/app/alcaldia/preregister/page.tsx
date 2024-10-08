"use client";
import Header from "@/components/Header";
import ContainerWeb from "@/components/ContainerWeb";
import GridMain from "@/components/GridMain";
import GridContainer from "@/components/GridContainer";
import ListPreRegister from "@/components/ListPreRegister";

export default function Page() {
  return (
    <>
      <Header
        title={"Gestion de Preregistros"}
        subtitle={"Registrar, editar, borrar"}
      />
      <ContainerWeb>
        <div className="grid grid-cols-1 gap-2 items-start">
          <GridMain>
            <GridContainer>
              <ListPreRegister/>
            </GridContainer>
          </GridMain>
        </div>
      </ContainerWeb>
    </>
  );
}
