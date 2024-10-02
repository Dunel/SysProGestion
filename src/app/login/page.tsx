"use client";
import Header from "@/components/Header";
import Login from "@/components/login/Login";
import Link from "next/link";


export default function Home() {
  return (
    <>
      <Header title={"Iniciar sesión"} subtitle={"Introduce tus credenciales para acceder a tu cuenta"} />
        <Login />
        <div className='text-center text-xl my-2'>
        <Link href={'/recovery'} className="underline text-blue-500 hover:text-blue-700 cursor-pointer">
          Recuperar tu contraseña!
        </Link>
        🔐
        </div>
    </>
  );
}
