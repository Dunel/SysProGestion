"use client";
import ContainerWeb from "@/components/ContainerWeb";
import GridContainer from "@/components/GridContainer";
import GridMain from "@/components/GridMain";
import GridSecond from "@/components/GridSecond";
import Header from "@/components/Header";
import Step0 from "@/components/register/Step0";
import Step1 from "@/components/register/Step1";
import Step2 from "@/components/register/Step2";
import axios, { AxiosError } from "axios";
import { useState } from "react";

export default function Register() {
  const [code, setCode] = useState("");
  const [mail, setMail] = useState("");
  const [step, setStep] = useState(0);
  const [idCode, setIdCode] = useState("");
  const [data, setData] = useState({});
  const [count, setCount] = useState(0);

  const sendMail = async () => {
    if (count > Date.now()) {
      return;
    }

    try {
      if (!mail) {
        throw new Error("El correo es requerido");
      }
      const res = await axios.post("/api/mailer", {
        mail,
      });
      setCount(Date.now() + 300);
      res.data.message && alert(res.data.message);
      setStep(1);
      console.log(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return alert(error.response?.data.error);
      }
      console.error("Error al validar el código:", error);
      alert((error as Error).message);
    }
  };

  const validateCode = async () => {
    try {
      if (!code) {
        throw new Error("El código es requerido");
      }

      const res = await axios.post("/api/register_code", {
        code,
        mail,
      });

      res.data.message && alert(res.data.message);
      setStep(2);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return alert(error.response?.data.error);
      }
      console.error("Error al validar el código:", error);
      alert((error as Error).message);
    }
  };

  const sendRegister = async () => {
    try {
      const res = await axios.post("/api/register", {
        idCode,
        data,
      });
    } catch (error) {}
  };
  return (
    <>
      <Header title={"Registro"} />
      <ContainerWeb>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GridMain>
            <GridContainer>
              {step === 0 ? (
                <Step0 setMail={setMail} sendMail={sendMail} />
              ) : step === 1 ? (
                <Step1 setCode={setCode} validateCode={validateCode} />
              ) : step === 2 ? (
                <Step2 />
              ) : null}
            </GridContainer>
          </GridMain>
          <GridSecond>
            <GridContainer>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere
              rem dolores porro illum, necessitatibus ratione veniam
              exercitationem excepturi voluptatem totam ipsam eveniet
              consequatur incidunt quidem repellendus error accusantium nulla ea
              similique sint dicta quis blanditiis, voluptate vero! Recusandae
              eaque laudantium ad nulla expedita saepe ex animi doloribus, aut
              dicta odit tenetur? Maxime magnam maiores aliquid iure laudantium
              in obcaecati earum.
            </GridContainer>
          </GridSecond>
        </div>
      </ContainerWeb>
    </>
  );
}
