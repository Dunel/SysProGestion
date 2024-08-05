"use client"
import ContainerWeb from "@/components/ContainerWeb";
import GridContainer from "@/components/GridContainer";
import GridMain from "@/components/GridMain";
import GridSecond from "@/components/GridSecond";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header title={"Error"} />
      <ContainerWeb>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GridMain>
            <GridContainer>
              <h1 className="text-2xl ">Error: Web no encontrada</h1>
            </GridContainer>
          </GridMain>
          <GridSecond>
            <GridContainer>
              x
            </GridContainer>
          </GridSecond>
        </div>
      </ContainerWeb>
    </>
  );
}
