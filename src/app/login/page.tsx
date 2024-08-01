"use client"
import ContainerWeb from "@/components/ContainerWeb";
import Header from "@/components/Header";
import Login from "@/components/login/Login";

export default function Home() {
  return (
    <>
      <Header title={"Iniciar sesión"} />
      <ContainerWeb>
        <Login />
      </ContainerWeb>
    </>
  );
}
