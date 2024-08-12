"use client";
import Header from "@/components/Header";
import Login from "@/components/login/Login";

export default function Home() {
  return (
    <>
      <Header title={"Iniciar sesión"} subtitle={"Introduce tus credenciales para acceder a tu cuenta"} />
        <Login />
    </>
  );
}
