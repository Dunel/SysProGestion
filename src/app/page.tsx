"use client"
import ContainerWeb from "@/components/ContainerWeb";
import GridContainer from "@/components/GridContainer";
import GridMain from "@/components/GridMain";
import GridSecond from "@/components/GridSecond";
import Header from "@/components/Header";
import Bienvenida from "@/components/Bienvenida";

export default function Home() {
  return (
    <>
      <Header title={"Bienvenidos!"} />
      <Bienvenida />
    </>
  );
}
