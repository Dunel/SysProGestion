"use client";
import Header from "@/components/Header";
import ContainerWeb from "@/components/ContainerWeb";
import GridMain from "@/components/GridMain";
import GridContainer from "@/components/GridContainer";
import ListInstituciones from "@/components/ListInstituciones";


export default function Page() {
  return (
    <>
      <Header
        title={"Gestion de Instituciones Educativas"}
        subtitle={`Aquí podrás  ingresar una nueva Institución Educativa en el sistema, 
          así como visualizar, editar y eliminar la información de las ya existentes. Para ejecutar 
          estas acciones, presiona los iconos respectivos en cada registro. Es importante que registres 
          todas las Institución Educativa de las cuales recibes pasantes y prestadores de servicio comunitario, 
          dado que este dato es requerido al Rol Estudiante al momento de registrarse en el sistema.`}
      />
      <ContainerWeb>
        <div className="grid grid-cols-1 gap-2 items-start">
          <GridMain>
            <GridContainer>
              <ListInstituciones/>
            </GridContainer>
          </GridMain>
        </div>
      </ContainerWeb>
    </>
  );
}
