"use client";
import ContainerWeb from "@/components/ContainerWeb";
import GridContainer from "@/components/GridContainer";
import GridMain from "@/components/GridMain";
import GridSecond from "@/components/GridSecond";
import Header from "@/components/Header";
import AlcaldiaProfile from "@/components/perfiles/AlcaldiaProfile";
import AlcaldiaFormProfile from "@/components/perfiles/AlcaldiaFormProfile";


export default function Page() {
  
  const profileData = {
    nombreAlcaldia: 'Alcaldía de Maracaibo',
    
    nombreRepresentante: 'Jose Pérez',
    fotoDelRepresentante: 'https://lgbtravel.com/wp-content/uploads/2023/11/paises-hombres-guapos-portada-1024x576.jpg', // URL de la foto
    nombreCargo: 'Director de Asuntos Universitarios',
    emailPersonal: 'jose_p@gmail.com',
    telefonoPersonal: '0424 7613872',
    
    telefonoAlcaldia: '0261 7613872',
    emailAlcaldia: 'direccionuniversitaria@alcaldiamcbo.com',
    direccionAlcaldia: 'Calle # 123, Maracaibo, Zulia',
  };
  
  
  return (
    <>
      <Header title={"ALCALDIA DE MARACAIBO"} subtitle={"Mira tis datos de perfil"} />
    
      <ContainerWeb>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GridMain>
            <GridContainer>
                  <h2 className="text-2xl font-bold">Bienvenido <i>Jose Perez.</i></h2>
              <div>
                <p className="text-justify mb-4 p-2" >
                  Este es tu perfil, aquí podrás visualizar tu información personal y actualizarla si es necesario.
                </p>
              </div>
              <AlcaldiaProfile profileData={profileData}/>
            </GridContainer>
          </GridMain>
          
          
          <GridSecond>
            
            <GridContainer>
                <AlcaldiaFormProfile/>
            </GridContainer>
            


          </GridSecond>
        </div>
      </ContainerWeb>
    </>
  );
}