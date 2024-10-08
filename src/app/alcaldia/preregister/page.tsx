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
        title={"Gestion de Preregistros de Dependencias de Alcaldía"}
        subtitle={"Aquí podrás  registrar una nueva Dependencia de esta Alcaldía en el sistema, así como visualizar, editar y eliminar la información de las ya existentes. Para ejecutar estas acciones, presiona los iconos respectivos en cada registro. Es importante que agregues todas las Dependencias a las cuales asignas pasantes y prestadores de servicio comunitario,  de lo contrario no podrán registrarse con el Rol de Dependencia de Alcaldía, por medidas de seguridad."}
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
