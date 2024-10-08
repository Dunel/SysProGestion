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
        title={"Gestion de Carreras o Menciones"}
        subtitle={"Aquí podrás  registrar una nueva Carrera o Mención en el sistema, así como visualizar, editar y eliminar la información de las ya existentes. Para ejecutar estas acciones, presiona los iconos respectivos en cada registro. Es importante que registres todas las Carreras o Menciones que son impartidas en las Instituciones Educativas de las cuales recibes pasantes y prestadores de servicio comunitario,  dado que este dato es requerido al Rol Estudiante al momento de registrarse en el sistema y al Rol Dependencia al momento de crear una oferta."}
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
