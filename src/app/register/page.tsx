"use client";

import ContainerWeb from "@/components/ContainerWeb";
import GridContainer from "@/components/GridContainer";
import GridMain from "@/components/GridMain";
import GridSecond from "@/components/GridSecond";
import Header from "@/components/Header";
import Step0 from "@/components/register/Step0";
import Step1 from "@/components/register/Step1";
import Step2 from "@/components/register/Step2";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loader from '@/components/Loader'; 

type Data = {
  cedula: string;
  nombre: string;
  apellido: string;
  telefono: string;
  password: string;
};

type Roles = "alcaldia" | "dependencia" | "estudiante";

export default function Register() {
  const [code, setCode] = useState("");
  const [mail, setMail] = useState("");
  const [step, setStep] = useState(0);
  const [data, setData] = useState({} as Data);
  const [count, setCount] = useState(0);
  const [token, setToken] = useState("");
  const [role, setRole] = useState("" as Roles);
  const [loading, setLoading] = useState(false);
   
  const router = useRouter();

  const sendMail = async () => {
    if (count > Date.now()) {
      return;
    }

    try {
      setLoading(true); // Muestra el loader
      if (!mail) {
        setLoading(false); // Oculta el loader
        throw new Error("El correo es requerido");
      }
      
      const res = await axios.post("/api/register/mailer", {
        mail,
        role: role,
      });

      setCount(Date.now() + 300);    

      res.data.message && alert(res.data.message);
      
      setStep(1);
      setToken(res.data.token);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setLoading(false); // Oculta el loader
        return alert(error.response?.data.error);
      }
      console.error("Error al validar el código:", error);
      setLoading(false); // Oculta el loader
      alert((error as Error).message);
    } finally {
      setLoading(false); // Oculta el loader
    }
  };

  const validateCode = async () => {
    try {
      setLoading(true); // Muestra el loader
      if (!code) {
        setLoading(false); // Oculta el loader
        throw new Error("El código es requerido");
      }

      const res = await axios.post("/api/register/register_code", {
        code,
        mail,
      });

      res.data.message && alert("Código validado");
      setLoading(false); // Oculta el loader

      setStep(2);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.step === 0) {
          setStep(0);
        }
        setLoading(false); // Oculta el loader
        return alert(error.response?.data.error);
      }
      console.error("Error al validar el código:", error);
      setLoading(false); // Oculta el loader
      alert((error as Error).message);
    } finally {
      setLoading(false); // Oculta el loader
    }
  };

  const sendRegister = async () => {
    try {
      setLoading(true); // Muestra el loader
      const res = await axios.post("/api/register/insert", {
        code,
        data,
        token,
      });
      res.data.message && alert(res.data.message);
      setStep(3);

      const login = await signIn("credentials", {
        email: mail,
        password: data.password,
        redirect: false,
      });

      if (login?.error) {
        setLoading(false); // Oculta el loader
        alert(login.error.split(","));
        return;
      }

      router.push("/checking");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.step === 0) {
          setStep(0);
        }
        setLoading(false); // Oculta el loader
        return alert(error.response?.data.error);
      }
      console.error("Error al validar la data:", error);
      setLoading(false); // Oculta el loader
      alert((error as Error).message);
    } finally {
      setLoading(false); // Oculta el loader
    }
    
  };

  return (
    <>
      <Header title={"Registro"} subtitle={" Llena los siguientes datos para registrarte en el sistema. Por favor, introduce tu información correctamente siguiendo las indicaciones en cada casilla."} />

        <div className="flex w-[80%] mx-auto mt-4">
      
            {  step === 0 ? (
              <Step0
                setMail={setMail}
                sendMail={sendMail}
                role={role}
                setRole={setRole}
              />
            ) : step === 1 ? (
              <Step1 setCode={setCode} validateCode={validateCode} time={count}/>
            ) : step === 2 ? (
              <Step2 setData={setData} sendData={sendRegister} />
            ) : (
              `Usuario ${mail} registrado con éxito`
            )
            }
       
        </div>
            {
              loading  && <Loader/>
            }

    </>
  );
}