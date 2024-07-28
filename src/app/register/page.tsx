"use client";
import ContainerWeb from "@/components/ContainerWeb";
import GridContainer from "@/components/GridContainer";
import GridMain from "@/components/GridMain";
import GridSecond from "@/components/GridSecond";
import Header from "@/components/Header";
import axios, { AxiosError } from "axios";
import { useState } from "react";

export default function Register() {
  const [code, setCode] = useState("");
  const [mail, setMail] = useState("");
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
      console.log(res.data);
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      throw new Error("Error al enviar el correo");
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
    } catch (error) {
      if(axios.isAxiosError(error)){
        return alert(error.response?.data.error);
      }
      console.error("Error al validar el código:", error);
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
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Correo
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={(e) => setMail(e.target.value)}
              />
              <button
                className="bg-gray-800 text-white text-sm font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-4"
                onClick={() => sendMail()}
              >
                Enviar codigo
              </button>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Code
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={(e) => setCode(e.target.value)}
              />
              <button
                className="bg-gray-800 text-white text-sm font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-4"
                onClick={() => validateCode()}
              >
                Comprobar codigo
              </button>
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
