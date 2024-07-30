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
  const [mail, setMail] = useState("dunel.urbe@gmail.com");
  const [step, setStep] = useState(1);
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
      const res = await axios.post("/api/register/mailer", {
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

      const res = await axios.post("/api/register/register_code", {
        code,
        mail,
      });

      if (res.data.step === 0) {
        setStep(0);
        return alert(res.data.message);
      }

      res.data.message && alert("Código validado");
      setIdCode(res.data.id);
      setStep(2);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.step === 0) {
          setStep(0);
        }
        return alert(error.response?.data.message);
      }
      console.error("Error al validar el código:", error);
      alert((error as Error).message);
    }
  };

  const sendRegister = async () => {
    try {
      const res = await axios.post("/api/register/insert", {
        idCode,
        code,
        data,
      });
      res.data.message && alert(res.data.message);
      setStep(3);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return alert(error.response?.data.error);
      }
      console.error("Error al validar la data:", error);
      alert((error as Error).message);
    }
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
                <Step2 setData={setData} sendData={sendRegister} />
              ) : (
                `Usuario ${mail} registrado con éxito`
              )}
            </GridContainer>
          </GridMain>
          <GridSecond>
            <GridContainer>
              <h2>¡Bienvenido!</h2>
              <p>
                Para completar tu registro de forma exitosa, por favor sigue
                estos pasos:
              </p>
              <ol>
                <li>
                  <strong>Introduce tus datos correctamente:</strong> Asegúrate
                  de que todos los campos estén llenos y sean precisos.
                </li>
                <li>
                  <strong>Correo electrónico válido:</strong> Proporciona una
                  dirección de correo electrónico activa, ya que recibirás un
                  código de verificación en tu bandeja de entrada.
                </li>
                <li>
                  <strong>Revisa tu correo:</strong> Después de enviar el
                  formulario, verifica tu correo electrónico. Recibirás un
                  mensaje con un código de confirmación.
                </li>
                <li>
                  <strong>Introduce el código:</strong> Ingresa el código de
                  verificación en el campo correspondiente para completar tu
                  registro.
                </li>
              </ol>
            </GridContainer>
          </GridSecond>
        </div>
      </ContainerWeb>
    </>
  );
}
